<template>
  <div>
    <div class="page-title">
      <h3>Клиенты, всего: {{ allClientsLength }}</h3>
    </div>

    <!-- <div class="history-chart">
      <canvas></canvas>
    </div> -->
    <div class="row">
      <div class="col s2">
        <div class="input-field" style="margin-bottom:23px;">
          <select ref="select" v-model="filter">
            <option value="" disabled selected>Все записи</option>
            <option value="first coach">Первый коуч</option>
            <option value="second coach">Второй коуч</option>
            <option value="third coach">Третий коуч</option>
          </select>
        </div>
      </div>
      <div class="col s2">
        <button
          v-if="filter"
          class="btn waves-effect waves-light purple"
          style="width:100%;font-size:16px;margin-top:10%;"
          @click="filter = null"
        >
          Очистить фильтр
          <i class="material-icons right">cached</i>
        </button>
      </div>
    </div>

    <section>
      <historyTable v-if="displayTasks" :displayTasks="displayTasks" />
      <h3 v-else class="center">
        Нет записей.
        <router-link to="/record">Создайте первую</router-link>
      </h3>
    </section>
  </div>
</template>
<script>
import historyTable from "@/components/vue-history-table.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      filter: null,
      search: "",
    };
  },
  components: {
    historyTable,
  },
  computed: {
    ...mapGetters(["allClientsLength", "allClients"]),
    displayTasks() {
      return this.allClients.filter((t) => {
        if (!this.filter) {
          return true;
        }
        return t.coach === this.filter;
      });
    },
  },
  mounted() {
    window.M.FormSelect.init(this.$refs.select);
  },
};
</script>
