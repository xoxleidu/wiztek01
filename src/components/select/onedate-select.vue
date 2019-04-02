<template>
  <div>
    <div class="block">
      <el-date-picker v-model="selected" type="date" placeholder="选择日期"></el-date-picker>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
export default {
  props: ["value"],
  data() {
    return {
      selected: ""
    };
  },
  created() {
    //console.log(timestampToTime(1545235200));
  },
  watch: {
    value: function(newVal) {
      this.selected = newVal;
    },
    selected: function(newVal) {
      //console.log("new: %s, old: %s", newVal, oldVal);
      if (newVal) {
        this.$emit("input", newVal);
        //this.$emit("input", Date.parse(newVal) / 1000);
      } else {
        Message({
          message: "请选择时间",
          type: "error",
          duration: 5 * 1000
        });
      }
    },
    
  }
};
</script>