<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import emptyLayout from "./layout/vue-empty-layout";
import mainLayout from "./layout/vue-main-layout";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  components: {
    emptyLayout,
    mainLayout,
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/styles/style.scss";
</style>
