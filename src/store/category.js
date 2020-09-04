import firebase from "firebase/app";

export default {
  state: {
    clients: [],
  },
  mutations: {
    fetchClients(state, clients) {
      state.clients = clients;
    },
    addClient(state, result) {
      state.clients.push(result);
    },
  },
  actions: {
    async addClient({ commit }, clients) {
      try {
        const client = await firebase
          .database()
          .ref("clients")
          .push(clients);
        const result = { ...clients, id: client.key };
        commit("addClient", result);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async removeClient({ commit }, routerId) {
      try {
        await firebase
          .database()
          .ref(`clients`)
          .child(routerId)
          .remove();
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateClient({ commit }, { clients, routerId }) {
      try {
        await firebase
          .database()
          .ref(`clients`)
          .child(routerId)
          .update(clients);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchClients({ commit }) {
      try {
        const records =
          (
            await firebase
              .database()
              .ref(`clients`)
              .once("value")
          ).val() || {};
        const clients = Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
        commit("fetchClients", clients);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
  getters: {
    allClients(state) {
      return state.clients;
    },
    allClientsLength(state) {
      return state.clients.length;
    },
  },
};
