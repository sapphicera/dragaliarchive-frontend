<script>
import axios from "axios";

export default {
  data: function () {
    return {
      alliance: {},
      isLoggedIn: false,
      getUserUsername: "",
      userAlliance: null,
    };
  },
  created: function () {
    this.showAlliance();
  },
  mounted: function () {
    if (localStorage.jwt !== null) {
      this.getUserUsername = localStorage.user_username;
      this.isLoggedIn = !!localStorage.jwt;
    }
    axios.get(`/users/${this.getUserUsername}.json`).then((response) => {
      this.userAlliance = response.data.alliance_id;
    })
  },
  methods: {
    showAlliance: function () {
      axios.get(`/alliances/${this.$route.params.name}.json`).then((response) => {
        this.alliance = response.data;
      })
    },
    joinAlliance: function () {
      axios.post(`/alliances/${this.alliance.name}/join`)
      window.location.reload();
    },
    leaveAlliance: function () {
      axios.delete(`/alliances/${this.alliance.name}/leave`)
      window.location.reload();
    },
  },
};
</script>

<template>
  <img v-bind:src="alliance.icon">
  <br />
  <h2>{{ alliance.name }}</h2>
  <p> {{ alliance.description }}</p>

  <p>MEMBER COUNT: {{ alliance.members }}</p>

  <div v-for="user in alliance.users" v-bind:key="user.username">
    {{ user.id }}. {{ user.username }}
  </div>

  <div v-if="userAlliance === null && isLoggedIn === true">
    <button class="btn btn-primary" @click="joinAlliance()">Join Alliance</button>
  </div>

  <div v-if="userAlliance != null && isLoggedIn === true">
    <button class="btn btn-primary" @click="leaveAlliance()">Leave Alliance</button>
  </div>

  <div v-if="isLoggedIn === false">
    Please Log In To Join An Alliance!
  </div>

</template>

<style>
</style>