<template>
  <el-container>
    <el-header>
      <side-menu></side-menu>
    </el-header>

    <el-main :style="{height:mapHeight+'px'}">
      <router-view></router-view>
    </el-main>
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
    return {
      clientHeight: "",
      mapHeight: ""
    };
  },
  created() {
    // 获取浏览器可视区域高度
    this.clientHeight = document.documentElement.clientHeight;
    this.mapHeight = this.clientHeight - 50;
    console.log(localStorage)
    
  },
  mounted() {
    
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url("../style/style");
.el-container,
.el-main,
.el-header {
  margin: 0px;
  padding: 0px;
  
}
.el-container {
  height: clientHeight;
}
.el-header {
  height:50px !important;
  list-style-type: none;
}
</style>
