<script>
export default {
  name: "AllianceCard",
  props: ['data'],
  data: function () {
    return {
      name: this.data.name,
      leader: this.data.leader,
      icon: this.data.icon,
      description: this.data.description
    };
  },
  computed: {
    allianceFormatted() {
      return this.name.replace(/\s+/g, '-')
    }
  },
}
</script>

<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <h6>by {{ leader }}</h6>
      <img v-bind:src="icon" />
      <div class="cut-text">
        {{ description }}
      </div>
    </div>
    <div class="card-footer">
      <!-- <router-link :to="{
        name: 'alliances-show', params: { name: name }
      }" class="btn btn-primary">Learn More</router-link> -->
      <router-link :to="{ name: 'alliances-show', params: { name: allianceFormatted } }" class="btn btn-primary">
        Learn More
      </router-link>
    </div>
  </div>
</template>

<style>
</style>