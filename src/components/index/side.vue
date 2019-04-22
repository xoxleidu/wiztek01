<template>
  <div class="baseHeader">
    <div class="logo_div">
      <img src="@/assets/logo.png">
    </div>
    <div class="menu_div">
      <el-menu
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        router
        :default-active="$route.path"
        mode="horizontal"
      >
        <side-menu :routers="routers"></side-menu>
      </el-menu>
    </div>
    <div class="search_div">
      <globel-search v-model="searchData"></globel-search>
    </div>
    <div class="userInfo_div">
      <user-info></user-info>
    </div>
  </div>
</template>

<script>
import sideMenu from "./side-menu";
import globelSearch from "@/components/search/globel-search";
import userInfo from "@/components/index/user-info";
export default {
  components: { sideMenu, globelSearch, userInfo },
  props: {},
  data() {
    return {
      isCollapse: false,
      searchData: ""
    };
  },

  computed: {
    routers() {
      return this.$router.options.routes.filter(item => {
        return !item.meta.hidden;
      });
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../style/style");

.baseHeader {
  height: 50px;
  .display_base;
  .flex_rowWarp;
  .flex_spaceBetween;
  background-color: @baseBgColorHeader;
  div {
    flex: 0 0 auto;
    margin: auto 5px;
    .logo_div {
    }
    .el-menu {
      margin-top: 9px;
      border: none;
      height: 40px;
      line-height: 40px;
      background-color: @baseBgColorHeader;
    }
    .search_div {
    }
    .userInfo_div {
    }
  }
}
</style>