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
      userID: 0,
      roleID: 0, // 0=not loggedIn, 1=admin, 3=agency
    },
    reservation: {
      cruiseID:   0,
      timeStart:  null,
      timeEnd:    null,
      price:      0,
      disPrice:   0,
      disPerct:   0
    },
  },
  mutations: {

  },
  actions: {

  }
});
