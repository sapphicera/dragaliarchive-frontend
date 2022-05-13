  <script>
export default {
  name: "ComicPagination",
  props: ["allComics", "currentPage", "pageSize"],
  emits: ["page-update"],

  methods: {
    updatePage(pageNumber) {
      this.$emit("page-update", pageNumber);
    },
    totalPages() {
      return Math.ceil(this.allComics.length / this.pageSize);
    },
    showPreviousLink() {
      return this.currentPage === 0 ? false : true;
    },
    showNextLink() {
      return this.currentPage === (this.totalPages() - 1) ? false : true
    }
  }
}
</script>

<template>
  <div v-if="totalPages() > 0" class="pagination-wrapper">
    <span v-if="showPreviousLink()" class="page-item" @click="updatePage(currentPage - 1)">back</span>
    <span v-if="showNextLink()" class="page-item" @click="updatePage(currentPage + 1)">forward</span>
  </div>

  <!-- <nav aria-label="Page navigation example">
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
  </nav> -->

</template>

<style scoped>
</style>