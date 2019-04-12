<template>
  <div>
    <el-date-picker
      v-model="selected"
      type="datetimerange"
      size="mini"
      format="yyyy年MM月dd日HH点"
      value-format="yyyyMMddHH"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
  </div>
</template>
<script>
export default {
  props: ["value"],
  data() {
    return {
      //   selected: [new Date(2000, 10, 10, 10), new Date(2000, 10, 11, 10)]
      selected: []
    };
  },
  watch: {
    value: function(newVal) {
      this.selected = newVal;
    },
    selected: function(newVal) {
      //this.selected = newVal;
      this.$emit("input", newVal);
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../style/style");
.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 100%;
}
.el-range-editor--mini .el-range-input {
  font-size: 8px;
}
</style>
