<template>
  <div class="row">
    <div class="page-title">
      <h3>Редактирование клиента</h3>
    </div>
    <form @submit.prevent="updateForm" v-show="client">
      <div class="row">
        <div class="col s5">
          <div class="input-field">
            <input
              v-model="name"
              id="name"
              type="text"
              class="validate"
              required
            />
            <label for="name">Имя</label>
          </div>
          <div class="input-field">
            <input
              v-model="surname"
              id="surname"
              type="text"
              class="validate"
              required
            />
            <label for="surname">Фамилия</label>
          </div>
          <div class="input-field">
            <input id="data" type="text" ref="datepicker" />
            <label for="data">Дата</label>
          </div>
          <div class="input-field">
            <input
              v-model="telephone"
              id="telephone"
              type="text"
              class="validate"
              required
            />
            <label for="telephone">Телефон</label>
          </div>
          <div class="input-field">
            <input
              v-model="email"
              id="email"
              type="email"
              class="validate"
              required
            />
            <label for="email">E-mail</label>
          </div>
          <button
            class="btn waves-effect waves-light blue"
            style="width:25%;font-size:16px;"
            type="submit"
          >
            Изменить
            <i class="material-icons right">cached</i>
          </button>
          <button
            class="btn waves-effect waves-light red"
            style="width:25%;font-size:16px;margin-left:20px;"
            type="button"
            @click="removeClient"
          >
            Удалить
            <i class="material-icons right">delete_forever</i>
          </button>
        </div>

        <div class="col s5">
          <div class="chips" ref="messenger" style="margin-bottom:23px;"></div>
          <div class="input-field" style="margin-bottom:23px;">
            <select ref="select" v-model="program">
              <option value="" disabled>Программа</option>
              <option value="first program">Первая</option>
              <option value="second program">Вторая</option>
              <option value="third program">Третья</option>
            </select>
          </div>
          <div class="input-field" style="margin-bottom:23px;">
            <select ref="couch" v-model="coach">
              <option value="" disabled>Психолог/Коуч</option>
              <option value="first coach">Первый</option>
              <option value="second coach">Второй</option>
              <option value="third coach">Третий</option>
            </select>
          </div>
          <div class="input-field">
            <input id="amount" type="number" v-model.number="price" />
            <label for="amount">Сумма оплаты</label>
          </div>
          <div class="input-field">
            <textarea
              v-model="description"
              id="description"
              class="materialize-textarea"
            ></textarea>
            <label for="description">Описание</label>
            <span
              class="character-counter"
              style="float: right; font-size: 12px;"
              >{{ description.length }}/150</span
            >
          </div>
        </div>
      </div>
    </form>
    <h4 v-if="!client" class="blue-text">Загрузка данных...</h4>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      surname: "",
      description: "",
      date: null,
      messenger: null,
      telephone: "",
      email: "",
      price: 0,
      client: "",
      program: "",
      coach: "",
    };
  },
  computed: {
    ...mapGetters(["allClients"]),
  },
  async mounted() {
    const clients = this.allClients;
    const idRouter = await this.$route.params.id;
    this.client = await clients.find((c) => c.id === idRouter);
    if (this.client) {
      this.name = this.client.name;
      this.surname = this.client.surname;
      this.description = this.client.description;
      this.telephone = this.client.telephone;
      this.email = this.client.email;
      this.price = this.client.price;
      this.program = this.client.program;
      this.coach = this.client.coach;
      try {
        this.messenger = await window.M.Chips.init(this.$refs.messenger, {
          placeholder: "Мессенджеры",
          data: this.client.messenger,
        });
      } catch {
        this.messenger = window.M.Chips.init(this.$refs.messenger, {
          placeholder: "Мессенджеры",
        });
      }
      window.M.FormSelect.init(this.$refs.select);
      window.M.FormSelect.init(this.$refs.couch);
      this.date = await window.M.Datepicker.init(this.$refs.datepicker, {
        format: "dd.mm.yyyy",
        defaultDate: new Date(this.client.date),
        setDefaultDate: true,
      });
      setTimeout(() => {
        window.M.updateTextFields();
      }, 0);
    } else {
      this.$router.push("/notFoundClient");
    }
  },
  methods: {
    ...mapActions(["fetchClients", "updateClient", "removeClient"]),
    async updateForm() {
      const routerId = await this.$route.params.id;
      const clients = {
        name: this.name,
        surname: this.surname,
        date: this.date.date,
        telephone: this.telephone,
        email: this.email,
        messenger: this.messenger.chipsData,
        program: this.program,
        coach: this.coach,
        price: this.price,
        description: this.description,
      };
      try {
        await this.$store.dispatch("updateClient", { clients, routerId });
        this.$router.push("/");
      } catch (e) {
        console.log("Error: " + e);
      }
    },
    async removeClient() {
      try {
        const routerId = await this.$route.params.id;
        await this.$store.dispatch("removeClient", routerId);
        this.$router.push("/");
      } catch (e) {
        console.log("Error: " + e);
      }
    },
  },
};
</script>
