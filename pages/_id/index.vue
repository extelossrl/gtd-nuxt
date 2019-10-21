<template>
  <div v-if="item" class="column">
    <h1 class="title">{{ item.title }}</h1>
    <b-taglist attached>
      <b-tag type="is-success" size="is-medium">{{ $t('todos.state') }}</b-tag>
      <b-tag type="is-dark" size="is-medium">{{
        $t('todos.states.' + item.state)
      }}</b-tag>
    </b-taglist>
    <b-taglist attached>
      <b-tag type="is-warning" size="is-medium">{{ $t('todos.date') }}</b-tag>
      <b-tag type="is-dark" size="is-medium">{{
        $d(item.date, 'short')
      }}</b-tag>
    </b-taglist>

    <section v-if="item.description">
      <hr />
      {{ item.description }}
    </section>
    <hr />
    <b-button icon-left="pencil" type="is-primary" @click="goToModify">{{
      $t('app.edit')
    }}</b-button>
    <b-button
      class="is-pulled-right"
      outlined
      icon-left="delete"
      type="is-danger"
      @click="remove"
      >{{ $t('app.remove') }}</b-button
    >
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.item.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.item.description
        }
      ]
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    item() {
      return this.$store.state.todos.detail
    }
  },
  async fetch({ store, params: { id } }) {
    await store.dispatch('todos/getTodo', id)
  },
  methods: {
    goToModify() {
      this.$router.push(`/${this.id}/update`)
    },
    remove() {
      this.$buefy.dialog.confirm({
        title: this.$t('todos.remove'),
        message: this.$t('todos.removeConfirm', { name: this.item.title }),
        cancelText: this.$t('app.cancel'),
        confirmText: this.$t('app.confirm'),
        type: 'is-success',
        onConfirm: async () => {
          this.$nuxt.$loading.start()
          try {
            await this.$store.dispatch('todos/deleteTodo', {
              id: this.id
            })
            this.$router.push('/')
            this.$buefy.snackbar.open(this.$t('todos.removeDone'))
          } catch (e) {
            this.$buefy.snackbar.open({
              type: 'is-danger',
              message: this.$t('todos.removeDone')
            })
          }
          this.$nuxt.$loading.stop()
        }
      })
    }
  }
}
</script>

<style scoped>
.main-tag {
  width: 140px;
}
</style>
