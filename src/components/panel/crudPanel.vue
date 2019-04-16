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
        <el-checkbox-group v-model="radioChecked">
          <el-checkbox-button
            v-for="item in optionsPanel"
            :label="item.label"
            :key="item.id"
            @change="handleRadioCheckedChange(item)"
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
        <el-checkbox-button v-for="item in options" :label="item" :key="item">{{item}}</el-checkbox-button>
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
      dialogVisible: false,
      optionsPanel: [],
      boxChecked: [],
      radioChecked: [],
      boxCheckedTemp: [],
      radioCheckedTemp: [],
      checkAll: false,
      isIndeterminate: true,
      options: []
      //optionsData: {}
    };
  },
  methods: {
    setChicked() {
      this.optionsPanel = [];
      this.optionsData.filter(element => {
        for (var i = 0; i < this.boxChecked.length; i++) {
          if (element.label === this.boxChecked[i]) {
            //console.log(i)
            //console.log(element)
            this.optionsPanel.push(element);
          }
        }
      });

      var radioCheckedTemp = this.getArrDifference(
        this.boxChecked,
        this.boxCheckedTemp
      );
      if (radioCheckedTemp.length) {
        this.radioChecked = this.radioChecked.filter(
          item => !radioCheckedTemp.some(ele => ele === item)
        );
        this.optionsPanel.forEach(element => {
          radioCheckedTemp.forEach(e => {
            if (e == element.label) {
              element.isShow = false;
            }
          });
        });
      }
      this.$emit("propanelData", this.optionsPanel);
    },
    getArrDifference(arr1, arr2) {
      return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
      });
    },
    getArrEqual(arr1, arr2) {
      let newArr = [];
      for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
          if (arr1[j] === arr2[i]) {
            newArr.push(arr1[j]);
          }
        }
      }
      return newArr;
    },

    addButton() {
      this.dialogVisible = true;
      this.boxCheckedTemp = this.boxChecked;
    },
    handleClose(done) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.setChicked();
      setTimeout(() => {
        loading.close();
      }, 1000);
      done();
    },
    handleCheckAllChange(val) {
      //console.log(val);
      if (val) {
        this.boxChecked = this.options;
      } else {
        this.boxChecked = [];
      }
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.options.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.options.length;
      console.log(this.boxChecked);
    },
    handleRadioCheckedChange(val) {
      var propanelData = "";
      this.optionsPanel.forEach(element => {
        if (element.label == val.label) {
          element.isShow = !element.isShow;
          propanelData = Object.assign({}, element);
        }
      });

      this.$emit("propanelData", propanelData);
      //this.bus.$emit("optionsPanel", this.optionsPanel);
      //console.log(this.bus);
    }
  },
  mounted() {
    // if(!this.optionsData){
    //   return
    // }
    this.optionsData.forEach(element => {
      this.options.push(element.label);
    });
    // this.options[0].isShow = true
    // this.options[0].isChecked = true
    // this.options[1].isShow = true
    // this.setChicked(this.options);
    console.log("测试");
    

    //绑定全局事件globalEvent
    this.bus.$on("radioCheckedBus", val => {
      this.radioChecked.splice(
        this.radioChecked.findIndex(item => item === val),
        1
      );
    });
    // 最好在组件销毁前
    // 清除事件监听
  },

  watch: {
    radioChecked(val) {
      this.$emit("input", val);
    }
  },
  // 最好在组件销毁前
  // 清除事件监听
  beforeDestroy() {
    this.bus.$off("radioCheckedBus");
    //页面加载
    this.boxCheckedTemp = this.boxChecked;
    //页面销毁
    this.boxChecked;
    this.radioChecked;
  }
};
</script>