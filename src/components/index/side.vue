<template>
  <el-menu
    class="el-menu-vertical-side"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    router
    :default-active="$route.path"
  >
    <!-- <div v-for="r in routers" :key="r.path">
        <el-menu-item :index="r.path" v-if="!r.children">{{r.meta.name}}</el-menu-item>

        <el-submenu :index="r.path" v-if="r.children">
          <template slot="title">
            <span>{{r.meta.name}}</span>
          </template>
          <el-menu-item :index="t.path" v-for="t in r.children" :key="t.path">{{t.meta.name}}</el-menu-item>
        </el-submenu>
    </div>-->
    <side-menu :routers="routers"></side-menu>
  </el-menu>
  <!-- </el-aside> -->
</template>

<script>
import sideMenu from "./side-menu";
export default {
  components: { sideMenu },
  props: {},
  data() {
    return {
      isCollapse: false,
      asideWidth: "240px"
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
<style>
.el-menu-vertical-side {
  background: none !important;
}
.el-menu-vertical-side div {
  float: left;
}
.collapse-view i {
  color: #555;
  font-size: 24px;
}
.collapse-view button {
  background: none !important;
  border: none;
  margin-top: 10px !important;
}
.collapse-view button :hover {
  background: none !important;
}
</style>