<script>
export default {
  name: "UserCard",
  props: ['username', 'ign', 'icon', 'level']
}
</script>

<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">{{ username }}</h5>
      <img v-bind:src="icon" />
      <h6>ign {{ ign }}</h6>
      <h6>level {{ level }}</h6>
      <div class="cut-text">
        alliance user
      </div>
    </div>
    <div class="card-footer">
      <router-link :to="{
        name: 'users-profile', params: { username: username }
      }" class="btn btn-primary">View Profile</router-link>
    </div>
  </div>
</template>

<style>
img {
  height: 100px;
  width: 100px;
}
</style>