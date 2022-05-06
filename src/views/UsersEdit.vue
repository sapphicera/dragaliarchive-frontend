<script>
import axios from "axios";

export default {
  data: function () {
    return {
      editProfileParams: {},
      errors: [],
      images: [],
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.username}.json`).then((response) => {
      this.editProfileParams = response.data;
      delete this.editProfileParams['alliance']
      delete this.editProfileParams['alliance_id']
    })
  },
  mounted: function () {
    this.importAll(require.context('../assets/character-icons/', true, /\.png$/));
  },
  methods: {
    importAll: function (r) {
      r.keys().forEach(key => (this.images.push({ pathLong: r(key), pathShort: key })));
    },
    editProfile: function () {
      console.log("editing...");
      axios.patch(`/users/${this.$route.params.username}.json`, this.editProfileParams).then((response) => {
        console.log(response.data);
        this.$router.push(`/users/${this.$route.params.username}`);
      }).catch((error) => {
        this.errors = error.response.data.errors;
      });
    },
    pickIcon: function (icon) {
      this.editProfileParams.icon = icon;
    },
  },
};
</script>

<template>
  {{ editProfileParams }}

  <form v-on:submit.prevent="editProfile()">
    <h1>Edit Profile Information</h1>

    <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>

    <div>
      <label>In-Game Name:</label>
      <input type="text" v-model="editProfileParams.ign" />
    </div>
    <div>
      <label>Game ID:</label>
      <input type="text" v-model="editProfileParams.gameid" />
    </div>
    <div>
      <label>Level:</label>
      <input type="text" v-model="editProfileParams.level" />
    </div>
    <div>
      <label>Weapon:</label>
      <input type="text" v-model="editProfileParams.weapon" />
    </div>
    <div>
      <label>Element:</label>
      <input type="text" v-model="editProfileParams.element" />
    </div>
    <div>
      <label>Event:</label>
      <input type="text" v-model="editProfileParams.event" />
    </div>
    <div>
      <label>Fight:</label>
      <input type="text" v-model="editProfileParams.fight" />
    </div>
    <div>
      <label>Description:</label>
      <input type="text" v-model="editProfileParams.description" />
    </div>

    <br />
    <div>
      <label>Choose an Icon</label>
      <br />
      <div class="container">
        <div class="selectalli">
          <div class="row row-cols-auto gx-1 gy-1 justify-content-center">
            <div v-for="icon in images" v-bind:key="icon" class="col">
              <input type="radio" class="btn-check" name="options" :id="icon.pathLong" autocomplete="off">
              <label class="btn btn-outline-secondary" :for="icon.pathLong" @click="pickIcon(icon.pathLong)">
                <img :src="icon.pathLong" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <input type="submit" value="Submit" />
  </form>
</template>

<style>
.selectalli img {
  height: 100px;
  width: 100px;
}
</style>