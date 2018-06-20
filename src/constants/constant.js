const waveObject = {
  goldResult: null,
  goldNorma: null,
  usedWeapon: null,
  randomWeaponName: null,
  waterlevel: null,
  waveType: null
};
const weaponObject = {
  'id': null,
  'image': null,
  'name': null
};

const constant = {
  resultObject: {
    total: {
      goldEgg: null,
      egg: null,
      myGoldEgg: null,
      myEgg: null,
      rescue: null,
      rescued: null,
      clearWave: null
    },
    waves: [
      JSON.parse(JSON.stringify(waveObject)),
      JSON.parse(JSON.stringify(waveObject)),
      JSON.parse(JSON.stringify(waveObject))
    ]
  },
  coopObject: {
    'start': null,
    'start_utc': null,
    'start_t': null,
    'end': null,
    'end_utc': null,
    'end_t': null,
    'stage': {
      'image': null,
      'name': null
    },
    'weapons': [
      JSON.parse(JSON.stringify(weaponObject)),
      JSON.parse(JSON.stringify(weaponObject)),
      JSON.parse(JSON.stringify(weaponObject)),
      JSON.parse(JSON.stringify(weaponObject))
    ]
  },
  momentFormatWithDay: 'YY/MM/DD(ddd) HH:mm'
};

export default constant;
