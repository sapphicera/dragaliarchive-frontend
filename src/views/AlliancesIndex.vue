<script>
import axios from "axios";

export default {
  data: function () {
    return {
      alliances: [],
      searchTerm: "",
    };
  },
  created: function () {
    this.indexAlliances();
  },
  methods: {
    indexAlliances: function () {
      axios.get("http://localhost:3000/alliances.json").then((response) => {
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

  <div class="row">
    <p><input type="text" v-model="searchTerm"></p>
    <div class="col-sm-4 py-md-2" v-for="alliance in filterAlliances()" v-bind:key="alliance.id">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">{{ alliance.name }}</h5>
          <h6>by {{ alliance.id }}</h6>
          <img v-bind:src="alliance.icon" />
          <div class="cut-text">
            {{ alliance.description }}
          </div>
        </div>
        <div class="card-footer">
          <router-link :to="{
            name: 'alliances-show', params: { name: alliance.name, id: alliance.id }
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