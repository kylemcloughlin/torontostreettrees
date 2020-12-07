import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import {securedAxiosInstance, plainAxiosInstance } from './assets/backend/axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import {KEY} from '.././fakeENV.js'



Vue.config.productionTip = false;
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
});
Vue.use(VueGoogleMaps, {
  load: {
    key: KEY,
 
  },

})


new Vue({
  render: h => h(App),
  securedAxiosInstance,
  plainAxiosInstance
  
}).$mount('#app')




