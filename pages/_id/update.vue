<template>
  <div class="column">
    <client-only>
      <todo-form v-model="item" title="Modifica todo" :states="states">
        <template v-slot:footer>
          <b-button icon-left="content-save" type="is-success" @click="edit">{{
            $t('app.save')
          }}</b-button>
          <b-button
            class="is-pulled-right"
            outlined
            icon-left="delete"
            type="is-danger"
            @click="remove"
            >{{ $t('app.remove') }}</b-button
          >
        </template>
      </todo-form>
    </client-only>
  </div>
</template>

<script>
import TodoForm from '@/components/TodoForm'
export default {
  components: {
    TodoForm
  },
  head() {
    return {
      title: this.$t('todos.edit')
    }
  },
  computed: {
    states() {
      return this.$store.state.todos.states
    }
  },
  async asyncData({ store, params: { id } }) {
    await store.dispatch('todos/getTodo', id)
    const item = store.getters['todos/getDetail']

    return {
      item
    }
  },
  methods: {
    async edit() {
      await this.$store.dispatch('todos/putTodo', this.item)
      this.$router.push('/')
      this.$buefy.snackbar.open(this.$t('todos.modifyDone'))
    },
    remove() {
      this.$buefy.dialog.confirm({
        title: this.$t('todos.remove'),
        message: this.$t('todos.removeConfirm', { name: this.item.title }),
        cancelText: this.$t('app.cancel'),
        confirmText: this.$t('app.confirm'),
        type: 'is-success',
        onConfirm: async () => {
          await this.$store.dispatch('todos/deleteTodo', {
            id: this.item.id
          })
          this.$router.push('/')
          this.$buefy.snackbar.open(this.$t('todos.removeDone'))
        }
      })
    }
  }
}
</script>
