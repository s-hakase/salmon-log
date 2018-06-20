import moment from 'moment';

const CustomFilters = {
  install (Vue, options) {
    Vue.filter('percentRate', value => {
      return (value * 100).toFixed() + '%';
    });
    Vue.filter('rescueRate', value => {
      return value.toFixed(2);
    });
    Vue.filter('waveTypeLabel', value => {
      switch (value) {
        case 'normal':
          return '通常';
        case 'rush':
          return 'ヒカリバエ';
        case 'fog':
          return '霧';
        case 'seeker':
          return '間欠泉';
        case 'griller':
          return 'グリル';
        case 'cohock':
          return 'ドスコイ';
        case 'mothership':
          return 'ハコビヤ';
        case 'unknown':
          return '不明';
        default:
          return '未定義';
      }
    });
    Vue.filter('waterlevelLabel', value => {
      switch (value) {
        case 'high':
          return '満潮';
        case 'normal':
          return '通常';
        case 'low':
          return '干潮';
        case 'unknown':
          return '不明';
        default:
          return '未定義';
      }
    });
    Vue.filter('moment', (value, format) => {
      format = format || 'YY/MM/DD HH:mm';
      return moment(new Date(value)).format(format);
    });
  }
};

export default CustomFilters;
