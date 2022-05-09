<script>
export default {
  name: "SubmitModal",
  props: ['type', 'title', 'submit', 'newName', 'newDescription', 'newIcon'],
  emits: ['submit-function', 'change-icon'],

  data: function () {
    return {
      images: [],
      newAllianceParams: {},
    };
  },
  mounted: function () {
    this.importAll(require.context('../assets/alliance-icons/', true, /\.png$/));
  },
  methods: {
    importAll: function (r) {
      r.keys().forEach(key => (this.images.push({ pathLong: r(key), pathShort: key })));
    },
    selectIcon: function (icon) {
      this.newAllianceParams.icon = icon;
      this.$emit('change-icon', icon);
    },
  }
}
</script>

<template>
  <div class="modal fade" :id="type" tabindex="-1" aria-labelledby="submitModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <form v-on:submit.prevent="$emit('submit-function')">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="submitModalLabel">{{ title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">

            <div class="row g-2">
              <div class="col">
                <label class="col-form-label">Alliance Name: </label>
              </div>
              <div class="col-9">
                <input type="text" :v-model="newName" class="form-control">
              </div>
            </div>

            <br />

            <div class="mb-3">
              <label class="form-label">Short Description</label>
              <textarea type="text" :v-model="newDescription" class="form-control" rows="3"></textarea>
            </div>

            <label>Select an Alliance Icon:</label><br /><br />
            <div class="container">
              <div class="selectalli">
                <div class="row row-cols-auto gx-1 gy-1 justify-content-center">

                  <div v-for="icon in images" v-bind:key="icon" class="col">
                    <input type="radio" class="btn-check" name="options" :id="icon.pathLong" autocomplete="off">
                    <label class="btn btn-outline-secondary" :for="icon.pathLong" @click="selectIcon(icon.pathLong)">
                      <img :src="icon.pathLong" />
                    </label>
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
.selectalli img {
  height: 50px;
  width: 50px;
}
</style>