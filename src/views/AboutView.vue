<script>
import axios from "axios";
import ComicCard from "@/components/ComicCard.vue";

export default {
  components: { ComicCard },
  data: function () {
    return {
      comics: [],
      // search: "",
    };
  },
  created: function () {
    this.getComicInfo();
  },
  methods: {
    getComicInfo: function () {
      console.log("getting comic info...");
      axios.get("/comics.json").then((response) => {
        console.log(response.data);
        this.comics = response.data;
      })
    }
    // newSearch: function () {
    //   console.log("new search...");
    //   axios.get(`/users.json?search_term=${this.search}`).then(response => {
    //     console.log(response.data);
    //     this.users = response.data;
    //   });
    // }
  },
};
</script>

<template>
  <!-- Search: <input type="text" v-model="search">
  <button v-on:click="newSearch()">Search Comics</button>

  <div v-for="user in users" v-bind:key="user.username">
    {{ user.id }}: {{ user.username }}
  </div> -->

  <div class="container">
    <div id="featuredCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="5000">
          <img src="@/assets/comics/thumb/001.png" class="d-block" alt="...">
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <img src="@/assets/comics/thumb/002.png" class="d-block" alt="...">
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <img src="@/assets/comics/thumb/003.png" class="d-block" alt="...">
        </div>
      </div>
    </div>
  </div>

  <ComicCard :comicList="comics" />
</template>

<style>
.carousel .carousel-item {
  height: 24rem;
  width: 100%;
}

.carousel-item img {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>