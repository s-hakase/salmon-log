<template>
  <div>
    <h1 class="title page-title">過去のバイト</h1>
    <b-switch type="is-theme" v-model="CoopStore.historyIsAsc">日付の古い順に表示する</b-switch>
    <div class="columns is-multiline">
      <coop-card class="column is-one-third" v-for="baito in sortedHistory" :key="baito.start_t" :baito="baito" />
    </div>
  </div>
</template>

<script>
import CoopStore from '@/stores/CoopStore';
import CoopCard from '@/components/CoopCard';
export default {
  name: 'History',
  data () {
    return {
      CoopStore: CoopStore.data
    };
  },
  components: {
    CoopCard
  },
  computed: {
    sortedHistory () {
      const isAsc = CoopStore.data.historyIsAsc;
      return CoopStore.data.history.sort((a, b) => {
        if (isAsc) {
          return a.start_t - b.start_t;
        }
        return b.start_t - a.start_t;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin-bottom: 2rem;
}
</style>
