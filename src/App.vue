<template>
  <div v-if="store.getLoggedIn">
    {{ store.getLoggedIn }} || {{ store.getUserId }} || {{ store.getUserUsername }}
  </div>

  <nav>
    <router-link to="/about">About</router-link> |
    <router-link to="/alliances">Alliances</router-link> |

    <div v-if="!store.getLoggedIn">
      <router-link to="/signup">Sign Up</router-link> |
      <router-link to="/login">Log In</router-link> |
    </div>

    <div v-if="store.getLoggedIn">
      <router-link :to="`/users/${store.getUserUsername}`">Profile</router-link>
      <router-link to="/logout">Log Out</router-link>
    </div>
  </nav>

  <router-view />
</template>

<script>import { useUserStore } from "./stores/user";

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
  }
}
</script>

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
</style>
