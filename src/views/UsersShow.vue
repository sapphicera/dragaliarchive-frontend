<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      getUserUsername: "",
    };
  },
  created: function () {
    this.showUser();
  },
  mounted: function () {
    if (localStorage.user_username && !!localStorage.jwt) {
      this.getUserUsername = localStorage.user_username;
    }
  },
  methods: {
    showUser: function () {
      axios.get(`http://localhost:3000/users/${this.$route.params.username}.json`).then((response) => {
        console.log(response.data);
        this.user = response.data;
      })
    }
  },
};
</script>

<template>
  <img v-bind:src="user.icon">
  <p>{{ user.username }}</p>
  <p>IGN: {{ user.ign }}</p>
  <p>Game ID: {{ user.gameid }}</p>
  <p v-if="user.alliance_id === null">Alliance: user is not in an alliance!</p>
  <p v-if="user.alliance_id != null">Alliance: {{ user.alliance.name }}</p>
  <p>Level: {{ user.level }}</p>
  <p>Element: {{ user.element }}</p>
  <p>Weapon: {{ user.weapon }}</p>
  <p>Event: {{ user.event }}</p>
  <p>Fight: {{ user.fight }}</p>

  <div v-if="user.alliance_id === null">
    User Is Eligable To Join An Alliance!
  </div>

  <div v-if="user.username === getUserUsername">
    <router-link v-bind:to="`/users/${user.username}/edit`">Edit Profile</router-link>
  </div>
</template>

<style>
img {
  width: 100px;
  height: 100px;
}
</style>