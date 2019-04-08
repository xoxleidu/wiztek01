<template>
  <div class="main_div">
    <!-- <div class="map-div">
    </div>-->

    <div class="left_bg" v-show="isCollapseL">
      <div class="analysis_left_div">
        <el-row class="title_row">
          <el-col :span="24">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>数据类型
          </el-col>
        </el-row>
        <el-row class="button_row" type="flex" justify="space-between">
          <el-col :span="6">
            <el-button size="mini">原始数据</el-button>
          </el-col>
          <el-col :span="4">
            <el-button size="mini">年鉴</el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="mini">校正数据</el-button>
          </el-col>
        </el-row>
        <el-row class="title_row">
          <el-col :span="24">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>时间类型
          </el-col>
        </el-row>
        <el-row class="button_row" type="flex" justify="space-between">
          <el-col :span="7">
            <el-button size="mini">逐小时数据</el-button>
          </el-col>
          <el-col :span="7">
            <el-button size="mini">逐3小时数据</el-button>
          </el-col>
        </el-row>
        <el-row class="title_row">
          <el-col :span="24">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>站点范围
          </el-col>
        </el-row>
        <el-row class="button_row" type="flex" justify="space-between">
          <el-col :span="5">
            <el-button size="mini">国家站</el-button>
          </el-col>
          <el-col :span="5">
            <el-button size="mini">基准站</el-button>
          </el-col>
        </el-row>
        <el-row class="title_row">
          <el-col :span="24">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>统计要素
          </el-col>
        </el-row>
        <el-row class="button_row" type="flex" justify="space-between">
          <el-col :span="4">
            <el-button size="mini">沙尘</el-button>
          </el-col>
          <el-col :span="5">
            <el-button size="mini">能见度</el-button>
          </el-col>
          <el-col :span="4">
            <el-button size="mini">风速</el-button>
          </el-col>
        </el-row>
        <el-row class="title_row">
          <el-col :span="24">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>时间范围
          </el-col>
        </el-row>
        <el-row class="button_row" type="flex" justify="space-between">
          <el-col :span="7">
            <el-button size="mini">前1年同期</el-button>
          </el-col>
          <el-col :span="7">
            <el-button size="mini">前2年同期</el-button>
          </el-col>
          <el-col :span="7">
            <el-button size="mini">前3年同期</el-button>
          </el-col>
        </el-row>
        <el-row class="button_row" type="flex" justify="space-between">
          <el-col :span="7">
            <el-button size="mini">前4年同期</el-button>
          </el-col>
          <el-col :span="7">
            <el-button size="mini">前5年同期</el-button>
          </el-col>
          <el-col :span="7">
            <el-button size="mini">自定义</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24"></el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="24">
            <el-tabs type="border-card">
              <el-tab-pane label="省">
                <el-row type="flex" justify="center" align="middle">
                  <el-col :span="4">战点:</el-col>
                  <el-col :span="10">
                    <dict-select v-model="dictChoose" :dict="$dict.PAY_MODE" class="mini_select"></dict-select>
                  </el-col>
                  <el-col :span="5">
                    <el-button size="mini" @click="add">添加</el-button>
                  </el-col>
                  <el-col :span="5">
                    <el-button size="mini">对比</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-input placeholder="请输入内容" class="site_search">
                      <el-button slot="append">搜索</el-button>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">站点列表</el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="site_list_box">
                    <!-- <el-tag
                      v-for="tag in tags"
                      :key="tag.name"
                      closable
                      :type="tag.type"
                    >{{tag.name}}</el-tag>-->
                    <el-button-group>
                      <el-button type="mini">RES</el-button>
                      <el-button type="mini" icon="el-icon-delete"></el-button>
                    </el-button-group>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="站"></el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>

        <!-- <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>-->
      </div>
    </div>
    <div :class="[isCollapseL ? showBarL : hiddenBarL ]">
      <div v-if="isCollapseL">
        <el-button
          type="primary"
          icon="fa fa-chevron-left"
          class="show_hidden_bar_button"
          @click="falseCollapseL"
        ></el-button>
      </div>
      <div v-else>
        <el-button
          type="primary"
          icon="fa fa-chevron-right"
          class="show_hidden_bar_button"
          @click="falseCollapseL"
        ></el-button>
      </div>
    </div>

    <div id="map" class="map"></div>

    <!-- <div class="testc">111</div> -->

    <!-- <div class="vue-leaflet">
        <l-map style="width: 100%; height: 600px;" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="marker">
            <l-popup :content="text"></l-popup>
          </l-marker>
        </l-map>
    </div>-->
    <div :class="[isCollapseR ? showBarR : hiddenBarR ]">
      <div v-if="isCollapseR">
        <el-button
          type="primary"
          icon="fa fa-chevron-right"
          class="show_hidden_bar_button"
          @click="falseCollapseR"
        ></el-button>
      </div>
      <div v-else>
        <el-button
          type="primary"
          icon="fa fa-chevron-left"
          class="show_hidden_bar_button"
          @click="falseCollapseR"
        ></el-button>
      </div>
    </div>
    <div class="right_bg" v-show="isCollapseR">right</div>
  </div>
