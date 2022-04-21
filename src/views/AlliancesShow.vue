<script>
import axios from "axios";

export default {
  data: function () {
    return {
      alliance: {},
      id: this.$route.params.id,
      lookupName: this.$route.params.name.split(" % 20")
      // id: 0
    };
  },
  // mounted() {
  //   console.warn("route", this.$route.params.name);
  //   this.id = this.$route.params.id;
  // },
  created: function () {
    this.showAlliance();
  },
  methods: {
    showAlliance: function () {
      axios.get(`http://localhost:3000/alliances/${this.id}.json`).then((response) => {
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