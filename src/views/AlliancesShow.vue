<script>
import axios from "axios";

export default {
  data: function () {
    return {
      alliance: {},
      alli_users: {},
      isLoggedIn: false,
      getUserUsername: "",
      getUserAlliance: 0,
    };
  },
  created: function () {
    this.showAlliance();
  },
  mounted: function () {
    if (localStorage.user_username && localStorage.user_alliance && !!localStorage.jwt) {
      this.getUserUsername = localStorage.user_username;
      this.getUserAlliance = localStorage.user_alliance;
      this.isLoggedIn = !!localStorage.jwt;
    }
  },
  methods: {
    showAlliance: function () {
      axios.get(`/alliances/${this.$route.params.name}.json`).then((response) => {
        console.log(response.data);
        this.alliance = response.data;
        this.alli_users = response.data.users;
      })
    },
    joinAlliance: function () {
      window.location.reload();
    }
  },
};
</script>

<template>
  <img v-bind:src="alliance.icon">
  <br />
  <h2>{{ alliance.name }}</h2>
  <p> {{ alliance.description }}</p>

  <div v-if="getUserAlliance === 'null'">
    <button class="btn btn-primary" @click="joinAlliance()">Join Alliance</button>
  </div>

  <div v-if="isLoggedIn === false">
    Please Log In To Join An Alliance!
  </div>

  <!-- <router-link :to="{
    name: 'alliances-show', params: { name: alliance.name }
  }" class="btn btn-primary">Join Alliance</router-link> -->

  <div v-for="user in alliance.users" v-bind:key="user.username">
    {{ user.id }}. {{ user.username }}
  </div>
</template>

<style>
</style>