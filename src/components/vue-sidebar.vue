<template>
  <ul class="sidenav app-sidenav light-blue lighten-4" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ["value"],
  data: () => ({
    links: [
      {
        title: "Главная",
        url: "/",
        exact: true,
      },
      {
        title: "Новый клиент",
        url: "/record",
      },
    ],
  }),
};
</script>
