<script>
export default {
  name: "ComicCard",
  props: ["comicInfo", "comicLanguage"],
  data: function () {
    return {
      language: "",
    };
  },
  mounted: function () {
    this.language = this.comicLanguage + "Name";
  },
  methods: {
    loadImage() {
      return require(`../assets/comics/thumb/${this.comicInfo.number}.png`);
    }
  }
}
</script>

<template>
  <div class="card rounded-0">
    <div class="comicNumber bg-dark text-white">
      # {{ comicInfo.number }}
    </div>
    <img :src="loadImage()" class="card-img rounded-0" v-bind:alt="comicInfo[language]">
    <div class="cardText py-1 px-2 bg-dark text-white">
      <h5 class="card-title my-0 text-truncate">
        <router-link v-bind:to="`/comics/${this.comicLanguage}/${comicInfo.id}`" v-bind:title="comicInfo[language]">
          {{ comicInfo[language] }}
        </router-link>
      </h5>
    </div>
  </div>
</template>

<style scoped>
img {
  max-width: 100%;
  max-height: 100%;
}

.comicNumber {
  font-weight: bold;
  top: -5%;
  left: -5%;
  position: absolute;
  padding: 0 .3rem 0 .3rem;
}

.cardText {
  text-align: center;
  vertical-align: middle;
}

.container a {
  text-decoration: none;
  color: white;
  transition: color 0.3s linear;
  -webkit-transition: color 0.3s linear;
  -moz-transition: color 0.3s linear;
}

.container a:hover {
  color: #FF0000;
}
</style>