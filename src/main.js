import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import api from './api'
import moment from 'moment'
import axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false

moment.locale('zh-cn')

Vue.prototype.$api = api
Vue.prototype.$moment = moment
Vue.prototype.$axios = axios

// Vue.prototype.HOST = process.env.API_ROOT
// Vue.prototype.HOST = process.env.API_ROOT
// Vue.prototype.HOST = 'http://a-daily.qinshou.me'
// Vue.prototype.HOST = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
