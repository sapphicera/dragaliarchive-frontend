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
      return this.currentPage === (this.totalPages() - 1) ? false : true;
    }
  }
}
</script>

<template>
  <nav v-if="totalPages() > 0" aria-label="navigation">
    <ul class="pagination justify-content-center">

      <li class="page-item">
        <button class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>

      <li v-if="currentPage > 0" class="page-item">
        <button class="page-link" @click="updatePage(currentPage - 1)">{{ currentPage }}</button>
      </li>
      <li class="page-item active">
        <button class="page-link">{{ currentPage + 1 }}</button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="updatePage(currentPage + 1)">{{ currentPage + 2 }}</button>
      </li>

      <li class="page-item">
        <button class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>

    </ul>
  </nav>
</template>

<style scoped>
</style>