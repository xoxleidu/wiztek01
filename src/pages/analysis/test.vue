<template>
  <div @click="vv"></div>
</template>
<style>
</style>
<script>
import { login } from "@/api/user";
import ajax from "@/utils/ajax";
export default {
  created() {
    function login() {
      var res = ajax.post(url, data);
      return res;
    }
    function click() {
      var fromdata = false;
    }
    login()
      .then(res => {
        console.log(res);
        fromdata = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    vv() {
      login()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }

    // .then(res => {
    //   this.tableLoading = false;
    //   var result = [];
    //   if (res.data.code == 0) {
    //     result = res.data.data;
    //     this.tableData.total = res.data.total;
    //   } else {
    //     this.$message.error(res.data.msg);
    //   }
    //   this.$set(this.tableData, "data", result);
    // })
    // .catch(err => {
    //   this.tableLoading = false;
    //   console.warn(err);
    // });
  }
};
</script>
