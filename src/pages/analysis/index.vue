<template>
  <el-container class="container-body">
    <el-aside class="leftbg" v-if="isCollapse">
      <div class="analysis-left-div">
        <el-row class="title-row">
          <el-col :span="24">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>数据类型
          </el-col>
        </el-row>
        <el-row class="button-row" type="flex" justify="start">
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
        <el-row class="title-row">
          <el-col :span="24">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>时间类型
          </el-col>
        </el-row>
        <el-row class="button-row" type="flex" justify="start">
          <el-col :span="7">
            <el-button size="mini">逐小时数据</el-button>
          </el-col>
          <el-col :span="7">
            <el-button size="mini">逐3小时数据</el-button>
          </el-col>
        </el-row>
        <el-row class="title-row">
          <el-col :span="24">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>站点范围
          </el-col>
        </el-row>
        <el-row class="button-row" type="flex" justify="start">
          <el-col :span="5">
            <el-button size="mini">国家站</el-button>
          </el-col>
          <el-col :span="5">
            <el-button size="mini">基准站</el-button>
          </el-col>
        </el-row>
        <el-row class="title-row">
          <el-col :span="24">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>统计要素
          </el-col>
        </el-row>
        <el-row class="button-row" type="flex" justify="start">
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
        <el-row class="title-row">
          <el-col :span="24">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>时间范围
          </el-col>
        </el-row>
        <el-row class="button-row" type="flex" justify="start">
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
        <el-row class="button-row" type="flex" justify="start">
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
                    <dict-select v-model="dictChoose" :dict="$dict.PAY_MODE" class="mini-select"></dict-select>
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
                    <el-input placeholder="请输入内容" class="site-search">
                      <el-button slot="append">搜索</el-button>
                    </el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">站点列表</el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="site-list-box">
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
    </el-aside>
    <el-main>
      <div class="show-hidden-bar-div">
        <el-button
          type="primary"
          icon="fa fa-chevron-left"
          class="show-hidden-bar-button"
          @click="falseCollapse"
        ></el-button>
      </div>
      <div id="map"></div>
      <!-- <div class="vue-leaflet">
        <l-map style="width: 100%; height: 600px;" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="marker">
            <l-popup :content="text"></l-popup>
          </l-marker>
        </l-map>
      </div>-->
    </el-main>
    <el-aside class="rigbg" v-if="false">right</el-aside>
  </el-container>
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
      isCollapse: true,
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
  created() {},
  methods: {
    falseCollapse() {
      if (this.isCollapse) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
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
#map {
  height: 100%;
}
/**
整体
*/
.el-container {
  .el-main {
    padding: 0px;
    margin: 0px;
    position: relative;
    .show-hidden-bar-div {
      position: absolute;
      top: 50%;
      left: 0px;
      z-index: 1000;
      .show-hidden-bar-button {
        background: none;
        border: none;
        i {
          color: #5f9ed1;
          font-size: 30px;
        }
      }
      .show-hidden-bar-button {
        background: none;
        border: none;
        i {
          color: #005590;
          font-size: 30px;
        }
      }
    }
  }
}

/**
左边导航栏
*/
.leftbg {
  width: 230px;
  background-color: #005590;
  .title-row {
    padding: 5px 10px;
  }
  .button-row {
    padding: 0px 10px;
  }
  .el-row {
    height: 35px;
    line-height: 16px;
    font-size: 10px;
  }
}
/**
省站选项卡
*/
.el-tabs {
  background-color: #78b1de;
  .el-row {
    height: 40px;
    line-height: 16px;
    .site-list-box {
      background-color: #5f9ed1;
      padding: 10px;
      margin-top: -10px;
      .el-button {
        background-color: #e8d173;
        border: none;
        padding: 3px;
      }
    }
  }
}
/**
右边导航栏
*/
.rigbg {
  background-color: #005590;
}
/**
下拉框
*/
.mini-select {
  .el-input__inner {
    height: 28px;
    font-size: 10px;
    box-shadow: 1px;
    border: none;
    background-color: #5f9ed1;
    color: #fff;
    .el-input__suffix {
      color: #fff;
      background-color: #fff;
    }
  }
}
/**
搜索框
*/
.site-search {
  .el-input__inner {
    height: 28px;
    font-size: 10px;
    box-shadow: 1px;
    border: none;
    background-color: #5f9ed1;
    color: #fff;
  }
}
</style>
