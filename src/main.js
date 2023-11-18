import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VeeValidate from 'vee-validate'
import axios from 'axios';
Vue.prototype.$http = axios;
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import Vueditor from 'vueditor'
import Vuex from 'vuex'

import 'vueditor/dist/style/vueditor.min.css'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(BootstrapVue)
// Vue.use(BootstrapVueIcons)


Vue.config.devtools = true;

Vue.use(VueQuillEditor, /* { default global options } */)


// your config here
// let config = {
//   toolbar: [
//     'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor'
//   ],
//   fontName: [
//     {val: 'arial black'}, 
//     {val: 'times new roman'}, 
//     {val: 'Courier New'}
//   ],
//   fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
//   uploadUrl: ''
// };
// import Vue from "vue";
// import Vue2Editor from "vue2-editor";
Vue.use(Vuex);

Vue.use(Vueditor);
 
// name is optional
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })




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
