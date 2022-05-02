<script>
import axios from "axios";

export default {
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
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createAllianceModal">
      Create New Alliance
    </button>
    <br /> <br />
  </div>

  <div class="modal fade" id="createAllianceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <form v-on:submit.prevent="createAlliance()">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create New Alliance</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

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

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" value="Submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div class="row">
    <p><input type="text" v-model="searchTerm"></p>
    <div class="col-sm-4 py-md-2" v-for="alliance in filterAlliances()" v-bind:key="alliance.id">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">{{ alliance.name }}</h5>
          <h6>by {{ alliance.leader }}</h6>
          <img v-bind:src="alliance.icon" />
          <div class="cut-text">
            {{ alliance.description }}
          </div>
        </div>
        <div class="card-footer">
          <router-link :to="{
            name: 'alliances-show', params: { name: alliance.name }
          }" class="btn btn-primary">Learn More</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
img {
  height: 100px;
  width: 100px;
}
</style>