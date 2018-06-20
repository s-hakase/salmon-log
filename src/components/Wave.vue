<template>
  <div id="AddWave">
    <header class="title is-size-6">Wave{{ number }}</header>
    <div class="columns is-tablet category-columns">
      <div class="column is-narrow label-column">
        <label>使用ブキ</label>
      </div>
      <div class="column">
        <b-field class="add-field weapon-buttons">
          <b-radio-button class="add-field-button weapon-button" v-for="(weapon, index) in weapons" :key="`${index}-${weapon.id}`"
            v-model="wave.usedWeapon" type="is-theme" :native-value="weapon.id">
            <figure class="image is-96x96 is-hidden-touch">
              <img :src="weapon.image" :alt="weapon.name">
            </figure>
            <figure class="image is-64x64 is-hidden-desktop">
              <img :src="weapon.image" :alt="weapon.name">
            </figure>
            <div>
              <span>{{ weapon.name }}</span>
            </div>
          </b-radio-button>
        </b-field>
      </div>
    </div>
    <div class="columns is-tablet category-columns">
      <div class="column is-narrow label-column">
        <label>潮の高さ</label>
      </div>
      <div class="column">
        <b-field class="add-field is-hidden-tablet">
          <b-radio-button class="add-field-button" v-model="wave.waterlevel" type="is-theme" size="is-large" native-value="high">満潮</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waterlevel" type="is-theme" size="is-large" native-value="normal">通常</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waterlevel" type="is-theme" size="is-large" native-value="low">干潮</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waterlevel" type="is-theme" size="is-large" native-value="unknown">不明</b-radio-button>
        </b-field>
        <b-field class="add-field is-hidden-mobile">
          <b-radio-button class="add-field-button" v-model="wave.waterlevel" type="is-theme" native-value="high">満潮</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waterlevel" type="is-theme" native-value="normal">通常</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waterlevel" type="is-theme" native-value="low">干潮</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waterlevel" type="is-theme" native-value="unknown">不明</b-radio-button>
        </b-field>
      </div>
    </div>
    <div class="columns is-tablet category-columns">
      <div class="column is-narrow label-column">
        <label>Waveの種類</label>
      </div>
      <div class="column">
        <b-field class="add-field is-hidden-tablet">
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" size="is-large" native-value="normal">通常</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" size="is-large" native-value="rush">ヒカリバエ</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" size="is-large" native-value="fog">霧</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" size="is-large" native-value="seeker">間欠泉</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" size="is-large" native-value="griller">グリル</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" size="is-large" native-value="cohock">ドスコイ</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" size="is-large" native-value="mothership">ハコビヤ</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" size="is-large" native-value="unknown">不明</b-radio-button>
        </b-field>
        <b-field class="add-field is-hidden-mobile">
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" native-value="normal">通常</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" native-value="rush">ヒカリバエ</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" native-value="fog">霧</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" native-value="seeker">間欠泉</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" native-value="griller">グリル</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" native-value="cohock">ドスコイ</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" native-value="mothership">ハコビヤ</b-radio-button>
          <b-radio-button class="add-field-button" v-model="wave.waveType" type="is-theme" native-value="unknown">不明</b-radio-button>
        </b-field>
      </div>
    </div>
    <div class="columns is-tablet category-columns">
      <div class="column is-narrow label-column">
        <label>納品数 / ノルマ</label>
      </div>
      <div class="column">
        <b-field type="is-theme">
          <b-field class="is-hidden-tablet">
            <b-input class="gold-egg-input" type="number" icon="circle" size="is-large" v-model="wave.goldResult" placeholder="納品数"></b-input>
          </b-field>
          <b-field class="is-hidden-mobile">
            <b-input class="gold-egg-input" type="number" icon="circle" v-model="wave.goldResult" placeholder="納品数"></b-input>
          </b-field>
          <b-field class="is-hidden-tablet">
            <b-input class="gold-egg-input" type="number" icon="circle" size="is-large" v-model="wave.goldNorma" placeholder="ノルマ"></b-input>
          </b-field>
          <b-field class="is-hidden-mobile">
            <b-input class="gold-egg-input" type="number" icon="circle" v-model="wave.goldNorma" placeholder="ノルマ"></b-input>
          </b-field>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'wave',
    'number',
    'weapons'
  ]
};
</script>

<style lang="scss">
#AddWave {
  .weapon-button {
    >.button {
      flex-direction: column;
      height: auto;
    }
  }
}
</style>
