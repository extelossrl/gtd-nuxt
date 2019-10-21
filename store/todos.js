const todoFromJson = (json) => ({
  ...json,
  date: json.date ? new Date(json.date) : null
})

export const state = () => ({
  list: [],
  detail: null,
  states: [
    {
      id: 'inbox',
      title: 'Inbox',
      icon: 'inbox-arrow-down'
    },
    {
      id: 'next',
      title: 'Next Actions',
      icon: 'checkbox-multiple-marked-outline'
    },
    { id: 'calendar', title: 'Calendar', icon: 'calendar-multiple-check' },
    { id: 'maybe', title: 'Maybe', icon: 'help' },
    { id: 'archive', title: 'Archive', icon: 'archive' }
  ]
})

export const mutations = {
  setList(state, items) {
    state.list = items
  },
  updateList(state, item) {
    const index = state.list.findIndex((el) => el.id === item.id)
    if (index !== -1) {
      state.list.splice(index, 1, item)
    }
  },
  setDetail(state, item) {
    state.detail = item
  }
}

export const actions = {
  async getTodos(context) {
    const response = await fetch('http://localhost:3000/todos?_sort=priority')
    const items = (await response.json()).map((item) => todoFromJson(item))
    context.commit('setList', items)
  },
  async putTodos(context, todosByState) {
    const toRet = []
    context.state.states.forEach(({ id: state }) => {
      const group = todosByState[state]

      group.forEach((groupItem, priority) => {
        const originalItem = context.state.list.find(
          (item) => item.id === groupItem.id
        )
        if (originalItem) {
          if (
            originalItem.priority !== priority ||
            originalItem.state !== state
          ) {
            toRet.push({ ...groupItem, priority, state })
          }
        } else {
          toRet.push({ ...groupItem, priority, state })
        }
      })
    })

    toRet.forEach((item) => context.commit('updateList', item))

    const requests = toRet.map((item) => context.dispatch('putTodo', item))
    await Promise.all(requests)
  },
  async getTodo(context, id) {
    const response = await fetch(`http://localhost:3000/todos/${id}`)
    const rawItem = await response.json()
    const item = todoFromJson(rawItem)
    context.commit('setDetail', item)
  },
  async putTodo(context, item) {
    const request = await fetch(`http://localhost:3000/todos/${item.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    const response = await request.json()
    const newItem = todoFromJson(response)
    context.commit('updateList', newItem)
  },
  async postTodo(context, item) {
    const request = await fetch(`http://localhost:3000/todos`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    const response = await request.json()
    const newItem = todoFromJson(response)
    context.commit('updateList', newItem)
  },
  async deleteTodo(context, item) {
    const response = await fetch(`http://localhost:3000/todos/${item.id}`, {
      method: 'DELETE'
    })
    await response.json()
  }
}

export const getters = {
  todosByState(state, getters, rootState, rootGetters) {
    const toRet = {}
    state.states.forEach(({ id: singleState }) => {
      toRet[singleState] = state.list
        .filter((item) => item.state === singleState)
        .sort((a, b) =>
          a.priority > b.priority ? 1 : a.priority < b.priority ? -1 : 0
        )
    })
    return toRet
  },
  getDetail(state) {
    return {
      ...state.detail
    }
  }
}
