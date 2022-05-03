<script>
import axios from "axios";

export default {
  data: function () {
    return {
      alliance: {},
      newAllianceParams: {},
      isLoggedIn: false,
      getUserUsername: "",
      userAlliance: null,
    };
  },
  created: function () {
    this.showAlliance();
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
    showAlliance: function () {
      axios.get(`/alliances/${this.$route.params.name}.json`).then((response) => {
        this.alliance = response.data;
        this.newAllianceParams = response.data;
      })
    },
    joinAlliance: function () {
      axios.post(`/alliances/${this.alliance.name}/join`).then(() => {
        window.location.reload();
      })
    },
    leaveAlliance: function () {
      axios.delete(`/alliances/${this.alliance.name}/leave`).then(() => {
        window.location.reload();
      })
    },
    deleteAlliance: function () {
      axios.delete(`/alliances/${this.alliance.name}`).then(() => {
        this.$router.push("/alliances");
      })
    },
    updateAlliance: function () {
      console.log(this.newAllianceParams);
      axios.patch(`/alliances/${this.alliance.id}.json`, this.newAllianceParams).then(() => {
        window.location.reload();
      })
    }
  },
};
</script>

<template>
  <img v-bind:src="alliance.icon">
  <br />
  <h2>{{ alliance.name }}</h2>
  <p> {{ alliance.description }}</p>

  <p>MEMBER COUNT: {{ alliance.members }}</p>

  ALLIANCE LEADER: {{ alliance.leader }} <br /> <br />

  <div v-for="user in alliance.users" v-bind:key="user.username">
    {{ user.id }}. {{ user.username }}
  </div>

  <div v-if="userAlliance === null && isLoggedIn === true">
    <button class="btn btn-primary" @click="joinAlliance()">Join Alliance</button>
  </div>

  <div v-if="userAlliance === alliance.id && isLoggedIn === true && getUserUsername != alliance.leader">
    <button class="btn btn-primary" @click="leaveAlliance()">Leave Alliance</button>
  </div>

  <div
    v-if="userAlliance === alliance.id && isLoggedIn === true && getUserUsername === alliance.leader && alliance.members < 2">
    <button class="btn btn-primary" @click="deleteAlliance()">Disband Alliance</button>
  </div>

  <div
    v-if="userAlliance === alliance.id && isLoggedIn === true && getUserUsername === alliance.leader && alliance.members > 1">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#transferOwnershipModal">
      Transfer Ownership
    </button>
  </div>

  <div class="modal fade" id="transferOwnershipModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <form v-on:submit.prevent="updateAlliance()">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Transfer Ownership</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div>
              <label>Choose User to Transfer Ownership To: </label>

              <select v-model="newAllianceParams.username">
                <option disabled value="">Select a User</option>
                <option v-for="user in alliance.users" :value="user.username" v-bind:key="user.username">
                  {{ user.username }}
                </option>
              </select>

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

  <div v-if="isLoggedIn === false">
    Please Log In To Join An Alliance!
  </div>

</template>

<style>
</style>