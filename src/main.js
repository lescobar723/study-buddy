import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes/routes'
import CircularCountDownTimer from "vue-circular-count-down-timer" 
import { firestorePlugin } from 'vuefire'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(firestorePlugin);
Vue.use(CircularCountDownTimer);
Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);

const router = new VueRouter({
  routes: Routes
});

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
