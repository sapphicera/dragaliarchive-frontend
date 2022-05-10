import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    getLoggedIn: false,
    getUserId: 0,
    getUserUsername: "",
  }),
  actions: {
  },
  getters: {
  },
});