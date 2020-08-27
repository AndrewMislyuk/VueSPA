import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        layout: "main",
      },
      component: () => import("./views/vue-history.vue"),
    },
    {
      path: "/notfoundclient",
      name: "errorpage",
      meta: {
        layout: "main",
      },
      component: () => import("./views/vue-error-page.vue"),
    },
    {
      path: "/recordupdate/:id",
      name: "recordupdate",
      meta: {
        layout: "main",
      },
      component: () => import("./views/vue-record-update.vue"),
    },
    {
      path: "/record",
      name: "record",
      meta: {
        layout: "main",
      },
      component: () => import("./views/vue-record.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: {
        layout: "empty",
      },
      component: () => import("./views/vue-login.vue"),
    },
  ],
});
