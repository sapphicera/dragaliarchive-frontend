<script>
export default {
  name: "AllianceCard",
  props: ['name', 'leader', 'icon', 'description']
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
      <router-link :to="{
        name: 'alliances-show', params: { name: name }
      }" class="btn btn-primary">Learn More</router-link>
    </div>
  </div>
</template>

<style>
</style>