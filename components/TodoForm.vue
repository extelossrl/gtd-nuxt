<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <div class="columns">
      <div class="column">
        <b-field :label="$t('todos.fields.title')">
          <b-input v-model="value.title"></b-input>
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-field :label="$t('todos.fields.date')">
          <b-datepicker
            v-model="value.date"
            icon="calendar-today"
          ></b-datepicker>
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('todos.fields.state')">
          <b-select v-model="value.state" expanded>
            <option v-for="state in states" :key="state.id" :value="state.id">{{
              $t('todos.states.' + state.id)
            }}</option>
          </b-select>
        </b-field>
      </div>
    </div>
    <b-field :label="$t('todos.fields.description')">
      <b-input v-model="value.description" type="textarea" />
    </b-field>
    <hr />
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    states: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
