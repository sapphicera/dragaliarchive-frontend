<script>
export default {
  name: "ComicCard",
  props: ["comicList"],
  emits: [],

  data: function () {
    return {
      images: [],
    };
  },
  mounted: function () {
    this.importAllThumbs(require.context('../assets/comics/thumb/', true, /\.png$/));
  },
  methods: {
    importAllThumbs: function (r) {
      r.keys().forEach(key => (this.images.push({ pathLong: r(key), pathShort: key })));
    },
  }
}
</script>

<template>

  <div class="container"><br />
    <div class="row">
      <div class="col-sm-3 py-md-2" v-for="comic in comicList" v-bind:key="comic.number">
        <div class="card rounded-0">
          <div class="comicNumber bg-dark text-white">
            # {{ comic.number }}
          </div>
          <img v-bind:src="images[comic.id - 1].pathLong" class="card-img rounded-0" v-bind:alt="comic.enName">
          <div class="cardText py-1 px-2 bg-dark text-white">
            <h5 class="card-title my-0 text-truncate">
              <router-link v-bind:to="`/comics/${comic.id}`" v-bind:title="comic.enName">{{ comic.enName }}
              </router-link>
            </h5>
          </div>
        </div>

      </div>
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