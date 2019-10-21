<template>
  <div class="column">
    <b-tooltip
      :label="description"
      multilined
      animated
      position="is-left"
      :delay="1000"
      type="is-dark"
    >
      <div class="box" @click="$emit('click')">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ title }}</strong>
              </p>
              <b-taglist>
                <b-tag v-if="date" type="is-warning">{{
                  $d(date, 'short')
                }}</b-tag>
              </b-taglist>
            </div>
          </div>
        </article>
      </div>
    </b-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    date: {
      type: Date,
      default: null
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>