</template>
<script>
import onedateSelect from "@/components/select/onedate-select";
import dictSelect from "@/components/select/dict-select";
//import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import lmap from "leaflet";

export default {
  components: { onedateSelect, dictSelect },
  data() {
    return {
      //leaflet
      // zoom: 13,
      // center: L.latLng(47.413220, -1.219482),
      // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // marker: L.latLng(47.413220, -1.219482),
      // text: 'this is a marker',

      //
      isCollapseL: true,
      isCollapseR: false,
      showBarL: "show_bar_left",
      hiddenBarL: "hidden_bar_left",
      showBarR: "show_bar_right",
      hiddenBarR: "hidden_bar_right",
      startDateSelect: "",
      dictChoose: "",
      map: {}
    };
  },
  mounted() {
    this.map = lmap
      .map("map", {
        fadeAnimation: false
      })
      .setView([37, 105], 4);

    // Product.map = this.map;
    var url1 =
      "http://t1.tianditu.com/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}";
    var url2 =
      "http://webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}";
    lmap
      .tileLayer(url2, {
        subdomains: ["01", "02", "03", "04"]
      })
      .addTo(this.map);
  },
  created() {
    //this.map.reload;
  },
  methods: {
    falseCollapseL() {
      //console.log(this)
      //this.isCollapse = this.isCollapse;
      if (this.isCollapseL) {
        this.isCollapseL = false;
      } else {
        this.isCollapseL = true;
      }
    },
    falseCollapseR() {
      //console.log(this)
      //this.isCollapse = this.isCollapse;
      if (this.isCollapseR) {
        this.isCollapseR = false;
      } else {
        this.isCollapseR = true;
      }
    },
    add() {
      console.log(this.startDateSelect);
      console.log(this.dictChoose);
    }
  }
};
</script>

<style lang="less">
@import url("../../style/style.less");
.testcolor {
  background-color: @baseBgColorDark / 2;
}
/**
整体
*/
.main_div {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;

  /**
  左边导航栏
  */

  .left_bg {
    flex: 0 0 @baseLeftWidth;
    height: 100%;
    background-color: @baseBgColorDark;
    .title_row {
      padding: 5px 10px;
    }
    .button_row {
      padding: 0px 10px;
      div {
        width: 100%;
        .el-button {
          padding: 5px;
          width: 100%;
        }
      }
    }
    .el-row {
      height: 35px;
      line-height: 16px;
      font-size: 10px;
    }
  }

  /**
  右边导航
  */

  .right_bg {
    flex: 0 0 @baseLeftWidth;
    background-color: @baseBgColorDark;
  }

  /**
  隐藏按钮
  */
  .show_hidden_base {
    position: absolute;
    top: 50%;
    z-index: 1000;
  }
  /** 左*/
  .show_bar_left {
    .show_hidden_base;
    left: @baseLeftWidth;
  }
  .hidden_bar_left {
    .show_hidden_base;
    left: 0px;
  }
  /** 右*/
  .show_bar_right {
    .show_hidden_base;
    right: @baseLeftWidth;
  }
  .hidden_bar_right {
    .show_hidden_base;
    right: 0px;
  }
  .show_hidden_bar_button {
    background: none;
    border: none;
    i {
      color: @baseBgColorLight;
      font-size: 30px;
    }
    &:hover {
      background: none;
      border: none;
      i {
        color: @baseBgColorDark;
        font-size: 30px;
      }
    }
  }

  /**
  地图层
  */
  .map {
    flex: 1;
    widows: 100%;
    height: 100%;
  }
}

/**
省站选项卡
*/
.el-tabs--border-card {
  border: none !important;
  box-shadow: none !important;
  background-color: @baseBgColorBox !important;
}
.el-tabs {
  background-color: @baseBgColorBox;
  border: none;
  margin: 10px;
  box-shadow: none;
  .el-tabs__header {
    background-color: @baseBgColorDark;
    border: none;
    .is-top {
      background-color: none;
      border: none;
      color: @baseFontColorWhite;
      .el-tabs__item {
        background-color: @baseBgColorLight;
        &:hover {
          //background-color: @baseBgColorBox;
          color: @baseFontColorWhite;
        }
      }
      .is-active {
        background-color: @baseBgColorBox;
        color: @baseFontColorWhite;
        &:hover {
        }
      }
    }
  }
  //内容部分
  .el-row {
    height: 40px;
    line-height: 16px;
    .site_list_box {
      background-color: @baseBgColorLight;
      padding: 10px;
      margin-top: -10px;
      .el-button {
        background-color: #e8d173;
        border: none;
        padding: 3px;
      }
    }
    /**
    下拉框
    */
    .mini_select {
      .el-input__inner {
        height: 28px;
        font-size: 10px;
        box-shadow: 1px;
        border: none;
        background-color: @baseBgColorLight;
        color: @baseFontColorWhite;
        .el-input__suffix {
          color: @baseFontColorWhite;
          background-color: @baseBgColorWhite;
        }
      }
    }
    /**
    搜索框
    */
    .site_search {
      .el-input__inner {
        height: 28px;
        font-size: 10px;
        box-shadow: 1px;
        border: none;
        background-color: @baseBgColorLight;
        color: @baseFontColorWhite;
      }
    }
  }
}
</style>
