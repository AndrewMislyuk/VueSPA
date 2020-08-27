import Vue from "vue";
import App from "./App.vue";
import "materialize-css/dist/js/materialize.min.js";
import router from "./router";
import dateFilter from "@/filters/date.filter";
import "./assets/styles/style.scss";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import store from "./store";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.filter("date", dateFilter);

firebase.initializeApp({
  apiKey: "AIzaSyBXYr54GI7AWOwci9wpG7pMyThEozoyAGs",
  authDomain: "vue-crmka.firebaseapp.com",
  databaseURL: "https://vue-crmka.firebaseio.com",
  projectId: "vue-crmka",
  storageBucket: "vue-crmka.appspot.com",
  messagingSenderId: "695271661012",
  appId: "1:695271661012:web:4ba89d2219972861224a41",
  measurementId: "G-68CSJYGTWG",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: (h) => h(App),
      router,
      store,
    }).$mount("#app");
  }
});
