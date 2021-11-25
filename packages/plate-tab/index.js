import ElPlate from './src/plate-tab.vue';

/* istanbul ignore next */
ElPlate.install = function(Vue) {
  Vue.component(ElPlate.name, ElPlate);
};

export default ElPlate;
