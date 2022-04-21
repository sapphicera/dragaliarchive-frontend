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
  {{ user.username }}
  {{ user.email }}
  <br /> <br />
  this is the information: {{ this.$route.params }}
  <br />
</template>

<style>
</style>