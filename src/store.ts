import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface Reservation {
  start: string,
  end: string,
  type: number
}

export default new Vuex.Store({
  state: {
    user: {},
    reservation: {},
    reservations: [],
    cruiseSelected: 0,
  },
  mutations: {

  },
  actions: {

  }
});
