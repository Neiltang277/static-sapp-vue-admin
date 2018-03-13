import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import api from './api'
import moment from 'moment'

Vue.use(ElementUI)
Vue.config.productionTip = false

moment.locale('zh-cn')

Vue.prototype.$api = api
Vue.prototype.$moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
