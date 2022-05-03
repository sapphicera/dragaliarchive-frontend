<script>
export default {
  name: "SubmitModal",
  props: ['type', 'title'],
  emits: ['submit-function']
}
</script>

<template>
  <div class="modal fade" :id="type" tabindex="-1" aria-labelledby="submitModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <form v-on:submit.prevent="$emit('submit-function')">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="submitModalLabel">{{ title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <slot />
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" value="Submit" class="btn btn-primary">Create</button>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<style scoped>
</style>