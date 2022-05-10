<script>
import axios from "axios";
import { useUserStore } from "@/stores/user";
import AllianceCard from "@/components/AllianceCard.vue";
import AllianceCreateModal from "@/components/AllianceCreateModal.vue";

export default {
  components: {
    AllianceCard,
    AllianceCreateModal
  },
  data: function () {
    return {
      store: useUserStore(),
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
    if (this.store.getLoggedIn === true) {
      axios.get(`/users/${this.store.getUserUsername}.json`).then((response) => {
        this.userAlliance = response.data.alliance_id;
      })
    }
  },
  methods: {
    pickIcon: function (icon) {
      this.newAllianceParams.icon = icon;
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
    createAlliance: function (params) {
      axios.post("/alliances.json", params).then(() => {
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

  <div v-if="userAlliance === null && store.getLoggedIn === true">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createNewAlliance">Create New
      Alliance</button>
    <br /> <br />

    <AllianceCreateModal type="createNewAlliance" title="Create New Alliance" submit="Create"
      @submit-function="createAlliance($event)" @change-icon="pickIcon($event)" />
  </div>

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
</style>