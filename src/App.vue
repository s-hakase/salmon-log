<template>
  <div id="app" @click="disableDropdown">
    <div class="gradient"></div>
    <div id="PageTop"></div>
    <nav id="nav" class="navbar is-fixed-top has-shadow is-dark-transparent">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item is-brand is-hidden-mobile" :to="{ name: 'schedule' }">SALMON LOG</router-link>
          <router-link class="navbar-item" :to="{ name: 'schedule' }">シフト表</router-link>
          <router-link class="navbar-item" :to="{ name: 'history' }">過去のバイト</router-link>
          <a role="button" :class="{'navbar-burger': true, 'has-text-white': true, 'is-active': burgerIsActive}"
            @click.stop="toggleActive(true)">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <div :class="{'navbar-menu': true, 'is-active': burgerIsActive}">
          <div class="navbar-end">
            <a class="navbar-item" @click="reload">
              <b-icon icon="reload"></b-icon>
              <span class="is-hidden-desktop">データを再取得</span>
            </a>
            <div :class="{'navbar-item': true, 'has-dropdown': true, 'is-active': isActive}" v-if="AuthStore.user === null">
              <a class="navbar-link" @click.stop="toggleActive(false)">
                <b-icon icon="account"></b-icon>
                サインイン
              </a>
              <div class="navbar-dropdown is-right">
                <a class="navbar-item" @click="signin('google')">
                  <b-icon class="signin-icon has-text-google" icon="google"></b-icon>
                  <span>Google でサインイン</span>
                </a>
                <a class="navbar-item" @click="signin('twitter')">
                  <b-icon class="signin-icon has-text-twitter" icon="twitter"></b-icon>
                  <span>Twitter でサインイン</span>
                </a>
              </div>
            </div>
            <div :class="{'navbar-item': true, 'has-dropdown': true, 'is-active': isActive}" v-else>
              <a class="navbar-link is-hidden-touch" @click.stop="toggleActive(false)">
                <img class="navbar-user-image" :src="AuthStore.user.photoURL" :alt="AuthStore.user.displayName">
              </a>
              <div class="navbar-dropdown is-right">
                <div class="navbar-item">
                  <img class="navbar-user-image is-hidden-desktop" :src="AuthStore.user.photoURL" :alt="AuthStore.user.displayName">
                  <strong class="has-text-dark is-size-5">{{ AuthStore.user.displayName }}</strong>
                  <span class="has-text-dark is-size-7">でサインイン中</span>
                </div>
                <hr class="navbar-divider">
                <a class="navbar-item" @click="signout">サインアウト</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view id="page" class="container" />
    <div class="to-top">
      <a class="has-text-white to-top-link" href="#" v-scroll-to="'#PageTop'">
        <b-icon icon="chevron-up"></b-icon>
        <span class="is-hidden-mobile">画面Topに戻る</span>
      </a>
    </div>
    <footer id="footer" class="footer">
      <div class="container">
        <div class="media">
          <div class="media-content">
            <p>Powered by <a href="https://spla2.yuu26.com/" target="_blank">Spla2 API</a></p>
          </div>
          <div class="media-right">
            <p>作った人: <a href="https://twitter.com/wal_hakase" target="_blank"><b-icon icon="twitter"></b-icon></a></p>
          </div>
        </div>
      </div>
    </footer>
    <b-loading :active="CoopStore.loading"></b-loading>
  </div>
</template>

<script>
import CoopStore from '@/stores/CoopStore';
import AuthStore from '@/stores/AuthStore';
import SnackbarStore from '@/stores/SnackbarStore';

