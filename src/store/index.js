import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let list = "";
try {
  if (localStorage.getItem("list")) {
    list =  JSON.parse(localStorage.getItem("list"));
  }
} catch (e) {
  list = "";
}


export default new Vuex.Store({
  state: {
    list
  },
  mutations: {
    setList(state, data) {
      state.list = data;
      localStorage.setItem("list", JSON.stringify(data));
    },
  },
  actions: {},
  modules: {}
});
