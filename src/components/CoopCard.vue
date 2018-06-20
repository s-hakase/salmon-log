<template>
  <div v-if="baito">
    <div class="card equal-height is-clipped">
      <div class="card-header">
        <div class="level header-level">
          <div class="level-left header-left">
            <strong>{{ baito.start_utc | moment }} - {{ baito.end_utc | moment }}</strong>
          </div>
          <div class="level-right is-marginless">
            <strong>: {{ resultLength(baito.start_t) }}</strong>
          </div>
        </div>
      </div>
      <div class="card-image">
        <figure class="image is-16by9">
          <img :src="baito.stage.image" :alt="baito.stage.name" class="stage-image">
        </figure>
      </div>
      <div class="has-text-centered">
        <strong>{{ baito.stage.name }}</strong>
      </div>
      <div class="columns is-variable is-1 is-mobile weapons">
        <div v-for="(weapon, index) in baito.weapons" :key="index + '-' + weapon.id"
          class="column is-one-quarter">
          <div>
            <figure class="image is-64x64">
              <img :src="weapon.image" :alt="weapon.name">
            </figure>
            <p class="is-size-7 has-text-centered">
              <span>{{ weapon.name }}</span>
            </p>
          </div>
        </div>
      </div>
      <router-link class="is-overlay card-overlay" :to="{ name: 'coop', params: { 'coopId': baito.start_t } }"></router-link>
    </div>
  </div>
</template>

<script>
import CoopStore from '@/stores/CoopStore';

export default {
  props: [
    'baito', 'results'
  ],
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

  .card-header strong {
    line-height: 1.5;
  }

  .result-column {
    max-width: 5rem;
  }
}
.header-level {
  width: 100%;

  .header-left {
    flex-shrink: 1;
  }
}
.equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}
figure {
  margin: 0 auto;
}
.card-overlay {
  content: "";
  &:hover {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.25);
  }
}
.weapons {
  margin-bottom: 0;
}
</style>
