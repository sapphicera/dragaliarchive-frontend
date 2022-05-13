import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    getLoggedIn: !!localStorage.jwt,
    getUserId: localStorage.user_id,
    getUserUsername: localStorage.user_username,
  }),
  actions: {
  },
  getters: {
  },
});