<script>
import axios from "axios";

export default {
  data: function () {
    return {
      alliance: {},
      isLoggedIn: false,
      getUserUsername: "",
      getUserAlliance: 0,
      editUserParams: {},
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
        this.alliance = response.data;
      })
    },
    joinAlliance: function () {
      axios.post(`/alliances/${this.alliance.name}/join`).then((response) => {
        console.log(response.data);
        localStorage.user_alliance = this.alliance.id;
        // localStorage.user_alliance = response.data.id;
      }).then(() => {
        window.location.reload();
      }).catch((error) => {
        console.log(error.message);
      });
    },
    leaveAlliance: function () {
      axios.delete(`/alliances/${this.alliance.name}/leave`).then(() => {
        localStorage.user_alliance = null;
      }).then(() => {
        window.location.reload();
      }).catch((error) => {
        console.log(error.message);
      });
    },
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

  <div v-if="getUserAlliance != 'null' && isLoggedIn === true">
    <button class="btn btn-primary" @click="leaveAlliance()">Leave Alliance</button>
  </div>

  <div v-if="isLoggedIn === false">
    Please Log In To Join An Alliance!
  </div>

  <div v-for="user in alliance.users" v-bind:key="user.username">
    {{ user.id }}. {{ user.username }}
  </div>

</template>

<style>
</style>