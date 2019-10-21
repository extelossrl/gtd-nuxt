<template>
  <div>
    <b-navbar type="is-primary">
      <template slot="brand">
        <b-navbar-item tag="router-link" to="/">
          {{ $t('app.title') }}
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item
          v-for="locale in $i18n.locales"
          :key="locale.code"
          :active="locale.code === $i18n.locale"
          @click.native="switchLocale(locale.code)"
        >
          {{ locale.name }}
        </b-navbar-item>
      </template>
    </b-navbar>

    <!-- Hero content: will be in the middle -->

    <div class="container column">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    switchLocale(code) {
      this.$i18n.locale = code
    }
  }
}
</script>
