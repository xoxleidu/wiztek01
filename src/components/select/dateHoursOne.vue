<template>
  <el-row>
    <el-col :span="13">
      <el-date-picker v-model="selectDay" type="date" placeholder="选择日期"></el-date-picker>
    </el-col>
    <el-col :span="7">
      <el-select v-model="selectHours" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="2">
      <el-button icon="el-icon-caret-left" @click="form"></el-button>
    </el-col>
    <el-col :span="1">
      <el-button icon="el-icon-caret-right" @click="next"></el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: ["value"],
  data() {
    return {
      selectDay: "",
      options: [],
      selectHours: ""
    };
  },
  mounted() {
    for (var i = 0; i < 24; i++) {
      this.options.push({ value: i, label: i + "时" });
    }
  },
  watch: {
    value(v) {
      this.selectHoursOld = v;
    },
    selectHours(n, v) {
      console.log(n);
      console.log(v);
      console.log(new Date());
    }
  },
  methods: {
    form() {
      if (this.selectHours > 0) {
        this.selectHours--;
      }
    },
    next() {
      if (this.selectHours < 23) {
        this.selectHours++;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../style/style");
.el-col {
  padding: 0px;
  margin: 0px;
}
.el-row {
  padding: 0px;
  margin: 10px;
  max-width: 90%;
  //el-date-editor el-input el-input--prefix el-input--suffix el-date-editor--date
  /deep/ .el-date-editor--date {
    //padding:0px;
    //margin:0px;
    //width: 50%;
    max-width: 96%;
    min-width: 50%;
    input {
      border: none;
      background: @baseBgColorBox;
      color: @baseFontColorWhite;
      font-size: @baseFontSize;
      height: 30px;
      line-height: 30px;
    }
    input::-webkit-input-placeholder {
      color: @baseFontColorWhite;
      font-size: @baseFontSize;
    }
    span {
      color: @baseFontColorWhite;
      i {
        height: 30px;
        line-height: 30px;
      }
    }
  }
  /deep/ .el-select {
    width: 100%;
    input {
      color: @baseFontColorWhite;
      border: none;
      background: @baseBgColorBox;
      font-size: @baseFontSize;
      height: 30px;
      line-height: 30px;
    }
    input::-webkit-input-placeholder {
      color: @baseFontColorWhite;
      font-size: @baseFontSize;
    }
    span {
      .el-input__icon {
        color: @baseFontColorWhite;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  /deep/ .el-button {
    border: none;
    margin: 0px;
    margin-left: 8px;
    padding: 8px 0px;
    i {
      color: @baseBgColorBox;
    }
  }
}
</style>


