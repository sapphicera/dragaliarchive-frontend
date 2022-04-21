<script>
import axios from "axios";

export default {
  data: function () {
    return {
      alliance: {},
      lookupName: this.$route.params.name.split(" % 20")
    };
  },
  created: function () {
    this.showAlliance();
  },
  methods: {
    showAlliance: function () {
      axios.get(`http://localhost:3000/alliances/${this.$route.params.name}.json`).then((response) => {
        console.log(response.data);
        this.alliance = response.data;
      })
    }
  },
};
</script>

<template>
  {{ alliance.name }}
  <br /> <br />
  this is the information: {{ this.$route.params }}
  <br />
  {{ alliance.description }}
  fdsfsfsdsfdsfdsfdsfsdfsdfssfdsfsdfssdfddfs
</template>

<style>
</style>