<template>
  <el-container>
    <el-aside class="leftbg" v-if="isCollapse">
      <div>321321</div>
    </el-aside>
    <el-main>
      <div>
        <el-button type="primary" icon="el-icon-edit" @click="falseCollapse"></el-button>
      </div>
    </el-main>
    <el-aside class="rigbg" v-if="false">right</el-aside>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  created() {},
  methods: {
    falseCollapse() {
      if (this.isCollapse) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
    }
  }
};
</script>

<style>
.leftbg {
  width: 230px;
  background-color: blue;
}
.rigbg {
  background-color: blue;
}
</style>
