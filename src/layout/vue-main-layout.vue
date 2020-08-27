<template>
  <div class="app-main-layout">
    <navbar @hide-sidebar="isOpen = !isOpen" />
    <sidebar v-model="isOpen" />
    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/vue-navbar.vue";
import sidebar from "@/components/vue-sidebar.vue";

export default {
  name: "vue-main-layout",
  components: {
    navbar,
    sidebar,
  },
  data: () => ({
    isOpen: true,
  }),
};
</script>
