<script>
export default {
  data: function () {
    return {
      stickers: [],
      language: "EN",
      length: 66,
    };
  },
  mounted: function () {
    this.importStickerData();
  },
  computed: {
    stickersLoaded: function () {
      return this.stickers.slice(0, this.length);
    },
  },
  methods: {
    importStickerData: function () {
      for (var i = 1; i <= 119; i++) {
        this.stickers.push({ audioId: i, imgId: i });
      }
    },
    getSticker: function (imgId, lang) {
      return require(`../assets/stickers/images/${lang}/${imgId}.png`);
    },
    getAudio: function (audioId, lang) {
      if (audioId > 116 && lang === 'EN') {
        return undefined;
      }
      return require(`../assets/stickers/audio/${lang}/vo_chr_stamp [${audioId}].wav`);
    },
    playAudio: function (audioId, lang) {
      let audio = this.getAudio(audioId, lang);
      console.log(audio);
      new Audio(audio).play();
    },
    currentLanguage: function (lang) {
      this.language = lang;
    },
    loadMoreStickers: function () {
      if (this.length > this.stickers.length) return;
      this.length = this.length + 66;
    }
  }
};
</script>

<template>
  <div class="container my-4">
    <button type="button" @click="currentLanguage('EN')" class="btn btn-success mx-1">EN</button>
    <button type="button" @click="currentLanguage('JP')" class="btn btn-danger mx-1">JP</button>
  </div>

  <div class="container">
    <div class="row">
      <div class="col col-md-auto px-0" v-for="sticker in stickersLoaded" :key="sticker">

        <img class="stickerButton" :src="getSticker(sticker.imgId, language)"
          @click="playAudio(sticker.audioId, language)">

      </div>
    </div>
  </div>

  <button @click="loadMoreStickers" v-if="stickers.length > length" type="button"
    class="btn btn-primary btn-lg my-2">Load More</button>
</template>

<style>
img.stickerButton {
  height: 7rem;
  width: 7rem;
  cursor: pointer;
}
</style>