import Vue from 'vue';
// import App from '@/App.vue';
// import Dashboard from '@/views/Dashboard.vue';
import DesignSystem from 'al-design-system';
import 'al-design-system/dist/system/system.css';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import FirestoreDashboard from '@/views/FirestoreDashboard.vue';
import i18n from './i18n';
// import FirebaseApp from './services/FirebaseApp';

Vue.config.productionTip = false;

Vue.use(DesignSystem);

// const a = new FirebaseApp();

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(FirestoreDashboard),
}).$mount('#app');
