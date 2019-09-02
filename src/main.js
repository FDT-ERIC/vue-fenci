import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from "./router.js"
import axios from 'axios'

// 引入全局配置文件
import $conf from "./common/config/config.js"
Vue.prototype.$conf = $conf

Vue.config.productionTip = false
Vue.prototype.$axios = axios; // 可以全局使用它进行接口调用

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
