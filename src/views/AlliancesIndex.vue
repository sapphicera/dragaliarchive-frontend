<script>
import axios from "axios";
import AllianceCard from "@/components/AllianceCard.vue";
import SubmitModal from "@/components/SubmitModal.vue";

export default {
  components: {
    AllianceCard,
    SubmitModal
  },
  data: function () {
    return {
      isLoggedIn: false,
      userAlliance: null,
      alliances: [],
      searchTerm: "",
      newAllianceParams: { icon: "" },
      images: [],
    };
  },
  created: function () {
    this.indexAlliances();
  },
  mounted: function () {
    if (localStorage.jwt !== null) {
      this.getUserUsername = localStorage.user_username;
      this.isLoggedIn = !!localStorage.jwt;
    }
    axios.get(`/users/${this.getUserUsername}.json`).then((response) => {
      this.userAlliance = response.data.alliance_id;
    })
    this.importAll(require.context('../assets/alliance-icons/', true, /\.png$/));
  },
  methods: {
    importAll: function (r) {
      r.keys().forEach(key => (this.images.push({ pathLong: r(key), pathShort: key })));
    },
    indexAlliances: function () {
      axios.get("/alliances.json").then((response) => {
        this.alliances = response.data;
      })
    },
    filterAlliances: function () {
      return this.alliances.filter((alliance) => {
        var lowerTitle = alliance.name.toLowerCase();
        var lowerSearchTerm = this.searchTerm.toLowerCase();
        return lowerTitle.includes(lowerSearchTerm);
      })
    },
    createAlliance: function () {
      axios.post("/alliances.json", this.newAllianceParams).then(() => {
        window.location.reload();
      })
    },
    pickIcon: function (icon) {
      this.newAllianceParams.icon = icon;
    }
  },
};
</script>

<template>
  <div class="text-center">
    <br />
    <h1>ACTIVE ALLIANCES</h1>
    <br />
  </div>

  <div v-if="userAlliance === null && isLoggedIn === true">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createNewAlliance">Create New
      Alliance</button>
    <br /> <br />
  </div>

  <SubmitModal type="createNewAlliance" title="Create New Alliance" submit="Create" @submit-function="createAlliance()">
    <div class="modal-body">

      <div class="row g-2">
        <div class="col">
          <label class="col-form-label">Alliance Name: </label>
        </div>
        <div class="col-9">
          <input type="text" v-model="newAllianceParams.name" class="form-control">
        </div>
      </div>

      <br />

      <div class="mb-3">
        <label class="form-label">Short Description</label>
        <textarea type="text" v-model="newAllianceParams.description" class="form-control" rows="3"></textarea>
      </div>

      <label>Select an Alliance Icon:</label><br /><br />
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
  </SubmitModal>

  <div class="container">
    <div class="row">
      <p><input type="text" v-model="searchTerm"></p>
      <div class="col-sm-4 py-md-2" v-for="alliance in filterAlliances()" v-bind:key="alliance.id">
        <AllianceCard :name="alliance.name" :leader="alliance.leader" :icon="alliance.icon"
          :description="alliance.description" />
      </div>
    </div>
  </div>
</template>

<style>
img {
  height: 100px;
  width: 100px;
}

.selectalli img {
  height: 50px;
  width: 50px;
}
</style>