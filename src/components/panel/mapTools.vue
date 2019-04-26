<template>
  <div class="maptools_div">
    <el-button-group>
      <el-button v-popover:toolsCity @click="selectCity?  true : false">城市</el-button>
      <el-button v-popover:selectMapStyle @click="selectMapStyle?  true : false">地图</el-button>
    </el-button-group>
    <el-popover ref="toolsCity" placement="bottom-start" width="270" v-model="selectCity">
      <div>
        当前位置:
        <span>索马里</span>
      </div>
      <hr>
      <div class="button_list">
        <el-button type="text" v-for="b in options" :key="b.id">{{b.label}}</el-button>
      </div>
      <div v-loading="selectSearchLoading" class="button_group">
        <el-radio-group v-model="radioCity" size="mini">
          <el-radio-button label="0">按大洲</el-radio-button>
          <el-radio-button label="1">按城市</el-radio-button>
        </el-radio-group>
        <div v-if="!select_div">
          <el-select
            v-model="toolSelectSearch"
            filterable
            remote
            placeholder="请输入洲"
            :remote-method="handleRemoteMethod"
            size="mini"
          >
            <el-option
              v-for="item in selectOptions0"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div v-if="!!select_div">
          <el-select
            v-model="toolSelectSearch"
            filterable
            remote
            placeholder="请输入城市"
            :remote-method="handleRemoteMethod"
            size="mini"
          >
            <el-option
              v-for="item in selectOptions1"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="button_list">
        <el-button type="text" v-for="o in abcItem" :key="o">{{o}}</el-button>
      </div>
      <hr>
      <el-row :gutter="5" v-loading="list_loading" v-for="tree in listOptions" :key="tree.id">
        <el-col :span="3" class="list_sup" :ref="tree.id">{{((tree.py).charAt(0)).toUpperCase()}}</el-col>
        <el-col :span="5" class="button_list">
          <el-button type="text">{{tree.label}}:</el-button>
        </el-col>
        <el-col :span="16" class="button_list">
          <el-button type="text" v-for="t in tree.children" :key="t.id">{{t.label}}</el-button>
        </el-col>
      </el-row>
      <!-- <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="selectCity = false">取消</el-button>
        <el-button type="primary" size="mini" @click="selectCity = false">确定</el-button>
      </div>-->
    </el-popover>
    <el-popover ref="selectMapStyle" placement="bottom-start" width="270" v-model="selectMapStyle">
      <div class="mapStyleImg_div" v-loading="mapStyle_loading">
        <div class="mapStyleImg" v-for="item in aMapStyle" :key="item.id">
          <img :src="item.url">
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
import { getJsonCitySelect, getJsonMapStyle } from "@/api/index";
export default {
  data() {
    return {
      selectSearchLoading: false,
      toolSelectSearch: "",
      options: [],
      selectOptions0: [],
      selectOptions1: [],
      listOptions: [],
      list_loading: false,
      select_div: false,
      radioCity: 0,
      selectCity: true,
      selectMapStyle: false,
      mapStyle_loading: false,
      aMapStyle: [],
      abcItem: []
    };
  },
  watch: {
    radioCity(v) {
      console.log(v);
      console.log(!+v);
      console.log(!!+v);
      console.log(typeof +v);
      this.select_div = +v;
    }
  },
  created() {
    this.list_loading = true;
    this.mapStyle_loading = true;
    this.selectSearchLoading = true;
    this.getCityOptions();
    this.getMapStyleOptions();
  },
  methods: {
    getCityOptions() {
      getJsonCitySelect()
        .then(res => {
          setTimeout(() => {
            this.options = res.data;
            this.selectOptions0 = this.options.filter(element => {
              return !element.pid;
            });
            this.selectOptions1 = this.options.filter(element => {
              return !!element.pid;
            });
            this.listOptions = this.$utils.getTreesInList(this.options);
            console.log(this.listOptions);
            this.listOptions.forEach(element => {
              this.abcItem.push(element.py.charAt(0).toUpperCase());
            });
            this.list_loading = false;
            this.selectSearchLoading = false;
          }, 2000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMapStyleOptions() {
      getJsonMapStyle()
        .then(res => {
          setTimeout(() => {
            this.aMapStyle = res.data;
            this.mapStyle_loading = false;
          }, 2000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRemoteMethod() {}
  }
};
</script>
<style lang="less" scoped>
@import url("../../style/style");
.el-select {
  width: 130px;
}
.mapStyleImg_div {
  .display_base;
  .flex_rowWarp;
  .flex_spaceBetween;
  div {
    flex: 0 0 auto;
  }
}
div,
.el-row,
.el-col {
  padding: 0px;
  margin: 0px;
}
.list_sup {
  font-size: 28px;
}
.button_list {
  margin: 5px 0px;
  .el-button {
    margin: 4px;
    padding: 0px;
  }
}
.button_group {
  .display_base;
  .flex_rowNoWarp;
  .flex_spaceBetween;
  margin: 5px 0px;
  div {
    flex: 0 0 auto;
  }
}
</style>
