export default (context) => {
  return new Promise(function(resolve) {
    resolve({
      app: {
        title: 'GTD TodoList',
        description: 'My GTD application',
        workspace: 'workspace',
        languages: 'Languages',
        all: 'All',
        edit: 'Edit',
        remove: 'Remove',
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save'
      },
      todos: {
        fields: {
          title: 'Title',
          date: 'Date',
          state: 'State',
          description: 'Description'
        },
        states: {
          inbox: 'Inbox',
          next: 'Next Actions',
          calendar: 'Calendar',
          maybe: 'Maybe',
          archive: 'Archive'
        },
        edit: 'Edit todo',
        sectionName: 'Todo',
        state: 'State',
        add: 'Create new todo',
        date: 'Date',
        remove: 'Delete Todo',
        removeConfirm: 'Do you want to delete todo {name}?',
        removeDone: 'Todo deleted!',
        modifyDone: 'Todo edited!'
      }
    })
  })
}
