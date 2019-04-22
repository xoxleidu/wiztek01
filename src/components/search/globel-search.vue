<template>
  <div class="search_nav">
    <el-input placeholder="请输入站号,站名,地区" v-model="selected">
      <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
    </el-input>
  </div>
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

      //链接后台获取数据get
      searchGlobal({ testData: this.selected, num: 12 })
        .then(res => {
          console.log(res.data);
          //链接后台获取数据post
          searchAdd({ username: this.selected, password: "" })
            .then(res => {
              console.log(res.data.username);
              console.log(typeof res.data);
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
<style lang="less" scoped>
@import url("../../style/style");
.search_nav {
  min-width: 260px;
  max-width: 360px;
  /deep/ .el-input {
    padding: auto;
    input {
      height: 26px;
      line-height: 26px;
      border-radius: 15px;
      background-color: #EBF4FB;
      border:none;
      color: @baseFontColorGrey;
    }
    .el-input-group__append {
      position: absolute;
      top: 20%;
      right: 10px;
      border: none;
      background: none;
      button {
        i {
          color: @baseBgColorDark;
        }
      }
    }
  }
}
</style>
