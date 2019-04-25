<template>
  <div class="login-form">
    <el-form
      status-icon
      :rules="rules"
      :model="formData"
      size="small"
      ref="baseForm"
      @submit.native.prevent
    >
      <el-form-item label="登陆帐号" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input v-model="formData.passWord" type="password"></el-input>
      </el-form-item>

      <el-form-item style="text-align:center; padding-top:20px;">
        <el-button
          type="primary"
          :loading="loading"
          native-type="submit"
          @click="formSubmit"
          size="large"
        >登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang="scss">
.login-form {
  margin: 0 auto;
  margin-top: 10%;
  width: 25%;
}
</style>
<script>
import { login } from "@/api/index";
import "@/utils/md5.js";
export default {
  data() {
    return {
      loading: false,
      formData: {
        userName: "",
        passWord: ""
      },
      rules: {}
    };
  },
  methods: {
    formSubmit() {
      this.$refs.baseForm.validate(isVaildate => {
        if (isVaildate) {
          var postData = Object.assign({}, this.formData);
          postData.passWord = postData.passWord.MD5(16);

          //this.$router.replace("/");

          this.loading = true;
          login(postData)
            .then(res => {
              this.loading = false;
              console.log("login ", res);
              if (res.data.code == "000") {
                this.$message.success("登陆成功！");
                this.$store.commit(
                  "loginIn",
                  Object.assign(res.data.data, postData)
                );
                console.log(this.$store.token)
                if (document.referrer) {
                  location.href = document.referrer;
                } else {
                  this.$router.replace("/");
                  // location.reload();
                }
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              console.log("err " + err);
              this.loading = false;
              this.$message.error("接口错误");
            });
        }
      });
    }
  }
};
</script>