<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="b in breadcrumb" :key="b.path" :to="b.meta.hideInBread? '' : {path:b.path}">{{b.meta.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    breadcrumb() {
      return this.$route.matched.filter(item => {
        return item.meta.name
      })
    }
  },
  methods: {},
  created() {
    console.log(this.$route)
  },
  mounted() {}
};
</script>
<style>
</style>