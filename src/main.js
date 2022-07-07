import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/api'
import '@/vant' // vant的引入文件
import '@/assets/css/reset.css' // 初始化样式
import '@/assets/mobile/flexible.js' // 自适应宽度

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
