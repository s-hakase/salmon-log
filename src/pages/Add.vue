<template>
  <div v-if="coop">
    <div class="card back-button-container">
      <a @click="cancel" class="has-text-white"><b-icon icon="chevron-left"></b-icon>戻る</a>
    </div>
    <div id="Add" class="has-text-dark">
      <div>
        <wave class="wave-container" number="1" :weapons="coop.weapons" :wave="result.waves[0]" />
        <wave class="wave-container" number="2" :weapons="coop.weapons" :wave="result.waves[1]" />
        <wave class="wave-container" number="3" :weapons="coop.weapons" :wave="result.waves[2]" />
      </div>
      <div>
        <header class="title is-size-6">最終結果</header>
        <div class="columns is-tablet category-columns">
          <div class="column is-narrow label-column">
            <label>成功したWave</label>
          </div>
          <div class="column">
            <b-field class="add-field is-hidden-tablet">
              <b-radio-button class="add-field-button" v-model="result.total.clearWave" type="is-theme" size="is-large" native-value="failure">失敗</b-radio-button>
              <b-radio-button class="add-field-button" v-model="result.total.clearWave" type="is-theme" size="is-large" native-value="wave1">Wave1</b-radio-button>
              <b-radio-button class="add-field-button" v-model="result.total.clearWave" type="is-theme" size="is-large" native-value="wave2">Wave2</b-radio-button>
              <b-radio-button class="add-field-button" v-model="result.total.clearWave" type="is-theme" size="is-large" native-value="wave3">Wave3</b-radio-button>
            </b-field>
            <b-field class="add-field is-hidden-mobile">
              <b-radio-button class="add-field-button" v-model="result.total.clearWave" type="is-theme" native-value="failure">失敗</b-radio-button>
              <b-radio-button class="add-field-button" v-model="result.total.clearWave" type="is-theme" native-value="wave1">Wave1</b-radio-button>
              <b-radio-button class="add-field-button" v-model="result.total.clearWave" type="is-theme" native-value="wave2">Wave2</b-radio-button>
              <b-radio-button class="add-field-button" v-model="result.total.clearWave" type="is-theme" native-value="wave3">Wave3</b-radio-button>
            </b-field>
          </div>
        </div>
        <div class="columns is-tablet category-columns">
          <div class="column is-narrow label-column">
            <label>全体の納品数</label>
          </div>
          <div class="column">
            <b-field type="is-theme">
              <b-field class="is-hidden-tablet">
                <b-input class="gold-egg-input" type="number" icon="circle" size="is-large" v-model="result.total.goldEgg" placeholder="金イクラ合計"></b-input>
              </b-field>
              <b-field class="is-hidden-mobile">
                <b-input class="gold-egg-input" type="number" icon="circle" v-model="result.total.goldEgg" placeholder="金イクラ合計"></b-input>
              </b-field>
              <b-field class="is-hidden-tablet">
                <b-input class="egg-input" type="number" icon="circle" size="is-large" v-model="result.total.egg" placeholder="イクラ合計"></b-input>
              </b-field>
              <b-field class="is-hidden-mobile">
                <b-input class="egg-input" type="number" icon="circle" v-model="result.total.egg" placeholder="イクラ合計"></b-input>
              </b-field>
            </b-field>
          </div>
        </div>
        <div class="columns is-tablet category-columns">
          <div class="column is-narrow label-column">
            <label>個人の納品数</label>
          </div>
          <div class="column">
            <b-field type="is-theme">
              <b-field class="is-hidden-tablet">
                <b-input class="gold-egg-input" type="number" icon="circle" size="is-large" v-model="result.total.myGoldEgg" placeholder="金イクラ納品数"></b-input>
              </b-field>
              <b-field class="is-hidden-mobile">
                <b-input class="gold-egg-input" type="number" icon="circle" v-model="result.total.myGoldEgg" placeholder="金イクラ納品数"></b-input>
              </b-field>
              <b-field class="is-hidden-tablet">
                <b-input class="egg-input" type="number" icon="circle" size="is-large" v-model="result.total.myEgg" placeholder="イクラ納品数"></b-input>
              </b-field>
              <b-field class="is-hidden-mobile">
                <b-input class="egg-input" type="number" icon="circle" v-model="result.total.myEgg" placeholder="イクラ納品数"></b-input>
              </b-field>
            </b-field>
          </div>
        </div>
        <div class="columns is-tablet category-columns">
          <div class="column is-narrow label-column">
            <label>救出 / 被救出数</label>
          </div>
          <div class="column">
            <b-field type="is-theme">
              <b-field class="is-hidden-tablet">
                <b-input class="rescue-input" type="number" icon="circle" size="is-large" v-model="result.total.rescue" placeholder="救出数"></b-input>
              </b-field>
              <b-field class="is-hidden-mobile">
                <b-input class="rescue-input" type="number" icon="circle" v-model="result.total.rescue" placeholder="救出数"></b-input>
              </b-field>
              <b-field class="is-hidden-tablet">
                <b-input class="rescue-input" type="number" icon="circle" size="is-large" v-model="result.total.rescued" placeholder="被救出数"></b-input>
              </b-field>
              <b-field class="is-hidden-mobile">
                <b-input class="rescue-input" type="number" icon="circle" v-model="result.total.rescued" placeholder="被救出数"></b-input>
              </b-field>
            </b-field>
          </div>
        </div>
      </div>
      <div class="button-container is-hidden-tablet">
        <button class="button is-theme is-large" v-if="this.resultId" @click="edit">変更を適用</button>
        <button class="button is-theme is-large" v-else @click="add">追加</button>
        <button class="button is-large" @click="cancel">キャンセル</button>
      </div>
      <div class="button-container is-hidden-mobile">
        <button class="button is-theme" v-if="this.resultId" @click="edit">変更を適用</button>
        <button class="button is-theme" v-else @click="add">追加</button>
        <button class="button" @click="cancel">キャンセル</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import CoopStore from '@/stores/CoopStore';
