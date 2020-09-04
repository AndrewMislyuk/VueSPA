<template>
  <div>
    <div class="page-title">
      <h3>Добавление клиента</h3>
    </div>

    <form @submit.prevent="submitForm">
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
            class="btn waves-effect waves-light green"
            style="width:25%;font-size:16px;"
            type="submit"
          >
            Создать
            <i class="material-icons right">keyboard_arrow_right</i>
          </button>
        </div>

        <div class="col s5">
          <div class="chips" ref="messenger" style="margin-bottom:23px;"></div>
          <div class="input-field" style="margin-bottom:23px;">
            <select ref="select" v-model="program">
              <option value="" disabled selected>Программа</option>
              <option value="first program">Первая</option>
              <option value="second program">Вторая</option>
              <option value="third program">Третья</option>
            </select>
          </div>
          <div class="input-field" style="margin-bottom:23px;">
            <select ref="couch" v-model="coach">
              <option value="" disabled selected>Психолог/Коуч</option>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      surname: "",
      description: "",
      date: null,
      messenger: "",
      telephone: "",
      email: "",
      program: "",
      coach: "",
      price: 0,
    };
  },
  mounted() {
    this.messenger = window.M.Chips.init(this.$refs.messenger, {
      placeholder: "Мессенджеры",
    });
    this.date = window.M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(),
      setDefaultDate: true,
    });
    window.M.FormSelect.init(this.$refs.select);
    window.M.FormSelect.init(this.$refs.couch);
    window.M.updateTextFields();
  },
  methods: {
    async submitForm() {
      const clients = {
        name: this.name,
        surname: this.surname,
        date: String(this.date.date),
        telephone: this.telephone,
        email: this.email,
        messenger: this.messenger.chipsData,
        program: this.program,
        coach: this.coach,
        price: this.price,
        description: this.description,
      };
      try {
        await this.$store.dispatch("addClient", clients);
        this.$router.push("/");
      } catch (e) {
        console.log("Error");
      }
    },
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }
    if (this.messenger && this.messenger.destroy) {
      this.messenger.destroy();
    }
  },
};
</script>
