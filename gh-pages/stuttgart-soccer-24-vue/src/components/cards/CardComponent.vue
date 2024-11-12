<template>
  <div
      class="card-wrapper col-1 col-md-2 col-md-3 col-lg-4 col-xl-3"
      v-on:click="redirectToUrl"
      v-bind:class="{'not-available':!data.availableCard}"
  >
    <div class="title">{{ data.court }}</div>
    <div class="pre-title">{{ data.date ? $d(data.date, 'day') : '' }}</div>
    <div class="description">{{ data.date ? $d(data.date, 'hour') : '' }}</div>
    <div class="second-description">
      <font-awesome-icon :icon="'fa-regular fa-clock'" style="width: 20px; height: 20px; margin-right: 5px"></font-awesome-icon>
      {{ data.duration }}m
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    data: {
      type: Object,
      required: true
    },
  },
  methods: {
    redirectToUrl: function () {
      if (this.data.availableCard) {
        window.open(this.data.sourceWebsite, '_blank');
      }
    }
  }
}
</script>