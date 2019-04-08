<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less" scoped>
@import url("./style/style");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif, "Microsoft YaHei",
    "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @baseFontColor;
  margin: 0px;
  padding: 0px;
  border: none;
  list-style-type: none;
}
</style>
