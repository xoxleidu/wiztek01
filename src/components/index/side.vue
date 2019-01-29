<template>
  <el-aside :width="asideWidth">
    <el-row>
      <el-col>
        <div class="collapse-view">
          <el-button v-if="isCollapse" type="primary" icon="fa fa-th" @click="falseCollapse"></el-button>
          <el-button
            v-if="!isCollapse"
            type="primary"
            icon="fa fa-align-justify"
            @click="trueCollapse"
          ></el-button>
        </div>
      </el-col>
    </el-row>
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
      </div> -->
      <side-menu :routers=routers></side-menu>
    </el-menu>
  </el-aside>
  
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
    },
    falseCollapse() {
      this.isCollapse = false;
      this.asideWidth = "240px";
    },
    trueCollapse() {
      this.isCollapse = true;
      this.asideWidth = "65px";
    }
  }
};
</script>
<style>
.el-menu-vertical-side {
  min-height: 600px;
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