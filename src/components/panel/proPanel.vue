<template>
  <div>
    <div v-for="item in optionsPanels" :key="item.label">
      <el-card class="box-card" v-show="item.isShow">
        <div slot="header" class="clearfix">
          <span>{{item.label}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="panelClose(item)">X</el-button>
        </div>
        <div v-for="o in item.children" :key="o.label" class="text item">{{'列表内容 ' + o.label }}</div>
      </el-card>
    </div>
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
</style>

<script>
export default {
  props: ["optionsPanel"],
  data() {
    return {
      optionsPanels: []
    };
  },
  mounted() {
    //console.log("面板");
    //console.log(this.optionsPanel);
    // if(this.optionsPanel){

    //   this.optionsPanel = this.optionsPanel
    // }else{
    //   return
    // }
    //绑定全局事件globalEvent
    // this.bus.$on("optionsPanel", val => {
    //   this.optionsPanel = val;
    // });
    // 最好在组件销毁前
    // 清除事件监听
  },
  watch: {
    optionsPanel() {
      this.optionsPanels = Object.assign({}, this.optionsPanel)
    }
  },
  methods: {
    panelClose(val) {
      val.isShow = false;
      //   //arr.splice(arr.findIndex(item => item.id === 8), 1)
      //   this.radioChecked.splice(
      //     this.radioChecked.findIndex(item => item.label == val.label)
      //   );
      this.bus.$emit("radioCheckedBus", val.label);
    }
  },
  // 最好在组件销毁前
  // 清除事件监听
  beforeDestroy() {
    //this.bus.$off("optionsPanel");
  }
};
</script>
