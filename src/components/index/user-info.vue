<template>
  <el-dropdown>
    <el-button type="primary" icon="fa fa-user-circle-o fa-2x"></el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>个人信息</el-dropdown-item>
      <el-dropdown-item><span @click="loginOut">退出</span></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  props: [],
  data: function() {
    return {};
  },
  watch: {},
  methods: {
    onSearch() {
      //this.$emit('onSearchSon', this.selected);
      //v-on:click="onSearch"
      //father//v-on:onSearchSon="onSearchSon"//function onSearchSon(){}
      //链接后台获取数据
    },
    loginOut() {
      this.$store.dispatch("loginOut").then(() => {
        this.$router.replace({ path: "login" });
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../style/style");
.el-dropdown {
  .el-button {
    background: none;
    border: none;
    margin: 0px;
    padding: 0px;
  }
}

</style>
