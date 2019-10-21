<template>
  <div class="columns is-centered">
    <div
      v-for="state in states"
      :key="state.id"
      class="column has-text-centered todoList"
    >
      <h2>
        <b-icon :icon="state.icon" size="is-small"></b-icon>
        {{ $t(`todos.states.${state.id}`) }}
      </h2>
      <draggable
        :value="todosByState[state.id]"
        group="todos"
        class="dropArea"
        @input="save($event, state.id)"
      >
        <card
          v-for="item in todosByState[state.id]"
          :key="item.id"
          class="task-preview"
          :title="item.title"
          :date="item.date"
          :description="item.description"
          @click="goToDetail(item)"
        ></card>
      </draggable>
      <b-tooltip
        :label="$t('todos.add')"
        animated
        position="is-left"
        :delay="1000"
      >
        <b-button
          type="is-primary"
          class="hoverPlus"
          icon-right="plus"
          @click="goToNew"
        ></b-button>
      </b-tooltip>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Card from '../components/Card'

export default {
  components: { Draggable, Card },
  head() {
    return {
      title: this.$t('todos.sectionName'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('app.description')
        }
      ]
    }
  },
  data() {
    return {
      items: [],
      statesGroupedItems: {}
    }
  },
  computed: {
    states() {
      return this.$store.state.todos.states
    },
    todosByState() {
      return this.$store.getters['todos/todosByState']
    }
  },
  async fetch({ store }) {
    await store.dispatch('todos/getTodos')
  },
  methods: {
    goToNew() {
      this.$router.push('/create')
    },
    goToDetail(item) {
      this.$router.push(`/${item.id}`)
    },
    async save(stateItems, state) {
      this.$nuxt.$loading.start()
      await this.$store.dispatch('todos/putTodos', {
        ...this.todosByState,
        [state]: stateItems
      })
      this.$nuxt.$loading.finish()
    }
  }
}
</script>

<style scoped>
.task-preview {
  cursor: pointer;
}
.dropArea {
  min-height: 200px;
}
.hoverPlus {
  display: none;
}
.todoList:hover .hoverPlus {
  display: inline;
}
</style>
