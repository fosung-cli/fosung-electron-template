import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FosungUI from 'fosung-ui'
import VueElectron from 'vue-electron'
import 'fosung-ui/lib/theme-chalk/index.css'
Vue.use(VueElectron)
Vue.use(FosungUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
