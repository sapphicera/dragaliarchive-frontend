<script>
import { useUserStore } from "./stores/user";

export default {
  data: function () {
    return {
      store: useUserStore(),
    }
  },
  watch: {
    $route: function () {
      this.store.getLoggedIn = !!localStorage.jwt;
      this.store.getUserId = localStorage.user_id;
      this.store.getUserUsername = localStorage.user_username;
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    comicRoute() {
      return this.$route.params.id;
    }
  }
}
</script>

<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">DragaliArchive</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <!-- standard links & dropdown links to pages -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/comics/en">Comics</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/stickers">Stickers</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/alliances">Alliances</a>
          </li>
          <li class="nav-item" v-if="store.getLoggedIn">
            <a class="nav-link" :href="`/users/${store.getUserUsername}`">Profile</a>
          </li>

          <span v-if="store.getLoggedIn">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Account
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/">Saved Comics</a></li>
                <li><a class="dropdown-item" href="/">Friend List</a></li>
                <li><a class="dropdown-item" :href="`/users/${store.getUserUsername}/edit`">Edit Profile</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="/logout">Sign Out</a></li>
              </ul>
            </li>
          </span>

          <li class="nav-item" v-if="!store.getLoggedIn">
            <a class="nav-link" href="/signup">Sign Up</a>
          </li>
          <li class="nav-item" v-if="!store.getLoggedIn">
            <a class="nav-link" href="/login">Log In</a>
          </li>
        </ul>

        <!-- search bar for users -->
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success me-4" type="submit">Search</button>
        </form>

        <!-- language button -->
        <div class="btn-group" v-if="currentRouteName === `comics-index` || currentRouteName === `comics-show`">
          <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Language
          </button>

          <!-- comic index -->
          <ul class="dropdown-menu dropdown-menu-end" v-if="currentRouteName === `comics-index`">
            <li><a class="dropdown-item" href="/comics/en">EN</a></li>
            <li><a class="dropdown-item" href="/comics/jp">日本語</a></li>
            <li><a class="dropdown-item" href="/comics/chs">简体中文</a></li>
            <li><a class="dropdown-item" href="/comics/cht">繁體中文</a></li>
          </ul>

          <!-- specific comic issue -->
          <ul class="dropdown-menu dropdown-menu-end" v-if="currentRouteName === `comics-show`">
            <li><a class="dropdown-item" :href="`/comics/en/${comicRoute}`">EN</a></li>
            <li><a class="dropdown-item" :href="`/comics/jp/${comicRoute}`">日本語</a></li>
            <li><a class="dropdown-item" :href="`/comics/chs/${comicRoute}`">简体中文</a></li>
            <li><a class="dropdown-item" :href="`/comics/cht/${comicRoute}`">繁體中文</a></li>
          </ul>

          <!-- sticker page -->
          <ul class="dropdown-menu dropdown-menu-end" v-if="currentRouteName === `stickers-index`">
            <li><a class="dropdown-item" :href="`/comics/en/${comicRoute}`">EN</a></li>
            <li><a class="dropdown-item" :href="`/comics/jp/${comicRoute}`">日本語</a></li>
          </ul>
        </div>

      </div>
    </div>
  </nav>

  <!-- <div v-if="store.getLoggedIn">
    {{ store.getLoggedIn }} || {{ store.getUserId }} || {{ store.getUserUsername }}
  </div> -->

  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.dropdown-menu.dropdown-menu-end {
  min-width: 100%;
}
</style>