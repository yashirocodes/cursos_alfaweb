import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

/* FIREBASE */

import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyBIIs30aqQ7teM0FQzWBlWdD1SAyWGJvlY",
  authDomain: "cursoalfaweb-86851.firebaseapp.com",
  projectId: "cursoalfaweb-86851",
  storageBucket: "cursoalfaweb-86851.appspot.com",
  messagingSenderId: "146266066332",
  appId: "1:146266066332:web:923467dd20ad3188468c59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/*END OF FIRE BASE CONFIGURATION*/


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
