<template>
  <el-input placeholder="请输入内容" v-model="selected">
    <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
  </el-input>
</template>
<script>
import { searchGlobal, searchAdd } from "@/api/index";
export default {
  props: ["value"],
  data: function() {
    return {
      selected: ""
    };
  },
  watch: {
    value: function(newVal) {
      this.selected = newVal;
    },
    selected: function(newVal) {
      this.$emit("input", newVal);
    }
  },
  methods: {
    onSearch() {
      //this.$emit('onSearchSon', this.selected);
      //v-on:click="onSearch"
      //father//v-on:onSearchSon="onSearchSon"//function onSearchSon(){}

      //链接后台获取数据
      searchGlobal(this.selected)
        .then(res => {
          console.log(res);
          searchAdd(this.selected)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
