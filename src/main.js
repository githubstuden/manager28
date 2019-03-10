import Vue from 'vue'
import App from './App.vue'
import router from "./lib/router"
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './lib/http'
Vue.use(axios)
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
