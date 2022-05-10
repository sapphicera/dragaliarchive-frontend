<script>
import SubmitModal from "./SubmitModal.vue";

export default {
  name: "UserCard",
  props: ["allianceUserList", "alliOwner", "userUsername"],
  emits: ['kick-user'],
  components: { SubmitModal },

  data: function () {
    return {
      cardUser: "",
    };
  },

  methods: {
    kickUser: function (username) {
      this.$emit('kick-user', username);
    },
    assignUser: function (user) {
      this.cardUser = user;
    }
  }
}
</script>

<template>
  <div class="container"><br />
    <div class="row">
      <div class="col-sm-4 py-md-2" v-for="user in allianceUserList" v-bind:key="user.username">

        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ user.username }}</h5>
            <img v-bind:src="user.icon" />
            <h6>ign {{ user.ign }}</h6>
            <h6>level {{ user.level }}</h6>
            <div class="cut-text">
              alliance user
            </div>
          </div>
          <div class="card-footer">
            <router-link :to="{
              name: 'users-profile', params: { username: user.username }
            }" class="btn btn-primary">View Profile</router-link>
            <span v-if="alliOwner === userUsername">
              <button @click="assignUser(user.username)" type="button" class="btn btn-danger" data-bs-toggle="modal"
                data-bs-target="#kickUser">
                Kick
              </button>

              <SubmitModal @submit-function="kickUser(this.cardUser)" type="kickUser" title="Confirm User Kick"
                submit="Kick User from Alliance">
                Are You Sure You Want To Kick {{ this.cardUser }} From The Alliance?
              </SubmitModal>
            </span>
          </div>
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