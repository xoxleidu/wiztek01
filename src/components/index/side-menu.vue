<template>
  <div>
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
