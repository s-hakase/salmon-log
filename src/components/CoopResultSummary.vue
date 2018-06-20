<template>
  <div id="coop-result-summary" class="card has-text-dark">
    <div class="level">
      <div class="level-item">
        <div class="has-text-centered">
          <p class="heading">バイト回数</p>
          <p class="title">{{ summary.total }}</p>
        </div>
      </div>
      <div class="level-item">
        <div class="has-text-centered">
          <p class="heading">クリア回数 (率)</p>
          <p class="title">{{ summary.wave3 }} ({{ summary.wave3 / summary.total | percentRate }})</p>
        </div>
      </div>
      <div class="level-item">
        <div class="has-text-centered">
          <p class="heading">シャケマエ</p>
          <p class="title">{{ ((summary.wave3 - summary.failure) * 20) + (summary.wave1 * -10) | plus }}</p>
        </div>
      </div>
      <div class="level-item">
        <div class="has-text-centered">
          <p class="heading">救出 / 被救出 (レート)</p>
          <p class="title">{{ summary.rescue }} / {{ summary.rescued }} ({{ summary.rescue / summary.rescued | rescueRate }})</p>
        </div>
      </div>
    </div>
    <div class="clear-detail-container">
      <div class="has-text-centered is-size-4">内訳</div>
      <div class="columns is-mobile clear-detail-columns is-marginless has-text-centered">
        <div class="column is-narrow clear-detail-column wave1-column" :style="`flex-grow:${summary.failure / summary.total * 100}`">
          <p class="heading">wave1落ち</p>
          <p class="title is-size-4 is-marginless">{{ summary.failure }}</p>
          <p class="title is-size-5">({{ summary.failure / summary.total | percentRate }})</p>
        </div>
        <div class="column is-narrow clear-detail-column wave2-column" :style="`flex-grow:${summary.wave1 / summary.total * 100}`">
          <p class="heading">wave2落ち</p>
          <p class="title is-size-4 is-marginless">{{ summary.wave1 }}</p>
          <p class="title is-size-5">({{ summary.wave1 / summary.total | percentRate }})</p>
        </div>
        <div class="column is-narrow clear-detail-column wave3-column" :style="`flex-grow:${summary.wave2 / summary.total * 100}`">
          <p class="heading">wave3落ち</p>
          <p class="title is-size-4 is-marginless">{{ summary.wave2 }}</p>
          <p class="title is-size-5">({{ summary.wave2 / summary.total | percentRate }})</p>
        </div>
        <div class="column is-narrow clear-detail-column clear-column" :style="`flex-grow:${summary.wave3 / summary.total * 100}`">
          <p class="heading">クリア</p>
          <p class="title is-size-4 is-marginless">{{ summary.wave3 }}</p>
          <p class="title is-size-5">({{ summary.wave3 / summary.total | percentRate }})</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['summary'],
  filters: {
    plus (number) {
      return number > 0 ? '+' + number : number;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables.sass";
@import "../assets/buefy-custom.scss";
#coop-result-summary {
  padding-top: 1rem;

  .label-column {
    width: 14rem;
  }

  .clear-detail-container {
    padding: 0 1.5rem 1rem;

    .clear-detail-columns {
      .clear-detail-column {
        position: relative;
        background-image: url('../assets/stripe.svg');
        background-size: 8rem;
        background-blend-mode: difference;

        .title {
          white-space: nowrap;
        }

        &::before {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0.85rem;
          background-color: rgba($grey-lighter, 0.2);
        }

        &::after {
          content: "";
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1rem;
          background: linear-gradient(to bottom, transparent 0%, $dark 95%);
          opacity: 0.5;
          mix-blend-mode: overlay;
        }
      }

      .wave1-column {
        background-color: $danger;
        color: $danger-invert;

        .title {
          color: $danger-invert;
        }
      }

      .wave2-column {
        background-color: $warning;
        color: $warning-invert;

        .title {
          color: $warning-invert;
        }
      }

      .wave3-column {
        background-color: $info;
        color: $info-invert;

        .title {
          color: $info-invert;
        }
      }

      .clear-column {
        background-color: $success;
        color: $success-invert;

        .title {
          color: $success-invert;
        }
      }
    }
  }
}
</style>