import AuthStore from '@/stores/AuthStore';
import SnackbarStore from '@/stores/SnackbarStore';
import Wave from '@/components/Wave';
import constant from '@/constants/constant';
export default {
  name: 'Add',
  props: ['coopId', 'resultId'],
  data () {
    return {
      coop: {},
      result: JSON.parse(JSON.stringify(constant.resultObject))
    };
  },
  created () {
    if (!AuthStore.data.user) {
      alert('サインインしてください');
      this.$router.push({ name: 'schedule' });
    }

    CoopStore.methods.getCoop(this.coopId).then(result => {
      // バイト情報を取得
      this.coop = result;
      if (this.resultId) {
        CoopStore.methods.getResult(this.coopId, this.resultId).then(result => {
          // バイト結果一覧を取得
          const resultCopy = JSON.parse(JSON.stringify(result));
          this.result = Vue.util.extend(this.result, resultCopy);
        }).catch(err => {
          SnackbarStore.methods.openError(this, err);
        });
      }
    }).catch(err => {
      SnackbarStore.methods.openError(this, err);
    });
  },
  components: {
    Wave
  },
  methods: {
    add () {
      CoopStore.methods.startLoading();
      CoopStore.methods.addResult(this.coopId, this.result).then(() => {
        CoopStore.methods.endLoading();
        SnackbarStore.methods.openInfo(this, '追加しました');
        this.$router.replace({ name: 'coop', params: { 'coopId': this.coopId } });
      }).catch(err => {
        CoopStore.methods.endLoading();
        SnackbarStore.methods.openError(this, err);
      });
    },
    edit () {
      CoopStore.methods.startLoading();
      CoopStore.methods.updateResult(this.coopId, this.resultId, this.result).then(() => {
        CoopStore.methods.endLoading();
        SnackbarStore.methods.openInfo(this, '変更しました');
        this.$router.replace({ name: 'coop', params: { 'coopId': this.coopId } });
      }).catch(err => {
        CoopStore.methods.endLoading();
        SnackbarStore.methods.openError(this, err);
      });
    },
    cancel () {
      this.$router.replace({ name: 'coop', params: { 'coopId': this.coopId } });
    }
  }
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/initial-variables.sass";
.back-button-container {
  background-image: url('../assets/stripe.svg');
  background-size: 8rem;
  background-color: $grey-dark;
  padding: 0.5rem 1rem;

  a {
    padding: 0.5rem 1rem;
  }
}

#Add {
  background-color: $white;
  padding: 2rem 1rem;

  .wave-container {
    &:not(:first-of-type) {
      margin-top: 2rem;
    }
  }

  header {
    margin: 0 0 1rem 0;
    border-bottom: 1px solid $grey-lighter;
  }

  .is-narrow {
    width: 9rem;
  }

  .columns {
    margin-top: 0;

    &.category-columns {
      margin-bottom: 0;
    }
  }

  .column {
    padding-top: 0;
    padding-bottom: 0;

    &.label-column {
      padding-top: 0.375em;
      line-height: 1.25;
    }

    &:not(:first-of-type) {
      padding-top: 0;
    }
  }

  .add-field {
    flex-direction: row;
    flex-wrap: wrap;

    .add-field-button {
      margin-bottom: 1rem;

      &:not(:last-of-type) {
        margin-right: 1rem;
      }

      >.button {
        border-radius: 0;
      }
    }
  }

  .button-container {
    margin-top: 1rem;

    .button {
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
    }
  }

  .egg-input .icon {
    color: orangered;
  }

  .gold-egg-input .icon {
    color: gold;
  }

  .rescue-input .icon {
    color: mediumvioletred;
  }
}
</style>
