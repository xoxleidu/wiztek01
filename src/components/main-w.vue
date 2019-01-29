<template>
  <el-container class="container-body">
    <el-header>
      <header-menu></header-menu>
    </el-header>
    <el-header class="breadcrumb-view">
      <breadcrumb-menu></breadcrumb-menu>
    </el-header>
    <el-main class="container-div">
      <router-view/>
    </el-main>
    <el-footer>
      <footer-menu></footer-menu>
    </el-footer>
  </el-container>
</template>
<script>
import headerMenu from "./index/header";
import breadcrumbMenu from "./index/breadcrumb";
import sideMenu from "./index/side";
import footerMenu from "./index/footer";
export default {
  components: { headerMenu, breadcrumbMenu, footerMenu },
  data() {
    return {
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container-body,
.container-div,
container-view {
  margin: 0px;
  padding: 0px;
  text-align: left;
}
.container-div {
  min-height: 600px;
}
.breadcrumb-view {
  margin: 20px;
}
</style>
