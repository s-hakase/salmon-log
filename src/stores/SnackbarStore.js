const SnackbarStore = {
  methods: {
    openInfo (vm, msg) {
      vm.$snackbar.open({
        position: 'is-top-right',
        message: msg,
        actionText: 'close'
      });
    },
    openError (vm, err) {
      console.error(err);
      let msg;
      if (typeof err.message !== 'undefined') {
        msg = err.message;
      } else if (typeof err === 'string') {
        msg = err;
      } else {
        msg = 'エラーが発生しました。詳しくはコンソールを確認してください。';
      }
      vm.$snackbar.open({
        queue: false,
        indefinite: true,
        type: 'is-danger',
        position: 'is-top-right',
        message: msg,
        actionText: 'close'
      });
    }
  }
};

export default SnackbarStore;
