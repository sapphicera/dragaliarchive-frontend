<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/alliances">Alliances</router-link> |
    <div v-if="!isLoggedIn">
      <router-link to="/signup">Sign Up</router-link> |
      <router-link to="/login">Log In</router-link> |
    </div>
    <div v-if="isLoggedIn">
      <router-link to="/logout">Log Out</router-link>
    </div>

  </nav>
  <router-view />
</template>

<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
      getUserId: 0,
    }
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
      this.getUserId = localStorage.user_id;
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
