<template>
  <div>
    <div v-for="item in optionsPanel" :key="item.id">
      <el-card class="box-card" v-show="item.isShow">
        <div slot="header" class="clearfix">
          <span>{{item.label}}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            v-model="close"
            @click="panelClose(item)"
          >X</el-button>
        </div>
        <div v-for="o in item.children" :key="o.id" class="text item">{{'列表内容 ' + o.label }}</div>
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
//   props: {
//     optionsPanel: {
//       type: Object,
//       default: function() {
//         return { optionsPanel: [] };
//       }
//     }
//   },
  data() {
    return {
        
    };
  },
  mounted() {
    if (!optionsPanel) {
      return {};
    }
  },
  methods: {
    panelClose(val) {
      val.isShow = false;
      //   //arr.splice(arr.findIndex(item => item.id === 8), 1)
      //   this.radioChecked.splice(
      //     this.radioChecked.findIndex(item => item.label == val.label)
      //   );
      this.$emit("proPanelChecked", val.label);
    }
  }
};
</script>
