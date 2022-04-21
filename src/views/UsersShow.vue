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
  <br />
  {{ user.username }}
  <br />
  {{ user.email }}
  <!-- <br /> <br />
  this is the information: {{ this.$route.params }}
  <br /> -->
</template>

<style>
img {
  width: 100px;
  height: 100px;
}
</style>