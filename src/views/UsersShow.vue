<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
    };
  },
  created: function () {
    this.showUser();
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
  <p>Alliance ID: {{ user.alliance_id }}</p>
  <p>Level: {{ user.level }}</p>
  <p>Element: {{ user.element }}</p>
  <p>Weapon: {{ user.weapon }}</p>
  <p>Event: {{ user.event }}</p>
  <p>Fight: {{ user.fight }}</p>

  <p>
    <router-link v-bind:to="`/users/${user.username}/edit`">Edit Profile</router-link>
  </p>



  <!-- <div v-if="user.username == ">
    Hi
  </div> -->

  <!-- <router-link v-bind:to="`/users/${user.username}/edit`">Edit Profile</router-link> -->

</template>

<style>
img {
  width: 100px;
  height: 100px;
}
</style>