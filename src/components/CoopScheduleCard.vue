<template>
  <div v-if="baitos.length > 0">
    <div class="card">
      <div v-for="(baito, index) in baitos" :key="baito.start_t" class="has-text-white schedule-line"
        v-if="index > 1">
        <strong class="has-text-white">{{ baito.start_utc | moment(format) }} - {{ baito.end_utc | moment(format) }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import constant from '@/constants/constant';
export default {
  props: [
    'baitos'
  ],
  data () {
    return {
      format: constant.momentFormatWithDay
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables.sass";
.card {
  background-color: rgba(0, 0, 0, 0);
  background-image: url('../assets/stripe.svg');
  background-size: 8rem;
  border-radius: $radius-large;
}
.schedule-line {
  padding: 0.5rem 1rem;
   strong {
     line-height: 1.5;
  }
  &:not(:last-of-type) {
    border-bottom: 3px $grey dashed;
  }
}
</style>
