<template>
  <div class="main_div">
    <!-- 左侧面板 -->
    <div class="left_bg" v-show="isCollapseL">
      <div class="panel">
        <crudPanel v-model="crudData"></crudPanel>
      </div>
    </div>
    <!-- 左侧面板 -->
    <!-- 左侧隐藏按钮 -->
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
    <!-- 左侧隐藏按钮 -->

    <div id="map" class="map"></div>

    <!-- 右侧隐藏按钮 -->
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
    <!-- 右侧隐藏按钮 -->
    <!-- 右侧面板 -->
    <div class="right_bg" v-show="isCollapseR">
      <proPanel></proPanel>
    </div>
    <!-- 右侧面板 -->
  </div>
</template>
<script>
import lmap from "leaflet";
import crudPanel from "@/components/panel/crudPanel";
import proPanel from "@/components/panel/proPanel";
export default {
  components: { crudPanel, proPanel },
  data() {
    return {
      //隐藏按钮数据
      isCollapseL: false,
      isCollapseR: false,
      showBarL: "show_bar_left",
      hiddenBarL: "hidden_bar_left",
      showBarR: "show_bar_right",
      hiddenBarR: "hidden_bar_right",
      //地图数据
      map: {},
      //
      crudData: ""
    };
  },
  mounted() {
    //地图初始化
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

    this.isCollapseL = true;
  },
  created() {},
  //监听数据变化
  watch: {
    crudData(v) {
      if (!!v.length) {
        this.isCollapseR = true;
      } else {
        this.isCollapseR = false;
      }
    }
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
    }
  }
};
</script>

<style lang="less">
@import url("../../style/style.less");

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
    flex-grow: 1;
    width: 100%;
    height: 100%;
  }
}

/**
选项卡
*/
</style>
