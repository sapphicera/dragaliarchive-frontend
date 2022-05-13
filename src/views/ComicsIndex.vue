<script>
import axios from "axios";
import ComicCards from "@/components/ComicCards.vue";

export default {
  components: { ComicCards },
  data: function () {
    return {
      comics: [],
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
  },
};
</script>

<template>
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

  <ComicCards :comicList="comics" />

  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
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