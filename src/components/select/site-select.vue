<template>
  <div>
    <el-select class="base-select" v-model="selected" placeholder="请选择站点" filterable>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>



<script>
//import { getUserList } from "@/api/user";
export default {
  name: "siteSelect",
  props: ["value"],
  data() {
    return {
      options: [{ value: "1", label: "一级菜单" },{ value: "1", label: "2级菜单" }]
    };
  },

  watch: {
    value: function(newVal) {
      this.selected = newVal;
    },
    selected: function(newVal) {
      //console.log("new: %s, old: %s", newVal, oldVal);
      this.$emit("input", newVal);
    }
  },
  mounted() {
    //初始话下拉框的值
    //this.options = {};
    //后台获取
    getUserList()
      .then(res => {
        console.log(res);
        //this.options = this.dataTransform(res.data.data);
        //this.user = res.data.records
      })
      .catch(err => {
        console.warn(err);
      });
  },
  methods: {
    // dataTransform(data) {
    //   let _data = [];
    //   for (let i = 0; i < data.length; i++) {
    //     _data[i] = {};
    //     _data[i].label = data[i].userName;
    //     _data[i].value = data[i].userId;
    //   }
    //   return _data;
    // }
  }
};
</script>