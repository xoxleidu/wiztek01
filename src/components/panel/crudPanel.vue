<template>
  <div class="panel">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="fa fa-chevron-circle-right"></i>
        {{title}}
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        <el-button icon="el-icon-circle-plus" @click="addButton"></el-button>
      </div>
      <div class="box-card-main">
        <el-checkbox-group v-model="radioChecked" @change="handleRadioChange">
          <el-checkbox-button
            v-for="item in optionsData"
            v-if="item.checked"
            :label="item.id"
            :key="item.id"
            :checked="item.show"
            @change="handleRadioChecked($event,item)"
          >{{item.label}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="60%"
      :close-on-click-modal="true"
      :show-close="false"
      :before-close="handleClose"
    >
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="boxChecked" @change="handleCheckedChange">
        <el-checkbox-button
          v-for="item in optionsData"
          :label="item.id"
          :key="item.id"
          :checked="item.checked"
          @change="handleBoxChecked($event,item)"
        >{{item.label}}</el-checkbox-button>
      </el-checkbox-group>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
@import url("../../style/style");
/**
* panel
* card
*/
.el-card {
  background: none;
  border: none;
  margin: 10px;
  box-shadow: none;
  /**
  * header
  */
  /deep/ .el-card__header {
    padding: 10px;
    color: @baseFontColorHeader;
    font-size: @baseFontSize;
    border: none;
    .clearfix {
      i {
        font-size: @baseFontSize2;
        color: @baseBgColorBox;
      }
      button {
        float: right;
        background: none;
        border: none;
        margin: 0px;
        padding: 0px;
        i {
          color: @baseBgColorBox;
        }
      }
    }
  }
  /deep/ .el-card__body {
    clear: both;
    margin: 0px;
    padding: 0px;
    background-color: @baseBgColorBox;
    border-radius: 3px;
    /**
    * box
    * el-checkbox-group
    * label el-checkbox-button
    * input span 5px 5px 5px 0px
    */
    // .box-card-main when () {
    //   padding: 3px;
    // }
    .el-checkbox-group {
      .display_base;
      .flex_rowWarp;
      label {
        margin: 6px 3px 3px 6px;
        span {
          padding: 4px 8px;
          border-radius: 10px;
          border: 1px solid;
          border-color: @baseFontColorChecked;
          font-size: @baseFontSize;
        }
      }
    }
  }
}
/**
* dialog
* card
*/
.el-dialog__wrapper /deep/ .el-dialog {
  border-radius: 5px;
  border: 1px solid;
  border-color: @baseBgColorDark;
  .el-dialog__header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: @baseBgColorHeader;
    padding: 10px 20px;
    span {
      font-size: @baseFontSize3;
      color: @baseFontColor;
    }
  }
  .el-dialog__body {
    margin: 10px;
    padding: 5px 10px;
    .el-checkbox-group {
      .display_base;
      .flex_rowWarp;
      label {
        margin: 6px 3px 3px 6px;
        span {
          padding: 4px 8px;
          border-radius: 10px;
          border: 1px solid;
          border-color: @baseFontColorGrey;
          font-size: @baseFontSize2;
        }
      }
    }
  }
}
</style>

<script>
export default {
  components: {},
  //得到父组件传递过来的数据
  props: ["title", "optionsData"],
  data() {
    return {
      loading: true,
      dialogVisible: false,
      boxChecked: [],
      radioChecked: [],
      checkAll: false,
      isIndeterminate: true,
      aOptions: []
    };
  },
  methods: {
    addButton() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      setTimeout(() => {
        loading.close();
      }, 1000);
      done();
    },
    proPanelClose(item) {
      this.boxChecked.splice(this.boxChecked.findIndex(v => v == item.id), 1);
      this.handleBoxChecked(false, item);
    },
    handleCheckAllChange(val) {
      this.boxChecked = val ? this.aOptions : [];
      this.optionsData.forEach(e => {
        if (val) {
          e.checked = true;
          //e.show = false;
        } else {
          e.checked = false;
          e.show = false;
          this.radioChecked.forEach(element => {
            if (e.id == element) {
              this.handleRadioChecked(false, e);
            }
          });
        }
      });
      if (!val) {
        this.radioChecked = [];
      }
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.optionsData.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.optionsData.length;
    },

    handleBoxChecked(e, item) {
      this.optionsData.forEach(element => {
        if (element.id === item.id) {
          element.checked = e;
          if (!e) {
            element.show = false;
            this.radioChecked = this.radioChecked.filter(e => {
              if (e != item.id) {
                return true;
              }
            });
            this.handleRadioChecked(false, item);
          }
        }
      });
      // if(!e){
      //   this.radioChecked.splice(this.radioChecked.findIndex(v => v == item.label),1)
      //   console.log(this.radioChecked)
      // }
    },
    handleRadioChange(value, item) {},
    handleRadioChecked(e, item) {
      this.optionsData.forEach(element => {
        if (element.id == item.id) {
          element.show = e;
          this.$emit("radioData", e, element);
        }
      });
    }
  },
  mounted() {
    if (!this.optionsData) {
      return;
    }
    this.optionsData.forEach(e => {
      this.aOptions.push(e.id);
    });
    //绑定全局事件globalEvent
    // this.bus.$on("radioCheckedBus", item => {
    //   this.teeststdd(item);
    // });
    // 最好在组件销毁前
    // 清除事件监听
  }
};
</script>