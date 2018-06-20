<template>
  <div v-if="data && data.total" class="card has-text-white result-card" :class="{'is-clear': isClear(data.total.clearWave) }">
    <div class="card-header">
      <div class="level is-mobile">
        <div class="level-left">
          <p class="level-item clear-or-not">{{ data.total.clearWave | clearOrNot }}</p>
        </div>
        <div class="level-right">
          <p class="level-item created">登録日時：{{ data.createdAt | moment }}</p>
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <div class="columns is-marginless is-mobile">
            <div class="column result-total-column">
              <p class="heading">金イクラ収獲数 (自己)</p>
              <p class="title is-size-5 is-hidden-touch has-text-white egg gold">{{ data.total.goldEgg }} ({{ data.total.myGoldEgg }}) - {{ data.total.myGoldEgg / data.total.goldEgg | percentRate }}</p>
              <p class="title is-size-6 is-hidden-desktop has-text-white egg gold">{{ data.total.goldEgg }} ({{ data.total.myGoldEgg }})</p>
            </div>
            <div class="column result-total-column">
              <p class="heading">イクラ収獲数 (自己)</p>
              <p class="title is-size-5 is-hidden-touch has-text-white egg">{{ data.total.egg }} ({{ data.total.myEgg }}) - {{ data.total.myEgg / data.total.egg | percentRate }}</p>
              <p class="title is-size-6 is-hidden-desktop has-text-white egg">{{ data.total.egg }} ({{ data.total.myEgg }})</p>
            </div>
            <div class="column result-total-column">
              <p class="heading">救出 / 被救出 (レート)</p>
              <p class="title is-size-5 is-hidden-touch has-text-white rescue">{{ data.total.rescue }} / {{ data.total.rescued }} ({{ data.total.rescue / data.total.rescued | rescueRate }})</p>
              <p class="title is-size-6 is-hidden-desktop has-text-white rescue">{{ data.total.rescue }} / {{ data.total.rescued }} ({{ data.total.rescue / data.total.rescued | rescueRate }})</p>
            </div>
          </div>
          <div class="columns is-marginless is-mobile">
            <div class="column result-wave-column" v-for="(wave, index) in data.waves" :key="'wave-' + (index + 1)">
              <p class="heading">Wave-{{ index + 1 }}</p>
              <p>潮の高さ: {{ wave.waterlevel | waterlevelLabel }} ／ 種類: {{ wave.waveType | waveTypeLabel }}</p>
              <p class="is-flex weapon-and-eggs">
                <img class="wave-weapon-image image is-48x48" v-if="typeof wave.usedWeapon !== 'undefined'" :src="wave.usedWeapon | weaponImage" :alt="wave.usedWeapon | weaponName">
                <span class="wave-eggs egg gold">{{ wave.goldResult }} / {{ wave.goldNorma }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="media-right">
          <a @click="showMenu"><b-icon icon="dots-vertical"></b-icon></a>
          <b-modal :active.sync="isActiveMenu" scroll="keep">
            <result-modal-menu :coopId="data.coopId" :resultId="data.key" @delete-button-click="deleteConfirm"></result-modal-menu>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import CoopStore from '@/stores/CoopStore';
import SnackbarStore from '@/stores/SnackbarStore';
import ResultModalMenu from '@/components/ResultModalMenu';
export default {
  props: ['data'],
  data () {
    return {
      isActiveMenu: false
    };
  },
  filters: {
    clearOrNot (clearWave) {
      if (clearWave === 'wave3') {
        return 'Clear!!';
      }
      return 'Failure';
    },
    moment (time) {
      return moment(new Date(time)).format('YY/MM/DD HH:mm');
    },
    weaponImage (id) {
      return CoopStore.methods.getWeapon(id).image;
    },
    weaponName (id) {
      return CoopStore.methods.getWeapon(id).name;
    }
  },
  methods: {
    isClear (clearWave) {
      return clearWave === 'wave3';
    },
    showMenu (key) {
      this.isActiveMenu = true;
    },
    deleteConfirm () {
      this.$dialog.confirm({
        type: 'is-theme',
        message: '削除しますか？',
        onConfirm: this.deleteResult
      });
    },
    deleteResult () {
      CoopStore.methods.deleteResult(this.data.coopId, this.data.key).then(() => {
        SnackbarStore.methods.openInfo(this, `削除しました`);
      }).catch(err => {
        SnackbarStore.methods.openError(this, err);
      });
    }
  },
  components: {
    ResultModalMenu
  }
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables.sass";
@import "../assets/buefy-custom.scss";

.result-card {
  background-color: $black-ter;

  &.is-clear {
    .card-header .clear-or-not {
      color: $salmon-green;
    }
  }

  &:not(:first-of-type) {
    margin-top: 0.85rem;
  }

  $cardContentPadding: 0.5rem 0.65rem;
  .card-header {
    padding: $cardContentPadding;
    font-weight: bold;
    background-image: url('../assets/stripe.svg');
    background-size: 8rem;

    .clear-or-not {
      color: $theme;
    }

    .level {
      width: 100%;
    }
  }

  .card-content {
    padding: $cardContentPadding;

    .result-total-column,
    .result-wave-column {
      padding: 0;
      flex: 0 0 33.333%;
    }

    .egg {
      &::before {
        content: "";
        display: inline-block;
        margin-right: 0.4em;
        text-align: right;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        background-color: orangered;
      }

      &.gold::before {
        background-color: gold;
      }
    }

    .rescue {
      &::before {
        content: "";
        display: inline-block;
        margin-right: 0.4em;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        background-color: purple;
      }
    }

    .weapon-and-eggs {
      align-items: center;
    }

    button.delete {
      background-color: $theme;
    }
  }
}
</style>
