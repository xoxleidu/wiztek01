<template>
  <div class="map-div">
    <div class="left">
      <div class="panelAD">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>实况观测</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            <el-button icon="el-icon-circle-plus" @click="addButton"></el-button>
          </div>
          <div class="box-card-main">{{'列表内容 '}}</div>
        </el-card>
      </div>

      <div>
        <el-checkbox-group v-model="radioChecked">
          <el-checkbox-button
            v-for="item in optionsPanel"
            :label="item.label"
            :key="item.id"
            @change="handleRadioCheckedChange(item)"
          >{{item.label}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <div class="right">
      <div v-for="item in optionsPanel" :key="item.id">
        <el-card class="box-card" v-show="item.isShow">
          <div slot="header" class="clearfix">
            <span>{{item.label}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="panelClose(item)">X</el-button>
          </div>
          <div v-for="o in item.children" :key="o.id" class="text item">{{'列表内容 ' + o.label }}</div>
        </el-card>
      </div>
    </div>
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
<style lang="less">
@import url("../../style/style");
.el-checkbox-group label span,
.el-checkbox-group label.is-checked span,
.el-checkbox-group label span.el-checkbox-button__inner,
.el-checkbox-group label.is-checked span.el-checkbox-button__inner {
  border: none;
  list-style-type: none;
}
.el-checkbox-group {
  //el-checkbox-group label span
  label,
  label.is-checked {
    margin: 0px 5px;
    padding: 0px;
    border: none;
    //border: 1px solid #dcdfe6 !important;

    span {
      border: 1px solid #dcdfe6 !important;
      border-radius: 4px !important;
      padding: 5px;
    }
  }
}
.map-div {
  position: relative;
  widows: 100%;
  height: 100%;
  display: flex;
  .left {
    flex: 0 0 @baseLeftWidth;
    background-color: @baseBgColorDark;
    min-height: 100%;
  }
}
</style>

<script>
export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      optionsPanel: [],
      boxChecked: [],
      boxCheckedTemp: [],
      radioChecked: [],
      checkAll: false,
      isIndeterminate: true,
      options: [],
      optionsData: {}
    };
  },
  methods: {
    addButton() {
      this.dialogVisible = true;
      this.boxCheckedTemp = this.boxChecked;
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
    handleClose(done) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

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

      setTimeout(() => {
        loading.close();
      }, 1000);
      done();
    },
    handleCheckAllChange(val) {
      this.boxChecked = val ? this.options : [];
      this.isIndeterminate = false;
      //console.log(this.boxChecked);
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.options.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.options.length;
      //console.log(this.boxChecked);
    },
    handleRadioCheckedChange(val) {
      //console.log(val);
      this.optionsPanel.forEach(element => {
        if (element.label == val.label) {
          element.isShow = !element.isShow;
        }
      });
    },
    panelClose(val) {
      val.isShow = false;
      //arr.splice(arr.findIndex(item => item.id === 8), 1)
      this.radioChecked.splice(
        this.radioChecked.findIndex(item => item.label == val.label)
      );
    }
  },
  mounted() {
    this.optionsData = [
      {
        pid: 0,
        id: 1,
        label: "name1",
        url: "/home1",
        isShow: false,
        children: [
          {
            pid: 1,
            id: 11,
            isShow: true,
            label: "name11",
            url: "/home11"
          }
        ]
      },
      {
        pid: 0,
        id: 2,
        label: "name2",
        url: "/home2"
      }
    ];
    this.optionsData.forEach(element => {
      this.options.push(element.label);
    });
  },
  watch: {
    boxChecked(val) {
      //console.log(val)
      //this.boxChecked.push()
      // val.forEach(element => {
      //   this.boxChecked.push(element.splice(this.options.indexOf(element),1))
      // })
    }
  }
};
</script>