<template>
  <table class="striped centered">
    <thead>
      <tr>
        <th>#</th>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Телефон</th>
        <th>Программа</th>
        <th>Коуч</th>
        <th>Описание</th>
        <th>Оплата</th>
        <th>Просмотр</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(client, index) of displayTasks" :key="client.id">
        <td>{{ index + 1 }}</td>
        <td>{{ client.name }}</td>
        <td>{{ client.surname }}</td>
        <td>{{ client.telephone }}</td>
        <td>{{ client.program }}</td>
        <td>{{ client.coach }}</td>
        <td>{{ client.description }}</td>
        <td>{{ client.price }}</td>
        <td>
          <button
            class="btn waves-effect waves-light orange"
            v-tooltip="'Просмотр записи'"
            @click="$router.push(`/recordupdate/${client.id}`)"
          >
            <i class="material-icons">create</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    displayTasks: {
      required: true,
      type: Array,
    },
  },
  async mounted() {
    await this.fetchClients();
  },
  computed: {
    ...mapGetters(["allClients", "allClientsLength"]),
  },
  methods: {
    ...mapActions(["fetchClients"]),
  },
};
</script>
