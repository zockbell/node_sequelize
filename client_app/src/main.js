import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import "@/api/axiosConfig";
import zock from 'zock-button';
import 'zock-button/zock-button.css';

Vue.use(iView);
Vue.use(zock);

// 声明全局axios
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
