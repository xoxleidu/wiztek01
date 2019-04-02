<template>
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
