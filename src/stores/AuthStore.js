import * as firebase from 'firebase/app';
import 'firebase/auth';
import config from '@/constants/config';

// Initialize Firebase
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    // サインインしていない状態
    AuthStore.methods.setUser(null);
    AuthStore.methods.clearCallbacks();
  } else {
    // サインイン済み
    AuthStore.methods.setUser(user);
    if (AuthStore.data.callbacks.length > 0) {
      AuthStore.data.callbacks.forEach(fn => fn());
      AuthStore.methods.clearCallbacks();
    }
  }
});

const AuthStore = {
  data: {
    user: null,
    callbacks: []
  },
  methods: {
    signInWithTwitter () {
      return new Promise((resolve, reject) => {
        const provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          resolve('resolve');
        }).catch((error) => {
          reject(error);
        });
      });
    },
    signInWithGoogle () {
      return new Promise((resolve, reject) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          resolve('resolve');
        }).catch((error) => {
          reject(error);
        });
      });
    },
    setUser (user) {
      AuthStore.data.user = user;
    },
    signout () {
      return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(() => {
          resolve('resolve');
        }).catch(error => {
          reject(error);
        });
      });
    },
    setCallback (fn) {
      AuthStore.data.callbacks.push(fn);
    },
    clearCallbacks () {
      AuthStore.data.callbacks = [];
    }
  }
};

export default AuthStore;
