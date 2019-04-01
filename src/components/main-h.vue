<template>
  <el-container class="container-body">
    <el-container class="container-div">
      <el-container class="container-view">
        <el-header class="breadcrumb-view">
          <side-menu></side-menu>
          <!-- <breadcrumb-menu></breadcrumb-menu> -->
        </el-header>
        <el-main class="main-view">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-footer>
      <footer-menu></footer-menu>
    </el-footer>
  </el-container>
</template>
<script>
//import breadcrumbMenu from "./index/breadcrumb";
import sideMenu from "./index/side";
import footerMenu from "./index/footer";
export default {
  //components: { breadcrumbMenu, sideMenu, footerMenu },
  components: { sideMenu, footerMenu },
  data() {
    return {};
  },
  created() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container-body,
.container-div,
container-view {
  margin: 0px;
  padding: 0px;
}
.container-div {
  min-height: 600px;
}
.breadcrumb-view {
  background-color: #0984c8;
}
</style>
