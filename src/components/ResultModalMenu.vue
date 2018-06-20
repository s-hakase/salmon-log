<template>
  <div class="menu">
    <ul class="menu-list">
      <li><a class="has-text-dark" @click="this.edit">編集する</a></li>
      <li><a class="has-text-dark" @click="this.delete">削除する</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['coopId', 'resultId'],
  methods: {
    edit () {
      this.$parent.close();
      // setTimeoutしないとModalのcloseがうまくいかない TODO: もっといい方法がある気がする
      setTimeout(() => {
        this.$router.replace({
          name: 'edit',
          params: {coopId: this.coopId, resultId: this.resultId}
        });
      }, 0);
    },
    delete () {
      this.$parent.close();
      this.$emit('delete-button-click');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables.sass";
.menu {
  padding: 0.5rem 0;
  background-color: $white-ter;
  border-radius: $radius-large;
  overflow: hidden;

  a {
    &:hover {
      background-color: darken($white-ter, 5%);
    }
  }
}
</style>
