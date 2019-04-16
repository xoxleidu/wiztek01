<template>
  <div class="main_div">
    <!-- 左侧面板 -->
    <div class="left_bg" v-show="isCollapseL">
      <div class="panel">
        <crudPanel
          v-model="radioChecked1"
          title="实况预测"
          :optionsData="rawData.live"
          @propanelData="propanelData1"
        ></crudPanel>
      </div>
      <div class="panel">
        <crudPanel
          v-model="radioChecked2"
          title="NCEP"
          :optionsData="rawData.ncep"
          @propanelData="propanelData2"
        ></crudPanel>
      </div>
      <div class="panel">
        <crudPanel
          v-model="radioChecked3"
          title="ECMWF"
          :optionsData="rawData.ecmwf"
          @propanelData="propanelData3"
        ></crudPanel>
      </div>
      <div class="panel">
        <crudPanel
          v-model="radioChecked4"
          title="GRAPS"
          :optionsData="rawData.graps"
          @propanelData="propanelData4"
        ></crudPanel>
      </div>
      <div class="panel">
        <crudPanel
          v-model="radioChecked5"
          title="植被覆盖"
          :optionsData="rawData.trees"
          @propanelData="propanelData5"
        ></crudPanel>
      </div>
      <div class="panel">
        <dateHoursOne v-model="testdate"></dateHoursOne>
      </div>
      <!-- <div class="panel">
        <crudPanel v-model="radioChecked" title="模式预报" :optionsData="rawData.trees"></crudPanel>
      </div>-->
      <!-- <div class="panel">
        <crudPanel v-model="radioChecked['zbfg']" title="植被覆盖"></crudPanel>
      </div>-->
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

    <div id="map" class="map">
      <div class="progerss">
        <progerssBar :min="0" :max="24" v-model="progerssData"></progerssBar>
      </div>
    </div>

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
      <!-- <proPanel v-model="proPanelChecked" v-on:optionsPanel="propanelData"></proPanel> -->
      <proPanel :optionsPanel="propanelDatas"></proPanel>
    </div>
    <!-- 右侧面板 -->
  </div>
</template>
<script>
import lmap from "leaflet";
import crudPanel from "@/components/panel/crudPanel";
import proPanel from "@/components/panel/proPanel";
import dateHoursOne from "@/components/select/dateHoursOne";
import progerssBar from "@/components/progerss/progerssBar";
import jsonData from "@/pages/json/button.json";
import { buttonData } from "@/api/index";
export default {
  components: { crudPanel, proPanel, dateHoursOne, progerssBar },
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
      tempData:[],
      rawData: [],
      radioSwitch: [],
      radioChecked: [],
      radioChecked1: [],
      radioChecked2: [],
      radioChecked3: [],
      radioChecked4: [],
      radioChecked5: [],
      optionsPanel: [],
      propanelDatas: [],
      //选择时间
      testdate: "",
      //播放条
      progerssData: 0
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
  created() {
    let data = [
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
        url: "/home2",
        isShow: false,
        children: [
          {
            pid: 2,
            id: 21,
            isShow: true,
            label: "name22",
            url: "/home22"
          }
        ]
      }
    ];
    let data2 = [
      {
        pid: 0,
        id: 1,
        label: "tree1",
        url: "/home1",
        isShow: false,
        children: [
          {
            pid: 1,
            id: 11,
            isShow: true,
            label: "tree11",
            url: "/home11"
          }
        ]
      },
      {
        pid: 0,
        id: 2,
        label: "tree2",
        url: "/home2",
        isShow: false,
        children: [
          {
            pid: 2,
            id: 21,
            isShow: true,
            label: "tree22",
            url: "/home22"
          }
        ]
      }
    ];
    this.rawData = {
      live: data2,
      ncep: data2,
      ecmwf: data2,
      graps: data2,
      trees: data2
    };
// async funA(){
//         var res =  await axios.post('')//这里的res就是你axios请求回来的结果了
//     }
      buttonData().then(e => {
        console.log(e)
        this.rawData.live = e.data;
        this.tempData.push(this.rawData)
      });

    // loginOut(context) {
    //   return new Promise(resolve => {
    //     context.commit("clearPanelButtonState");
    //     resolve();
    //   });
    // }
  },
  //监听数据变化
  watch: {
    rawData() {
      
    },
    radioChecked1(v) {
      this.radioCheckedOver(v);
    },
    radioChecked2(v) {
      this.radioCheckedOver(v);
    }
    // progerssData(v) {
    //   console.log(this.progerssData)
    // }
  },
  methods: {
    radioCheckedOver(v) {
      console.log("开关");
      console.log(v);
      if (v.length) {
        v.forEach(e => {
          this.radioChecked.push(e);
        });
        this.radioChecked = this.uniqArr(this.radioChecked);
      }
      console.log(this.radioChecked);
      console.log("开关");
      if (!!this.radioChecked1.length || !!this.radioChecked2.length) {
        this.isCollapseR = true;
      } else {
        this.isCollapseR = false;
        this.optionsPanel = [];
        this.radioChecked = [];
      }
    },
    propanelData1(val) {
      this.propanelData(val);
    },
    propanelData2(val) {
      this.propanelData(val);
    },
    propanelData3(val) {
      this.propanelData(val);
    },
    propanelData4(val) {
      this.propanelData(val);
    },
    propanelData5(val) {
      this.propanelData(val);
    },
    propanelData(val) {
      if (val.isShow) {
        this.propanelDatas.push(val);
      } else {
        this.propanelDatas = this.propanelDatas.filter(element => {
          if (val.label != element.label) {
            return true;
          }
        });
      }
    },
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
    uniqArr(array) {
      var temp = [];
      var index = [];
      var l = array.length;
      for (var i = 0; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
          if (array[i] === array[j]) {
            i++;
            j = i;
          }
        }
        temp.push(array[i]);
        index.push(i);
      }
      //console.log(index);
      return temp;
    },
    uniqArrObject(array) {
      var obj = {};
      var arr = array.reduce(function(item, next) {
        obj[next.key] ? "" : (obj[next.key] = true && item.push(next));
        return item;
      }, []);
      return arr;
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
播放条
*/
.progerss {
  position: absolute;
  bottom: 5%;
  left: 5%;
  background-color: #000000;
  background-color: rgba(0, 0, 0, 0.2);
  width: 90%;
  z-index: 9999;
  padding: 10px;
}

/**
选项卡
*/
</style>
