<template>
  <div v-if="baito">
    <div class="card is-clipped">
      <div class="card-header has-text-white">
        <div class="level header-level">
          <div class="level-left header-left">
            <strong>{{ baito.start_utc | moment(format) }} - {{ baito.end_utc | moment(format) }}</strong>
          </div>
          <div class="level-right">
            <strong>記録数 : {{ resultLength(baito.start_t) }}</strong>
          </div>
        </div>
      </div>
      <div class="columns is-tablet align-centered card-content-area">
        <div class="column is-one-third-tablet stage-column">
          <figure class="image is-16by9 stage-image">
            <img :src="baito.stage.image" :alt="baito.stage.name" class="stage-image">
          </figure>
          <div class="has-text-centered">
            <strong class="has-text-white">{{ baito.stage.name }}</strong>
          </div>
        </div>
        <div class="column">
          <div class="has-text-centered is-hidden-mobile">
            <strong class="has-text-white">支給ブキ</strong>
          </div>
          <div class="columns is-variable is-1 is-mobile">
            <div v-for="(weapon, index) in baito.weapons" :key="index + '-' + weapon.id"
              class="column is-one-quarter">
              <div>
                <figure class="image weapon-image">
                  <img :src="weapon.image" :alt="weapon.name">
                </figure>
                <p class="is-size-7 has-text-white has-text-centered">
                  <span>{{ weapon.name }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-link class="is-overlay card-overlay" :to="{ name: 'coop', params: { 'coopId': baito.start_t } }"></router-link>
    </div>
  </div>
</template>

<script>
import CoopStore from '@/stores/CoopStore';
import constant from '@/constants/constant';

export default {
  props: [
    'baito'
  ],
  data () {
    return {
      format: constant.momentFormatWithDay
    };
  },
  methods: {
    resultLength (t) {
      if (CoopStore && CoopStore.data.results[t]) {
        const length = Object.keys(CoopStore.data.results[t]).length;
        return length;
      } else {
        return 0;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables.sass";
.card-header, .weapons {
  padding: 0.5rem 1rem;
}
.card {
  background-color: rgba(0, 0, 0, 0);
  background-image: url('../assets/stripe.svg');
  background-size: 8rem;
  border-radius: $radius-large;
}
.card-header strong {
  line-height: 1.5;
}
.header-level {
  width: 100%;

  .header-left {
    flex-shrink: 1;
  }
}
.align-centered {
  align-items: center;
}
.weapon-image {
  margin: 0 auto;
  max-width: 96px;
  max-height: 96px;
}
@media (min-width: $tablet) {
  .stage-column {
    margin-left: 1rem;
  }
  .stage-image {
    border-radius: $radius-large;
  }
}
.card-overlay {
  content: "";
  &:hover {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.25);
  }
}
.card-content-area {
  margin-bottom: 0;
}
</style>
