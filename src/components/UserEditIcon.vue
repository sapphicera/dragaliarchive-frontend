
<script>
export default {
  name: "AllianceEditModal",
  props: ['type', 'title', 'submit'],
  emits: ['save-data'],
  data: function () {
    return {
      images: [],
      icon: "",
    };
  },
  mounted: function () {
    this.importAll(require.context("../assets/character-icons/", true, /\.png$/));
  },
  methods: {
    importAll: function (r) {
      r.keys().forEach(key => (this.images.push({ pathLong: r(key), pathShort: key })));
    },
    selectIcon: function (img) {
      this.icon = img;
      // this.$emit('change-icon', icon);
    },
    submitIcon: function (img) {
      this.$emit('save-data', img)
    }
  }
}
</script>

<template>
  <div class="modal fade" :id="type" tabindex="-1" aria-labelledby="submitModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <form v-on:submit.prevent="submitIcon(icon)">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="submitModalLabel">{{ title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <div>
              <div class="container">
                <div class="iconSelection">
                  <div class="row row-cols-auto gx-1 gy-1 justify-content-center">
                    <div v-for="icon in images" v-bind:key="icon" class="col">
                      <input type="radio" class="btn-check" name="options" :id="icon.pathLong">
                      <label class="btn btn-outline-secondary" :for="icon.pathLong" @click="selectIcon(icon.pathLong)">
                        <img :src="icon.pathLong" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" value="Submit" class="btn btn-primary" data-bs-dismiss="modal">{{ submit }}</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.iconSelection img {
  height: 100px;
  width: 100px;
}
</style>