export default {
  name: 'App',
  data () {
    return {
      AuthStore: AuthStore.data,
      CoopStore: CoopStore.data,
      isActive: false,
      burgerIsActive: false
    };
  },
  created () {
    CoopStore.methods.fetch()
      .then(() => {
        // 取得完了
      })
      .catch(err => {
        SnackbarStore.methods.openError(this, err);
      });
  },
  methods: {
    reload () {
      CoopStore.methods.startLoading();
      CoopStore.methods.reload().then(() => {
        CoopStore.methods.endLoading();
      }).catch(err => {
        CoopStore.methods.endLoading();
        SnackbarStore.methods.openError(this, err);
      });
    },
    signin (providerName) {
      CoopStore.methods.startLoading();
      let promise;
      switch (providerName) {
        case 'google':
          promise = AuthStore.methods.signInWithGoogle();
          break;
        case 'twitter':
          promise = AuthStore.methods.signInWithTwitter();
          break;
        default:
          return;
      };
      promise.then(() => {
        CoopStore.methods.reload();
      }).then(() => {
        CoopStore.methods.endLoading();
        SnackbarStore.methods.openInfo(this, `${AuthStore.data.user.displayName}でサインインしました`);
      }).catch(err => {
        CoopStore.methods.endLoading();
        SnackbarStore.methods.openError(this, err);
      });
    },
    signout () {
      CoopStore.methods.startLoading();
      AuthStore.methods.signout().then(() => {
        // 完了時処理
        CoopStore.methods.resetResults();
        // 一瞬なので少し長めにローディング画面を出す
        setTimeout(() => {
          this.$router.push({ name: 'schedule' });
          CoopStore.methods.endLoading();
          SnackbarStore.methods.openInfo(this, 'サインアウトしました');
        }, 1000);
      }).catch(err => {
        CoopStore.methods.endLoading();
        SnackbarStore.methods.openError(this, err);
      });
    },
    toggleActive (burger) {
      if (burger) {
        this.burgerIsActive = !this.burgerIsActive;
      } else {
        this.isActive = !this.isActive;
      }
    },
    disableDropdown () {
      this.isActive = false;
      this.burgerIsActive = false;
    }
  }
};
</script>

<style src="./assets/buefy-custom.scss" lang="scss"></style>
<style lang="scss">
@import "~bulma/sass/utilities/initial-variables.sass";
@import "./assets/buefy-custom.scss";
#app {
  background-color: $primary-darker;
  font-family: "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Meiryo, メイリオ, sans-serif;
  min-height: 100vh;
}
.gradient {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, $primary-dark 0%, transparent 80%);
}
#nav {
  background-color: rgb(255, 255, 255);
  background-image: url('./assets/stripe.svg');
  background-size: 8rem;

  .navbar-brand .router-link-exact-active:not(.is-brand) {
    color: $theme;
    border-bottom: 3px solid $theme;
  }
}
.signin-icon {
  margin-right: 1em;
}
.to-top {
  max-height: 0;
  $toTopButtonHeight: 3rem;
  transform: translateY(-$toTopButtonHeight); // heightを0、ボタンの高さ分上に移動
  position: sticky;
  bottom: 0;
  text-align: center;

  .to-top-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0.5rem;
    height: $toTopButtonHeight;
    min-width: $toTopButtonHeight;
    border-radius: $radius-large $radius-large 0 0;
    overflow: hidden;
    background-color: rgba($theme, 0.6);

    &:hover {
      background-color: lighten($theme, 8%);
    }
  }
}
.navbar-user-image {
  border-radius: 50%;
}
#page {
  padding: 0;
  padding-top: 3.25rem;
  min-height: calc(100vh - 3.25rem);
}
#footer {
  position: relative;
  z-index: 1;
  background-color: rgb(54, 54, 54);
  background-image: url('./assets/stripe.svg');
  background-size: 8rem;
}
h1 {
  &.title {
    color: $white;
    text-align: center;
  }
  &.page-title {
    margin-top: 2rem;
  }
}
h2 {
  &.title-salmon-green {
    color: $salmon-green;
    text-shadow: 2px 2px 0px $salmon-green-invert;
  }
}
.modal-card-body {
  color: $dark;
}
</style>
