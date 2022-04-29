<script>
import axios from "axios";

export default {
  data: function () {
    return {
      users: [],
      search: "",
    };
  },
  methods: {
    newSearch: function () {
      console.log('new search...')
      axios.get(`/users.json?search_term=${this.search}`).then(response => {
        console.log(response.data)
        this.users = response.data;
      })
    }
  },
};
</script>

<template>
  Search: <input type="text" v-model="search">
  <button v-on:click="newSearch()">New Search</button>

  <div v-for="user in users" v-bind:key="user.username">
    {{ user.id }}: {{ user.username }}
  </div>

</template>

<style>
</style>