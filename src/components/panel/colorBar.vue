<template>
  <div>
    <div class="colorItem" :class="colorStyle.color"></div>
    <el-row type="flex" class="colorText" justify="space-between">
      <el-col
        :span="Math.floor(24 / colorStyle.text.length)"
        v-for="item in colorStyle.text"
        :key="item"
      >{{item}}</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ["colorStyle"],
  data() {
    return {};
  },
  created() {},
  watch: {}
};
</script>

<style lang="less" scoped>
@import url("../../style/style");
@import url("../../style/colorBar");
.colorItem {
  widows: 100%;
  position: relative;
  height: 12px;
  margin: 0px;
  border-radius: 5px;
}
.colorText {
  widows: 100%;
  margin: 0px 5px;
  padding: 0px;
  text-align: center;
  font-size: @baseFontSize;
  color: @baseFontColor;
}
</style>
