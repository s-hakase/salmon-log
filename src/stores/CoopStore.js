/**
 * バイト情報のやり取りを受け持つ
 */
import * as firebase from 'firebase/app';
import 'firebase/database';
import AuthStore from '@/stores/AuthStore';
let db;
const CoopStore = {
  data: {
    coop: [], // 未来含むバイト一覧
    latestCoop: undefined, // 開催中または最近開催されたバイト
    selectedCoop: undefined, // 選択中のバイト
    schedule: [], // 今後のバイトスケジュール
    history: [], // 過去のバイト一覧
    historyIsAsc: true, // 過去バイトのソートフラグ
    results: {}, // バイトごとの結果
    weapons: {}, // ブキ情報
    loading: false, // ローディング画面表示フラグ
    onReloadedFunctions: []
  },
  methods: {
    init () {
      db = firebase.database();
    },
    /**
     * リロード開始・終了時に呼ぶ関数を登録する
     * @param {(boolean) => void} fn リロード開始または完了時に呼ばれる関数
     * @param {string} key 関数のキー
     */
    onReloaded (fn, key) {
      CoopStore.data.onReloadedFunctions[key] = fn;
    },
    executeOnReloadedFunctions (loaded) {
      const keys = Object.keys(CoopStore.data.onReloadedFunctions);
      if (keys.length > 0) {
        keys.forEach(key => CoopStore.data.onReloadedFunctions[key](loaded));
      }
    },
    reload () {
      CoopStore.methods.executeOnReloadedFunctions(false);
      let promises = [CoopStore.methods.fetch(true)];
      if (AuthStore.data.user) {
        promises.push(CoopStore.methods.fetchResults(true));
      }
      return new Promise((resolve, reject) => {
        Promise.all(promises).then(() => {
          CoopStore.methods.executeOnReloadedFunctions(true);
          resolve('resolve');
        }).catch(error => {
          reject(error);
        });
      });
    },
    /**
     * Spla2 APIからバイト一覧とスケジュールを取得する
     * @param {boolean} reload 再取得フラグ
     */
    fetch (reload) {
      if (!reload && CoopStore.data.coop.length > 0 &&
        CoopStore.data.schedule.length > 0) {
        return new Promise((resolve) => {
          resolve('Success');
        });
      }
      return new Promise((resolve, reject) => {
        Promise.all([
          fetch('https://spla2.yuu26.com/coop'),
          fetch('https://spla2.yuu26.com/coop/schedule')
        ])
          .then(responses => Promise.all(responses.map(res => res.json())))
          .then(data => {
            const now = Date.now() / 1000;

            CoopStore.data.coop = data[0].result;
            CoopStore.methods.setWeapons(CoopStore.data.coop);
            CoopStore.data.schedule = data[1].result;

            CoopStore.data.history = data[0].result.filter(c => c.start_t < now);
            CoopStore.methods.sortHistory(CoopStore.data.historyIsAsc);

            CoopStore.data.latestCoop = CoopStore.data.history[CoopStore.data.history.length - 1];

            resolve('Success');
          })
          .catch(reason => {
            reject(reason);
          });
      });
    },
    /**
     * バイト情報からブキ情報を取得
     * @param {Object} coop Spla2 APIから取得したバイト情報
     */
    setWeapons (coop) {
      coop.forEach(c => {
        if (!c.weapons) {
          return;
        }
        c.weapons.forEach(w => {
          if (CoopStore.data.weapons[w.id]) {
            return;
          }
          CoopStore.data.weapons[w.id] = w;
        });
      });
    },
    /**
     * IDからブキ情報を取得
     * @param {string} id ブキのID
     * @return {Object} ブキ情報
     */
    getWeapon (id) {
      return CoopStore.data.weapons[id];
    },

    /* Coop */

    /**
     * バイト開始時刻を受け取り該当のバイトを返す
     * @param {number} id バイト開始時刻
     * @returns {Promise} promise
     */
    getCoop (id) {
      if (typeof id !== 'number') {
        id = parseInt(id);
      }
      return new Promise((resolve, reject) => {
        CoopStore.methods.fetch().then(() => {
          const result = CoopStore.data.coop.find(c => {
            return c.start_t === id;
          });
          resolve(result);
        }).catch(err => {
          reject(err);
        });
      });
    },
    /**
     * @param {string} filter フィルタ文字列
     * @return フィルタ済みのCoop配列
     */
    getCoopWithFilter (filter) {
      return CoopStore.data.coop.filter(c => {
        if (c.weapons && c.stage) {
          const hasWeapon = typeof c.weapons.find(w => w.name.indexOf(filter) > -1) !== 'undefined';
          const hasStage = c.stage.name.indexOf(filter) > -1;
          return hasWeapon || hasStage;
        }
        return false;
      });
    },
    /**
     * バイト開始時刻を受け取り該当のバイトを選択状態にする
     * @param {number} id バイト開始時刻
     */
    selectCoop (id) {
      let coop = CoopStore.methods.getCoop(id);
      if (typeof coop === 'undefined') {
        setTimeout(() => {
          CoopStore.methods.selectCoop(id);
        }, 200);
        return;
      }
      CoopStore.data.selectedCoop = coop;
    },

    /* History */

    /**
     * 過去バイト一覧をソートする
     */
    sortHistory () {
      if (CoopStore.data.historyIsAsc) {
        CoopStore.data.history.sort((a, b) => {
          return a.start_t - b.start_t;
        });
      } else {
        CoopStore.data.history.sort((a, b) => {
          return b.start_t - a.start_t;
        });
      }
    },

    /**
     * 結果を格納
     * @param {number} id バイト開始時刻
     * @param {object} result バイト結果
     */
    addResult (id, result) {
      if (!db) {
        CoopStore.methods.init();
      }
      result.createdAt = Date.now();
      return new Promise((resolve, reject) => {
        const addRef = db.ref(`/results/${AuthStore.data.user.uid}/${id}`).push();
        addRef.set(result).then(() => {
          return this.getResults(id, true);
        }).then(() => {
          resolve('Success');
        }).catch(err => {
          reject(err);
        });
      });
    },

    /**
     * バイト結果を更新
     * @param {number} id バイト開始時刻
     * @param {string} resultId バイト結果ID
     * @param {object} result バイト結果
     */
    updateResult (id, resultId, result) {
      if (!db) {
        CoopStore.methods.init();
      }
      // updatedAtみたいなのいる？
      return new Promise((resolve, reject) => {
        db.ref(`/results/${AuthStore.data.user.uid}/${id}/${resultId}`).update(result).then(() => {
          // resultsを更新
          return this.getResults(id, true);
        }).then(() => {
          resolve('Success');
        }).catch(err => {
          reject(err);
        });
      });
    },

    /**
     * バイト結果を更新
     * @param {number} id バイト開始時刻
     * @param {string} resultId バイト結果ID
     */
    deleteResult (id, resultId) {
      if (!db) {
        CoopStore.methods.init();
      }
      // 物理削除
      return new Promise((resolve, reject) => {
        db.ref(`/results/${AuthStore.data.user.uid}/${id}/${resultId}`).remove().then(() => {
          // resultsを更新
          return this.getResults(id, true);
        }).then(() => {
          // 登録された関数を呼び出す
          CoopStore.methods.executeOnReloadedFunctions(true);
          resolve('Success');
        }).catch(err => {
          reject(err);
        });
      });
    },

    /**
     * バイトごとの結果一覧を取得
     * @param {string} id バイト開始時刻
     * @param {boolean} reload idで指定したバイトを更新する
     */
    getResults (id, reload) {
      return new Promise((resolve, reject) => {
        if (typeof CoopStore.data.results !== 'object' || Object.keys(CoopStore.data.results).length === 0) {
          // results未取得
          CoopStore.methods.fetchResults().then(() => {
            resolve(CoopStore.data.results[id] ? CoopStore.data.results[id] : null);
          }).catch(error => {
            reject(error);
          });
        } else if (reload) {
          // リロードフラグあり
          db.ref(`/results/${AuthStore.data.user.uid}/${id}`).once('value').then(snapshot => {
            CoopStore.data.results[id] = snapshot.val();
            resolve(CoopStore.data.results[id] ? CoopStore.data.results[id] : null);
          }).catch(error => {
            reject(error);
          });
        } else {
          // 取得済み
          resolve(CoopStore.data.results[id] ? CoopStore.data.results[id] : null);
        }
      });
    },

    /**
     * バイト結果を取得
     * @param {string} id バイト開始時刻
     * @param {string} resultId バイト結果ID
     * @param {boolean} reload バイト再取得フラグ
     */
    getResult (id, resultId, reload) {
      return new Promise((resolve, reject) => {
        CoopStore.methods.getResults(id, reload).then(results => {
          resolve(results && results[resultId] ? results[resultId] : null);
        }).catch(error => {
          reject(error);
        });
      });
    },

    /**
     * バイトの結果一覧を取得
     */
    fetchResults (reload) {
      if (!reload && CoopStore.data.results.length > 0) {
        return new Promise(resolve => {
          resolve('resolve');
        });
      }

      if (!db) {
        CoopStore.methods.init();
      }
      return new Promise((resolve, reject) => {
        db.ref(`/results/${AuthStore.data.user.uid}/`).once('value').then(snapshot => {
          CoopStore.data.results = snapshot.val() || {};
          resolve('resolve');
        }).catch(error => {
          reject(error);
        });
      });
    },

    resetResults () {
      CoopStore.data.results = {};
    },

    startLoading () {
      CoopStore.data.loading = true;
    },

    endLoading () {
      CoopStore.data.loading = false;
    }
  }
};

export default CoopStore;
