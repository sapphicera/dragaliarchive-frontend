<script>
import axios from "axios";
import UserDropdown from "@/components/UserDropdown.vue";

export default {
  components: { UserDropdown },
  data: function () {
    return {
      pageLoaded: false,
      user: [],
      editProfileParams: {},
      errors: [],
      images: [],
    };
  },
  created: function () {
    this.currentData();
  },
  mounted: function () {
    this.importAll(require.context("../assets/character-icons/", true, /\.png$/));
  },
  methods: {
    currentData: function () {
      axios.get(`/users/${this.$route.params.username}.json`).then((response) => {
        this.user = response.data;
        this.editProfileParams = response.data;
        console.log(this.editProfileParams);
        delete this.editProfileParams["alliance"];
        delete this.editProfileParams["alliance_id"];
        // console.log("response uploaded");
      }).then(() => {
        this.pageLoaded = true;
      })
    },
    importAll: function (r) {
      r.keys().forEach(key => (this.images.push({ pathLong: r(key), pathShort: key })));
    },
    pickIcon: function (icon) {
      this.editProfileParams.icon = icon;
    },
    saveData: function (data) {
      this.editProfileParams[data.name] = data.output;
    },
    editProfile: function () {
      axios.patch(`/users/${this.$route.params.username}.json`, this.editProfileParams).then((response) => {
        console.log(response.data);
        this.$router.push(`/users/${this.$route.params.username}`);
      }).catch((error) => {
        this.errors = error.response.data.errors;
      });
    },
  },
};
</script>

<template>
  <!-- {{ editProfileParams }} -->
  <!-- <br>
  {{ user }} -->

  <!-- <div>
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
  <br /> -->

  <form v-on:submit.prevent="editProfile()">
    <div class="container my-4">
      <div class="main-body">
        <div class="row gutters-sm">
          <div class="col-md-4 mb-3">

            <!-- top left column card -->
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img v-bind:src="user.icon" :alt="user.username" width="150">
                  <div class="mt-2">
                    <h4>{{ user.username }}</h4>
                    <p class="text-secondary mb-1">IGN: {{ user.ign }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- bottom left column card -->
            <div class="card mt-3">
              <ul class="list-group list-group-flush">

                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 class="mb-0">Alliance</h6>
                  <span v-if="user.alliance_id != null" class="text-secondary">
                    <router-link v-bind:to="`/alliances/${user.alliance.name}`">{{ user.alliance.name }}</router-link>
                  </span>
                  <span v-else class="text-secondary">no alliance found!</span>
                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <label for="gameid">
                    <h6 class="mb-0">Game ID</h6>
                  </label>
                  <span>
                    <input v-model="editProfileParams.gameid" type="text" class="form-control" id="gameid">
                  </span>
                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <label for="level">
                    <h6 class="mb-0">Level</h6>
                  </label>
                  <span>
                    <input v-model="editProfileParams.level" type="text" class="form-control" id="level">
                  </span>
                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <label for="ign">
                    <h6 class="mb-0">IGN</h6>
                  </label>
                  <span>
                    <input v-model="editProfileParams.ign" type="text" class="form-control" id="ign">
                  </span>
                </li>

                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <label for="element">
                    <h6 class="mb-0">Element</h6>
                  </label>
                  <span>
                    <select class="form-select" id="element" aria-label="select an element"
                      v-model="editProfileParams.element" style="min-width: 189px;">
                      <option value="Shadow">Shadow</option>
                      <option value="Light">Light</option>
                      <option value="Fire">Fire</option>
                      <option value="Water">Water</option>
                      <option value="Wind">Wind</option>
                    </select>
                  </span>
                </li>

              </ul>
            </div>
          </div>

          <!-- right top column card -->
          <div class="col-md-8">
            <div class="card mb-3">
              <div class="card-body">

                <span v-if="pageLoaded">
                  <UserDropdown title="Weapon Class" id="weapons" :current="editProfileParams" @save-data="saveData" />
                  <hr>
                  <UserDropdown title="Game Event" id="events" :current="editProfileParams" @save-data="saveData" />
                  <hr>
                  <UserDropdown title="Boss Fight" id="fights" :current="editProfileParams" @save-data="saveData" />
                  <hr>

                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Character</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {{ user.character }}
                    </div>
                  </div>
                </span>

              </div>
            </div>

            <!-- accordion section -->
            <div class="col">
              <div class="card-mb-3">
                <div class="card-body px-0">
                  <div class="row">
                    <div class="accordion" id="accordionExample">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                          <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            User Profile Description
                          </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample">
                          <div class="accordion-body">
                            {{ user.description }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <input type="submit" value="Submit" />
  </form>

</template>

<style>
/* .selectalli img {
  height: 100px;
  width: 100px;
} */

img {
  width: 100px;
  height: 100px;
}

body {
  color: #1a202c;
  /* background-color: #ecf5f1; */
}

.h-100 {
  height: 100% !important;
}

/* .col-sm-3 {
  display: flex;
  align-items: center;
  justify-content: center;
} */
</style>