<template>
  <div>
    <h1 class="title page-title">シフト表</h1>
    <div class="container">
      <h2 class="title is-marginless title-salmon-green">{{ CoopStore.schedule[0] | headerString }}</h2>
      <coop-card-large :baito="CoopStore.schedule[0]"></coop-card-large>
    </div>
    <div class="container">
      <h2 class="title is-marginless title-salmon-green">つぎ</h2>
      <coop-card-large :baito="CoopStore.schedule[1]"></coop-card-large>
    </div>
    <div class="container">
      <h2 class="title is-marginless title-salmon-green">そのつぎ</h2>
      <coop-schedule-card :baitos="CoopStore.schedule"></coop-schedule-card>
    </div>
  </div>
</template>

<script>
import CoopStore from '@/stores/CoopStore';
import CoopCardLarge from '@/components/CoopCardLarge';
import CoopScheduleCard from '@/components/CoopScheduleCard';
import moment from 'moment';
export default {
  name: 'Schedule',
  data () {
    return {
      CoopStore: CoopStore.data
    };
  },
  filters: {
    headerString (coop) {
      if (!coop) {
        return '';
      }
      const utc = coop.start_utc;
      const now = Date.now();
      const startDate = new Date(utc);
      const start = startDate.getTime();
      if (start <= now) {
        return 'オープン!!';
      } else {
        return 'もうすぐ (' + moment(startDate).fromNow() + ')';
      }
    }
  },
  methods: {
    nextSchedule (coop) {
      return coop.slice(2);
    }
  },
  components: {
    CoopCardLarge,
    CoopScheduleCard
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container:not(:last-of-type) {
  margin-bottom: 2rem;
}
</style>
