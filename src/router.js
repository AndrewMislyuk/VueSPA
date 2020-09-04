import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase/app";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        layout: "main",
        auth: true,
      },
      component: () => import("./views/vue-history.vue"),
    },
    {
      path: "/notfoundclient",
      name: "errorpage",
      meta: {
        layout: "main",
        auth: true,
      },
      component: () => import("./views/vue-error-page.vue"),
    },
    {
      path: "/recordupdate/:id",
      name: "recordupdate",
      meta: {
        layout: "main",
        auth: true,
      },
      component: () => import("./views/vue-record-update.vue"),
    },
    {
      path: "/record",
      name: "record",
      meta: {
        layout: "main",
        auth: true,
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

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
