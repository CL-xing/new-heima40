import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'

import '@/styles/reset.css'
import { Toast } from 'vant'
import { Uploader } from 'vant'
import { Dialog } from 'vant'
import { Field } from 'vant';
import { Picker } from 'vant';
Vue.use(Toast)
Vue.use(Uploader);
Vue.use(Dialog)
Vue.use(Field);
Vue.use(Picker);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
