<template>
  <div>
    <div id="coop" class="has-text-dark">
      <div class="card back-button-container">
        <a @click="goBack" class="has-text-white"><b-icon icon="chevron-left"></b-icon>戻る</a>
      </div>
      <coop-card-detail :baito="coop"></coop-card-detail>
      <div class="add-button-container is-hidden-touch card has-text-dark">
        <router-link class="add-button is-size-5" v-if="AuthStore.user" :to="{ name: 'add', params: { 'coopId': this.coopId } }" replace>
          <b-icon icon="plus"></b-icon>
          <span>実績を追加</span>
        </router-link>
      </div>
      <div>
        <coop-result-summary :summary="resultSummary"></coop-result-summary>
        <div class="result-cards">
          <result-card v-for="result in results" :key="result.key" :data="result"></result-card>
        </div>
        <div class="floating-button-container is-hidden-desktop">
          <router-link class="add-button is-hidden-tablet circle-button" v-if="AuthStore.user" :to="{ name: 'add', params: { 'coopId': this.coopId } }" replace>
            <b-icon icon="plus"></b-icon>
          </router-link>
          <router-link class="add-button is-hidden-mobile" v-if="AuthStore.user" :to="{ name: 'add', params: { 'coopId': this.coopId } }" replace>
            <b-icon icon="plus"></b-icon>
            <span>実績を追加</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CoopStore from '@/stores/CoopStore';
import AuthStore from '@/stores/AuthStore';
import SnackbarStore from '@/stores/SnackbarStore';
import CoopCardDetail from '@/components/CoopCardDetail';
import ResultCard from '@/components/ResultCard';
import CoopResultSummary from '@/components/CoopResultSummary';
import constant from '@/constants/constant';
export default {
  name: 'Coop',
  props: [
    'coopId'
  ],
  data () {
    return {
      AuthStore: AuthStore.data,
      results: {},
      resultSummary: {},
      keys: [],
      coop: JSON.parse(JSON.stringify(constant.coopObject))
    };
  },
  created () {
    CoopStore.methods.getCoop(this.coopId).then(result => {
      this.coop = result;
    }).catch(err => {
      SnackbarStore.methods.openError(this, err);
    });
    this.getResults();
    CoopStore.methods.onReloaded(reloaded => {
      if (reloaded) {
        this.getResults();
      }
    }, 'coop-view');
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push({ name: 'schedule' });
    },
    getResults () {
      if (!AuthStore.data.user) {
        AuthStore.methods.setCallback(() => {
          this.getResults();
        });
        return;
      }
      CoopStore.methods.getResults(this.coopId).then(results => {
        results = results || {};
        this.results = Object.keys(results).map(key => {
          const current = results[key];
          current.key = key;
          current.coopId = this.coopId;
          return current;
        });
        this.calcResults();
      }).catch(err => {
        SnackbarStore.methods.openError(this, err);
      });
    },
    calcResults () {
      if (this.results && this.results.length < 1) {
        this.resultSummary = {
          total: 0
        };
        return;
      }
      let count = {
        total: this.results.length,
        failure: 0,
        wave1: 0,
        wave2: 0,
        wave3: 0,
        rescue: 0,
        rescued: 0
      };
      this.results.forEach(result => {
        if (!result.total) {
          // totalの入力がない場合
          return; // TODO: 各Waveのサマリを検討
        }
        const clearWave = result.total.clearWave;
        if (typeof count[clearWave] !== 'undefined') {
          // waveN, failure以外の場合、そもそも存在しない場合は無視する
          count[clearWave]++;
        }
        if (!isNaN(result.total.rescue) && !isNaN(result.total.rescued)) {
          // 両方の登録がある場合のみ保持する
          count.rescue += result.total.rescue * 1;
          count.rescued += result.total.rescued * 1;
        }
      });
      this.resultSummary = count;
    }
  },
  components: {
    CoopCardDetail,
    ResultCard,
    CoopResultSummary
  }
};
</script>
<style lang="scss">
@import "~bulma/sass/utilities/initial-variables.sass";
@import "../assets/buefy-custom.scss";

#coop {
  background-color: $grey-dark;

  .back-button-container {
    background-image: url('../assets/stripe.svg');
    background-size: 8rem;
    background-color: $grey-dark;
    padding: 0.5rem 1rem;

    a {
      padding: 0.5rem 1rem;
    }
  }

  .add-button-container {
    position: sticky;
    top: 3.25rem;
    background-color: $grey-lighter;
    text-align: center;
    z-index: 2;

    &:hover {
      background-color: $grey-light;
    }

    .add-button {
      padding: 1rem;
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .result-cards {
    padding: 0.85rem;
    padding-bottom: 3.85rem;
  }

  .floating-button-container {
    position: sticky;
    bottom: 1rem;
    padding-right: 1rem;
    text-align: right;

    .add-button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      $button-height: 4rem;
      padding: 0 1.25rem;
      width: auto;
      height: $button-height;
      background-color: $theme;
      color: $theme-invert;
      border-radius: 999999px;
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
      z-index: 2;

      &.circle-button {
        padding: 0;
        border-radius: 50%;
        width: $button-height;
      }

      &:hover {
        background-color: lighten($theme, 8%);
      }

      .icon {
        position: relative;
      }
    }
  }
}
@media (max-width: $desktop) {
  #coop .result-cards {
    padding: 0.85rem 0 3.85rem;
  }
}
</style>
