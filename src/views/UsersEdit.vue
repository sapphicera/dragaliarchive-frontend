<script>
import axios from "axios";

export default {
  data: function () {
    return {
      editProfileParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.username}.json`).then((response) => {
      console.log(response.data);
      this.editProfileParams = response.data;
    })
  },
  methods: {
    editProfile: function () {
      console.log("editing...");
      axios.patch(`/users/${this.$route.params.username}.json`, this.editProfileParams).then((response) => {
        console.log(response.data);
        this.$router.push(`/users/${this.$route.params.username}`);
      }).catch((error) => {
        this.errors = error.response.data.errors;
      });
    }
  },
};
</script>

<template>
  {{ editProfileParams }}

  <form v-on:submit.prevent="editProfile()">
    <h1>Edit Profile Information</h1>

    <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>

    <div>
      <label>In-Game Name:</label>
      <input type="text" v-model="editProfileParams.ign" />
    </div>

    <input type="submit" value="Submit" />

  </form>
</template>

<style>
</style>