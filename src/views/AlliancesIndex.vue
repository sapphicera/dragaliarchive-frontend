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
      newAllianceParams: {},
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
  },
  methods: {
    indexAlliances: function () {
      axios.get("/alliances.json").then((response) => {
        console.log(response.data);
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
      axios.post("/alliances.json", this.newAllianceParams).then((response) => {
        console.log(response.data);
        window.location.reload();
      })
    },
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
      <div>
        <label>Name:</label>
        <input type="text" v-model="newAllianceParams.name" />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" v-model="newAllianceParams.description" />
      </div>
    </div>
  </SubmitModal>

  <div class="row">
    <p><input type="text" v-model="searchTerm"></p>
    <div class="col-sm-4 py-md-2" v-for="alliance in filterAlliances()" v-bind:key="alliance.id">
      <AllianceCard :name="alliance.name" :leader="alliance.leader" :icon="alliance.icon"
        :description="alliance.description" />
    </div>
  </div>
</template>

<style>
img {
  height: 100px;
  width: 100px;
}
</style>