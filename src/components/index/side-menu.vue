<template>
  <div class="menu_style">
    <div v-for="r in routers" :key="r.path">
      <div v-if="r.meta.single">
        <el-menu-item :index="r.path">
          <i :class="r.meta.icon"></i>
          <span slot="title">{{r.meta.name}}</span>
        </el-menu-item>
      </div>
      <div v-else>
        <div v-if="r.children">
          <el-submenu :index="r.path">
            <template slot="title">
              <i :class="r.meta.icon"></i>
              {{r.meta.name}}
            </template>
            <side-menu :routers="r.children"></side-menu>
            <!-- <el-menu-item :index="t.path" v-for="t in r.children" :key="t.path">{{t.meta.name}}</el-menu-item> -->
          </el-submenu>
        </div>
        <div v-else>
          <el-menu-item :index="r.path" v-if="!r.meta.hidden">
            <i :class="r.meta.icon"></i>
            <span slot="title">{{r.meta.name}}</span>
          </el-menu-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "side-menu",
  props: ["routers"],
  created() {
    //console.log(this.$route);
  }
};
</script>
<style lang="less" scoped>
@import url("../../style/style");
.menu_style {
  .display_base;
  .flex_rowWarp;
  .flex_center;
}
.menu_style > * {
  flex: 0 0 auto;
}
.menu_style {
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    margin: 0px 2px;
    i {
      color: @baseBgColorMin;
      font-size: @baseFontSizeHeader;
    }
    span {
      color: @baseBgColorMin;
    }
  }
  .el-menu-item:hover {
    background: -webkit-linear-gradient(
      #005590,
      #0984c8
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#005590, #0984c8); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#005590, #0984c8); /* Firefox 3.6 - 15 */
    background: linear-gradient(#005590, #0984c8); /* 标准的语法 */
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  .is-active {
    //background-color: @baseBgColorDark;
    background: -webkit-linear-gradient(
      #005590,
      #0984c8
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#005590, #0984c8); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#005590, #0984c8); /* Firefox 3.6 - 15 */
    background: linear-gradient(#005590, #0984c8); /* 标准的语法 */
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    span {
      color: @baseFontColorWhite;
    }
    //border-bottom: 2px solid #FFF;
  }
}
</style>
