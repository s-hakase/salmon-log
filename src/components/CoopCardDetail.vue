<template>
  <div v-if="baito">
    <div class="card">
      <div class="card-content is-paddingless">
        <div class="card-stage-image is-clipped">
          <figure class="card-stage-image-figure is-overlay">
            <img class="card-background-image" :src="baito.stage.image" :alt="baito.stage.name">
          </figure>
          <div class="texts is-overlay">
            <h2 class="title is-size-3-desktop is-size-4-tablet is-size-5-mobile has-text-white">{{ baito.start_utc | moment(format) }} - {{ baito.end_utc | moment(format) }}</h2>
            <div>
              <h3 class="subtitle has-text-white">{{ baito.stage.name }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content card-weapons">
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
  </div>
</template>

<script>
import constant from '@/constants/constant';

export default {
  props: [
    'baito'
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
}
.card-stage-image {
  position: relative;

  &::before {
    content: '';
    display: block;
    padding-top: 33.33333%;
  }

  .card-stage-image-figure {
    .card-background-image {
      position: relative;
      width: 100%;
      height: auto;
      top: 50%;
      transform: translateY(-50%);
    }

    &::after {
      content: '';
      position: absolute;
      background-color: rgba(0, 0, 0, 0.45);
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
}
.texts {
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  flex-flow: column;
}
.weapon-image {
  margin: 0 auto;
  max-width: 64px;
  max-height: 64px;
}
@media (min-width: $tablet) {
  .weapon-image {
    margin: 0 auto;
    max-width: 96px;
    max-height: 96px;
  }
}
</style>
