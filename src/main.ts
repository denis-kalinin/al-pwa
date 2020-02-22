import Vue from 'vue';
// import App from '@/App.vue';
import Dashboard from '@/views/Dashboard.vue';
import FirestoreDashboard from '@/views/FirestoreDashboard.vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
// import FirebaseApp from './services/FirebaseApp';

Vue.config.productionTip = false;

// const a = new FirebaseApp();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(Dashboard),
}).$mount('#app');
