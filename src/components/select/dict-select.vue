<template>
  <el-select class="base-select" v-model="selected">
    <el-option :value="item.value" :label="item.label" v-for="(item,index) in dict" :key="index"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ["value", "dict"],
  data: function() {
    return {
      selected: ""
    };
  },
  watch: {
    value: function(newVal) {
      this.selected = newVal;
    },
    selected: function(newVal) {
      this.$emit("input", newVal);
    }
  }
};
</script>

<style>
</style>
