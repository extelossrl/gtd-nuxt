<template>
  <div class="column">
    <client-only>
      <todo-form v-model="item" :title="title" :states="states">
        <template v-slot:footer>
          <b-button icon-left="content-save" type="is-success" @click="edit">{{
            $t('app.save')
          }}</b-button>
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
      title: this.$t('todos.add')
    }
  },
  data() {
    return {
      item: {
        title: '',
        date: new Date(),
        description: '',
        state: this.$store.state.todos.states[0].id
      }
    }
  },
  computed: {
    states() {
      return this.$store.state.todos.states
    }
  },
  methods: {
    async edit() {
      await this.$store.dispatch('todos/postTodo', this.item)
      this.$router.push('/')
      this.$buefy.snackbar.open(this.$t('todos.modifyDone'))
    }
  }
}
</script>
