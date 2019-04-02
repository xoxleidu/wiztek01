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

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif, "Microsoft YaHei",
    "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  margin: 0px;
  padding: 0px;
  border: none;
  list-style-type: none;
}
a {
  color: #007acc;
  text-decoration: none;
}
</style>
