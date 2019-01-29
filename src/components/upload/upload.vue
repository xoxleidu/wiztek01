<template>
  <div>
    <el-form>
      <el-form-item label="上传图片">
        <el-upload
          multiple
          list-type="picture-card"
          v-loading="vueLoading"
          :action="$dict.IMAGEL_URL"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-progress="handleProgress"
          :on-error="handleError"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      vueLoading: false,
    };
  },
  created() {
  },
  methods: {
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeAvatarUpload(file) {
      const isJPG = file.type === this.$dict.IMAGEL_TYPE;
      const isLt2M = file.size < this.$dict.IMAGEL_SIZE;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //文件上传成功时的钩子
    handleAvatarSuccess(res, file) {
      this.vueLoading = false;
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      this.$emit("input", file.url);
    },
    //文件上传时的钩子
    handleProgress(event, file, fileList) {
      this.vueLoading = true;
    },
    //文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.vueLoading = false;
    },
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {},
    //点击文件列表中已上传的文件时的钩子，显示大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
