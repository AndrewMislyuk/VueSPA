<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(firebaseError) {
      console.log(firebaseError);
    },
  },
};
</script>
