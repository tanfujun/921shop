import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import antVue from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';



import API from '@/api'
Vue.prototype.$API = API

Vue.use(antVue)

import '@/assets/reset.less'

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
  mounted(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')
