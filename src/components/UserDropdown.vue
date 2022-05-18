<script>
import userInformation from '@/assets/userinformation.json'

export default {
  name: "UserDropdown",
  props: ["title", "id", "current"],
  emits: ['save-data'],
  data: function () {
    return {
      dataset: userInformation[this.id],
      lookupName: this.id,
      initialChoice: this.current,
      output: "",
    };
  },
  mounted: function () {
    let name = this.lookupName.slice(0, -1);
    this.output = this.current[name];
  },
  methods: {
    emitData: function () {
      this.$emit('save-data', { name: this.lookupName.slice(0, -1), output: this.output });
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-sm-3">
      <label :for="id">
        <h6 class="mb-0">{{ title }}</h6>
      </label>
    </div>
    <div class="col-sm-9 text-secondary">
      <select class="form-select" @change="emitData()" v-model="output" :id="id" :aria-label="id">
        <option :value="item" v-for="item in dataset" :key="item">{{ item }}</option>
      </select>
    </div>
  </div>
</template>

<style>
.col-sm-3 {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>