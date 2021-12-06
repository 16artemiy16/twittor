import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@mdi/font/css/materialdesignicons.css';
import '@/assets/scss/global.scss';
import VueRouter from 'vue-router';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app');
