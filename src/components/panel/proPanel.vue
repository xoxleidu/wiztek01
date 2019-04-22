<template>
  <div>
    <div v-for="item in optionsPanel" :key="item.id">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{item.label}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="panelClose(item)">X</el-button>
        </div>
        <!-- <div v-for="o in item.children" :key="o.label" class="text item">{{'列表内容 ' + o.label }}</div> -->
        <div class="box-card-main">
          <colorBar :colorStyle="setColorStyle"></colorBar>
        </div>
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
      .el-button {
        float: right;
        background: none;
        border: none;
        margin: 0px;
        padding: 0px;
        span {
          color: @baseBgColorBox;
        }
      }
    }
  }
  /deep/ .el-card__body {
    clear: both;
    margin: 0px;
    padding: 0px;
    background-color: none;
    border-radius: 3px;
    padding: 10px;
  }
}
</style>

<script>
import colorBar from "@/components/panel/colorBar";
export default {
  components: { colorBar },
  props: ["optionsPanel"],
  data() {
    return {
      optionsPanels: [],
      setColorStyle: {
        color: "style1",
        text: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    };
  },
  mounted() {
    console.log("属性", this.optionsPanel);
    if (!this.optionsPanel) {
      return;
    }
  },
  methods: {
    panelClose(item) {
      let temp = Object.assign({}, item);
      this.$emit("input", temp);
      //this.bus.$emit("radioCheckedBus", temp);
    }
  }
};
</script>
