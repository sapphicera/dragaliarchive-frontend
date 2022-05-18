<script>
import { useUserStore } from "@/stores/user";
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      store: useUserStore(),
    };
  },
  created: function () {
    this.showUser();
  },
  computed: {
    allianceFormatted() {
      return this.user.alliance.name.replace(/\s+/g, '-')
    }
  },
  methods: {
    showUser: function () {
      axios.get(`http://localhost:3000/users/${this.$route.params.username}.json`).then((response) => {
        this.user = response.data;
      }).then(() => {
        this.themeColors();
      })
    },
    editProfile: function () {
      this.$router.push(`/users/${this.user.username}/edit`);
    },
    themeColors: function () {
      let elements = document.getElementsByClassName("btn");
      for (var i = 1; i < elements.length; i++) {
        switch (this.user.element) {
          case "Light":
            elements[i].classList.add("btn-warning");
            break;
          case "Shadow":
            elements[i].classList.add("btn-dark");
            break;
          case "Fire":
            elements[i].classList.add("btn-danger");
            break;
          case "Water":
            elements[i].classList.add("btn-info");
            break;
          case "Wind":
            elements[i].classList.add("btn-success");
            break;
          case null:
            elements[i].classList.add("btn-primary");
            break;
        }
      }
    },
  },
};
</script>

<template>
  <div v-if="user.alliance_id === null && user.username === store.getUserUsername"
    class="alert alert-info d-flex align-items-center" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
      class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
      <path
        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
    <div>
      You Are Eligable To Join An Alliance! Visit the <a href="/alliances" class="alert-link">Alliance Index</a> to Join
      or Create an Alliance.
    </div>
  </div>

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
                  <button class="btn m-1">Friend RQ</button>
                  <button class="btn m-1">Message</button>
                  <button v-if="user.username === store.getUserUsername" @click="editProfile()" type="button"
                    class="btn m-1 ">Edit Profile</button>
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
                  <router-link :to="{ name: 'alliances-show', params: { name: allianceFormatted } }">
                    {{ user.alliance.name }}
                  </router-link>
                </span>
                <span v-else class="text-secondary">no alliance found!</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">Game ID</h6>
                <span class="text-secondary">{{ user.gameid }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">Level</h6>
                <span class="text-secondary">{{ user.level }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">IGN</h6>
                <span class="text-secondary">{{ user.ign }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 class="mb-0">Element</h6>
                <span class="text-secondary">{{ user.element }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- right top column card -->
        <div class="col-md-8">
          <div class="card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Weapon Class</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ user.weapon }}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Game Event</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ user.event }}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Boss Fight</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ user.fight }}
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Character</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  {{ user.character }}
                </div>
              </div>
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

</template>

<style>
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

.col-sm-3 {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>