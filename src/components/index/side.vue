<template>
  <el-row :gutter="0">
    <el-col :span="6" class="logo_div">
      <img src="@/assets/logo.png">
    </el-col>
    <el-col :span="10">
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
    </el-col>
    <el-col :span="6">
      <div class="search_div">
        <globel-search v-model="searchData"></globel-search>
      </div>
    </el-col>
    <el-col :span="1">&nbsp;</el-col>
    <el-col :span="1" class="userInfo_div">
      <div class="userInfo_div">
        <user-info></user-info>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import sideMenu from "./side-menu";
import globelSearch from "@/components/search/globel-search";
import userInfo from "@/components/index/user-info"
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

div.el-row {
  background-color: @baseBgColorHeader;
  .el-col {
    .logo_div {
    }
    .el-menu {
      border: none;
      background-color: @baseBgColorHeader;
    }
    .search_div {
      padding: 8px 0px;
    }
    .userInfo_div {
      padding: 12px 0px;
    }
  }
}
</style>