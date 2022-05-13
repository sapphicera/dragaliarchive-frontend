<script>
import axios from "axios";
import ComicCards from "@/components/ComicCards.vue";
import ComicPagination from "@/components/ComicPagination.vue";

export default {
  components: { ComicCards, ComicPagination },
  data: function () {
    return {
      comics: [],
      comicLanguage: this.$route.params.language,
      currentPage: 0,
      pageSize: 4,
      visibleComics: []
    };
  },
  created: function () {
    this.getComicInfo();
  },
  methods: {
    getComicInfo: function () {
      axios.get(`/comics/${this.comicLanguage}.json`).then((response) => {
        this.comics = response.data;
      }).then(() => {
        this.updateVisibleComics();
      })
    },
    updateVisibleComics: function () {
      this.visibleComics = this.comics.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
      if (this.visibleComics.length === 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1);
      }
    },
    updatePage: function (pageNumber) {
      this.currentPage = pageNumber;
      this.updateVisibleComics();
    },
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

  <ComicCards :comicList="visibleComics" :currentPage="currentPage" v-if="comicLanguage"
    :comicLanguage="comicLanguage" />

  <ComicPagination :allComics="comics" :currentPage="currentPage" :pageSize="pageSize"
    @page-update="updatePage($event)" />

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