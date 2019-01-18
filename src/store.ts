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
    user: {
      userID: 2,
      roleID: 3, // 0=not loggedIn, 1=admin, 3=agency
    },
    reservation: {},
    reservations: [],
    cruiseSelected: 0,

  },
  mutations: {

  },
  actions: {

  }
});
