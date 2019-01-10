// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'lib-flexible'
import { AlertPlugin, ToastPlugin } from 'vux'
import VueClipboard from 'vue-clipboard2'
import wx from 'weixin-js-sdk'
import 'swiper/dist/css/swiper.min.css'
import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle)

Vue.use(VueClipboard)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(wx)


Vue.config.productionTip = false
Vue.prototype.$ajax = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
