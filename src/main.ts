import Vue from 'vue';
// import DesignSystem from 'al-design-system';
// import 'al-design-system/dist/system/system.css';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import App from '@/App.vue';
import i18n from './i18n';

Vue.config.productionTip = false;

// Vue.use(DesignSystem);

// const a = new FirebaseApp();

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
