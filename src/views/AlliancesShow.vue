<script>
import axios from "axios";
import { useUserStore } from "@/stores/user";
import SubmitModal from "@/components/SubmitModal.vue";
import UserCards from "@/components/UserCards.vue";
import AllianceEditModal from "@/components/AllianceEditModal.vue";

export default {
  components: { SubmitModal, UserCards, AllianceEditModal },
  data: function () {
    return {
      store: useUserStore(),
      alliance: {},
      newAllianceParams: {},
      userAlliance: null,
    };
  },
  created: function () {
    this.showAlliance();
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
    kickUser: function (username) {
      axios.delete(`/alliances/${this.alliance.name}/kick/${username}`).then(() => {
        window.location.reload();
      });
    },
    showAlliance: function () {
      axios.get(`/alliances/${this.$route.params.name}.json`).then((response) => {
        this.alliance = response.data;
        this.newAllianceParams = response.data;
      });
    },
    joinAlliance: function () {
      axios.post(`/alliances/${this.alliance.name}/join`).then(() => {
        window.location.reload();
      });
    },
    leaveAlliance: function () {
      axios.delete(`/alliances/${this.alliance.name}/leave`).then(() => {
        window.location.reload();
      });
    },
    deleteAlliance: function () {
      axios.delete(`/alliances/${this.alliance.name}`).then(() => {
        this.$router.push("/alliances");
      });
    },
    updateAlliance: function (params) {
      axios.patch(`/alliances/${this.alliance.id}.json`, params).then(() => {
        this.$router.push("/alliances");
      });
    }
  },
};
</script>

<template>
  <!-- General Alliance Information -->
  <div>
    <img v-bind:src="alliance.icon">
    <br />
    <h2>{{ alliance.name }}</h2>
    <p> {{ alliance.description }}</p>

    <p>MEMBER COUNT: {{ alliance.members }}</p>
    <p>ALLIANCE LEADER: {{ alliance.leader }}</p>
  </div>

  <br />

  <!-- Allow User to Join Alliance -->
  <div v-if="userAlliance === null && store.getLoggedIn === true">
    <button class="btn btn-primary" @click="joinAlliance()">Join Alliance</button>
  </div>

  <!-- Allow User to Leave Alliance -->
  <div v-if="userAlliance === alliance.id && store.getLoggedIn === true && store.getUserUsername != alliance.leader">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#leaveAlliance">Leave
      Alliance</button>

    <SubmitModal type="leaveAlliance" title="Leaving Alliance Confirmation" submit="Leave Alliance"
      @submit-function="leaveAlliance()">
      <div class="modal-body">
        <div>
          <label>Are You Sure You Want To Leave {{ alliance.name }}?</label>
        </div>
      </div>
    </SubmitModal>
  </div>

  <!-- Disband Alliance if it is Empty -->
  <div
    v-if="userAlliance === alliance.id && store.getLoggedIn === true && store.getUserUsername === alliance.leader && alliance.members < 2">

    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteAlliance">Disband
      Alliance</button>

    <SubmitModal type="deleteAlliance" title="Disband Alliance Confirmation" submit="Disband Alliance"
      @submit-function="deleteAlliance()">
      <div class="modal-body">
        <div>
          <label>Are You Sure You Want To Disband {{ alliance.name }}?</label>
          <label>WARNING: THIS ACTION CANNOT BE UNDONE</label>
        </div>
      </div>
    </SubmitModal>

  </div>

  <!-- Transfer Ownership to Another User -->
  <div
    v-if="userAlliance === alliance.id && store.getLoggedIn === true && store.getUserUsername === alliance.leader && alliance.members > 1">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#transferOwnershipModal">
      Transfer Ownership
    </button>
  </div>

  <SubmitModal type="transferOwnershipModal" title="Transfer Ownership" submit="Submit"
    @submit-function="updateAlliance(newAllianceParams)">
    <div>
      <label>Choose User to Transfer Ownership To: </label>
      <select v-model="newAllianceParams.username">
        <option disabled value="">Select a User</option>
        <option v-for="user in alliance.users" :value="user.username" v-bind:key="user.username">
          {{ user.username }}
        </option>
      </select>
    </div>
  </SubmitModal>

  <!-- Log In to Join Alliance -->
  <div v-if="store.getLoggedIn === false">
    Please Log In To Join An Alliance!
  </div>

  <!-- Edit Current Alliance Settings -->
  <div v-if="userAlliance === alliance.id && store.getLoggedIn === true && store.getUserUsername === alliance.leader">
    <br />
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editAllianceModal">
      Edit Alliance Settings
    </button>
    <AllianceEditModal type="editAllianceModal" title="Edit Alliance" submit="Submit Changes"
      :prevParams="newAllianceParams" @submit-function="updateAlliance($event)" @change-icon="pickIcon($event)" />
  </div>

  <!-- Display Current Users in Alliance & Kick If Owner -->
  <UserCards @kick-user="kickUser($event)" :allianceUserList="alliance.users" :alliOwner="alliance.leader"
    :userUsername="store.getUserUsername" />

</template>

<style>
</style>