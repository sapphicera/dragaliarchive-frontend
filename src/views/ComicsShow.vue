<script>
import axios from "axios";

export default {
  data: function () {
    return {
      language: this.$route.params.language,
      comic: {},
    };
  },
  created: function () {
    this.getComicInfo(this.language);
  },
  computed: {
    currentComic() {
      return {
        ...this.comic,
        image: this.comic.number && require(`../assets/comics/${this.language}/${this.comic.number}.png`),
        number: this.comic.number
      }
    }
  },
  methods: {
    getComicInfo: function (language) {
      axios.get(`/comics/${language}/${this.$route.params.id}.json`).then((response) => {
        this.comic = response.data;
      });
    },
  },
};
</script>

<template>
  <p> {{ currentComic.number }}</p>
  <div class="container">
    <img :src="currentComic.image">
  </div>
</template>

<style>
</style>