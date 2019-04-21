<template>
  <div class="panel">
    <!-- <el-button @click="testbutton">测试</el-button> -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
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
      title="添加"
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
  background: @baseBgColorLight;
  border: none;
  margin: 10px;
  /**
  * header
  */
  /deep/ .el-card__header {
    padding: 10px;
    color: @baseFontColorHeader;
    font-size: @baseFontSize;
    border: none;
    div {
      span {
        float: left;
      }
      button {
        float: right;
        background: none;
        border: none;
        margin: 0px;
        padding: 0px;
        i {
          color: #fff;
        }
      }
    }
  }
  /deep/ .el-card__body {
    clear: both;
    margin-top: 20px;
    padding: 5px 10px;
    background-color: @baseBgColorBox;
    /**
    * box
    * el-checkbox-group
    * label el-checkbox-button
    * input span 5px 5px 5px 0px
    */
    .el-checkbox-group {
      label {
        span {
          padding: 5px 8px;
          margin: 5px 5px 5px 0px;
          border-radius: 10px;
          border: none;
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
  .el-dialog__header {
  }
  .el-dialog__body {
    margin: 20px;
    padding: 5px 10px;
    .el-checkbox-group {
      label {
        span {
          padding: 5px 8px;
          margin: 5px 5px 5px 0px;
          border-radius: 10px;
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
      // console.log("close", this.radioChecked);
      // let un1 = this.$utils.getArrDifference(this.aOptions, this.boxChecked);
      // let un2 = this.$utils.getArrEqual(un1, this.radioChecked);
      // let temp;
      // if (un2.length) {
      //   this.radioChecked.forEach(element => {
      //     temp = un2.filter(e => {
      //       if (e != element) {
      //         return true;
      //       }
      //     });
      //   });
      //   this.radioChecked = temp;
      // }
      // console.log("close", this.radioChecked);
      //this.radioChecked = this.boxChecked;
      setTimeout(() => {
        loading.close();
      }, 1000);
      done();
    },
    proPanelClose(item) {
      //debugger;
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

  // beforeDestroy() {
  //   this.bus.$off("radioCheckedBus");
  // }
};
</script>