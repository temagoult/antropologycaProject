import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VeeValidate from 'vee-validate'
import axios from 'axios';
Vue.prototype.$http = axios



console.log(axios.isCancel('something'));


const MOBILEREG=  /^(00213|\+213|0)(5|6|7)[0-9]{8}$/
VeeValidate.Validator.extend('phone', {  getMessage: field => `The ${field} must be either a valid phone number `,
validate: value => MOBILEREG.test(value)
});

VeeValidate.Validator.extend('age', {  getMessage: field => `The ${field} must be more than 18 `,
validate: value => value>18
});

Vue.use(VeeValidate);
// import createVuetify  from 'vuetify'


import VueI18n from 'vue-i18n'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// const Vuetify = createVuetify({
//   locale: {
//     locale: 'ar',
//     fallback: 'en',
//     messages: { ar },
//   },
// })



Vue.use(VueI18n)



Vue.config.productionTip = false

new Vue({
  router,
  vuetify,

  render: h => h(App)
}).$mount('#app')
