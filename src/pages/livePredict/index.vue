<template>
  <div class="main_div">
    <!-- 左侧面板 -->
    <div class="left_bg" v-show="isCollapseL">
      <crudPanel
        title="实况预测"
        :optionsData="_oPanelData.live"
        @radioData="propanelData"
        ref="pbFunction_live"
      ></crudPanel>
      <crudPanel
        title="NCEP"
        :optionsData="_oPanelData.ncep"
        @radioData="propanelData"
        ref="pbFunction_ncep"
      ></crudPanel>
      <crudPanel
        title="ECMWF"
        :optionsData="_oPanelData.ecmwf"
        @radioData="propanelData"
        ref="pbFunction_ecmwf"
      ></crudPanel>
      <crudPanel
        title="GRAPS"
        :optionsData="_oPanelData.graps"
        @radioData="propanelData"
        ref="pbFunction_graps"
      ></crudPanel>
      <crudPanel
        title="植被覆盖"
        :optionsData="_oPanelData.trees"
        @radioData="propanelData"
        ref="pbFunction_trees"
      ></crudPanel>
      <div class="panel">
        <dateHoursOne v-model="testdate"></dateHoursOne>
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
      <proPanel v-model="propanelId" :optionsPanel="propanelDatas"></proPanel>
    </div>
    <!-- 右侧面板 -->
  </div>
</template>
<script>
  import lmap from "leaflet";
  import crudPanel from "@/components/panel/crudPanel";
  import proPanel from "@/components/panel/proPanel";
  import dateHoursOne from "@/components/select/dateHoursOne";
  import progerssBar from "@/components/panel/progerssBar";
  import jsonData from "@/pages/json/button.json";
  import { mapState } from "vuex";
  import {getlonlat} from "@/api/index";
  import  "../../../static/leaflet/L.CanvasLayer";
  import canvase from "../../../static/leaflet/L.Grid";
  import { Message } from "element-ui";
  import NProgress from "nprogress";
  import * as d3 from "d3";

  import { buttonData, buttonData2, getJsonFile } from "@/api/index";
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
        //面板数据
        _oPanelData: { live: [], ncep: [], ecmwf: [], graps: [], trees: [] },
        propanelDatas: [],
        propanelId: "",
        //选择时间
        testdate: "",
        //播放条
        progerssData: 0
      };
    },
    mounted() {
      //地图初始化
      //地图初始化
      this.map = lmap
        .map("map", {
          fadeAnimation: false
        })
        .setView([37, 105], 4);

      // Product.map = this.map;
      var url1 =
        "http://10.1.64.154/ter_w/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=ter&style=&tilematrixSet=w&format=tiles&transparent=false&height=256&width=256&srs=EPSG%3A3857&tilematrix={z}&tilerow={y}&tilecol={x}";
      var url2 =
        "http://webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}";
      lmap
        .tileLayer(url2, {
          subdomains: ["01", "02", "03", "04"]
        })
        .addTo(this.map);

      this.isCollapseL = true;
      var colors=[[-3,0,0,235],[-2,82,82,255],[-1,143,143,255],[0,204,204,255],[1,255,133,133],
        [2,255,102,102],[3,255,10,10]];
      var latlon=null;
      getlonlat().then(e=>{
        console.log(e.data)
        latlon=e.data;
        var configdata={latlondata:latlon,isabs:false,mpstep:100};
        console.log(window);
        canvase.canvase(configdata,colors,this.map,window,0.3);

        //画等值线
        var prod = "msl";
        var data = latlon;
        var n = data.ny, m = data.nx, values = new Array(n * m);
        for (var y = 0; y < n; y++) {
          for (var x = 0; x < m; x++) {
            values[y * m + x] = data.data[y][x];
          }
        }

        var contours = d3.contours()
          .size([m, n])
          .thresholds([-20, -15, -10, 0, 5, 10, 15, 20, 25, 30])
          .smooth(true)
          (values);

        for (var i = 0; i < contours.length; i++) {
          for (var j = 0; j < contours[i].coordinates.length; j++) {
            for (var k = 0; k < contours[i].coordinates[j].length; k++) {
              for (var m = 0; m < contours[i].coordinates[j][k].length; m++) {
                contours[i].coordinates[j][k][m][0] = contours[i].coordinates[j][k][m][0] *0.25;
                contours[i].coordinates[j][k][m][1] = 90-contours[i].coordinates[j][k][m][1]*0.25;
              }
            }
          }
        }
        L.geoJSON(contours, {
          style: function (feature) {
            var v = feature.geometry.value;
            var c = "black";

            return { "fill": false, stroke: true, weight: 0.8, color: c };
          },
          smoothFactor: 0.3

        }).addTo(this.map);
      })

      this.isCollapseL = true;

      //调用子组件方法
      // if (this._oPanelData.live.length) {
      //   this.$refs.panelFunction.initPanelData("haha");
      // }

      NProgress.inc();

      if (!this._oPanelData.live) {
        // Message({
        //   showClose: true,
        //   message: "信息丢失，重新登录",
        //   type: "error"
        // });
        this.$message({
          type: "error",
          message: "信息丢失，重新登录!"
        });
        this.$router.replace({ path: "/login" });
        // if (document.referrer) {
        //   location.href = document.referrer;
        // } else {
        //   this.$router.replace({ name: "/login" });
        //   // location.reload();
        // }
        // this.$nextTick(() => {
        //   this.initData();
        // });
        //location.reload();
      }
      NProgress.done();
    },
    created() {
      /**
       *
       live: [],
       ncep: [],
       ecmwf: [],
       graps: [],
       trees: []
       */

      this._oPanelData = {
        live: [],
        ncep: [],
        ecmwf: [],
        graps: [],
        trees: []
      };

      // this.$store.dispatch("loginOut").then(() => {
      //     this.$router.replace({ path: "login" });
      //   });

      this.$store.dispatch("actPanelButtonState");
      //this.apiData();
      this.initData();
      this.initProData();
    },
    //监听数据变化
    watch: {
      propanelId(item) {
        switch (item.pid) {
          case "live":
            this.$refs.pbFunction_live.proPanelClose(item);
            break;
          case "ncep":
            this.$refs.pbFunction_ncep.proPanelClose(item);
            break;
          case "ecmwf":
            this.$refs.pbFunction_ecmwf.proPanelClose(item);
            break;
          case "graps":
            this.$refs.pbFunction_graps.proPanelClose(item);
            break;
          case "trees":
            this.$refs.pbFunction_trees.proPanelClose(item);
            break;
          default:
            this.$message({
              type: "error",
              message: "没有对象"
            });
        }
      },

      propanelDatas() {
        if (!this.propanelDatas.length) {
          this.isCollapseR = false;
        } else {
          this.isCollapseR = true;
        }
      }
    },
    //页面渲染完成
    computed: {
      ...mapState(["LOADING"])
    },
    updated() {},
    methods: {
      //async await
      initData() {
        this.$store.commit("showLoading");
        //this._oPanelData = Object.assign({}, this.$store.getters.liveDatas);
        this._oPanelData = Object.assign({}, jsonData);
        //this.$set(this._oPanelData, "live", this.$store.getters.liveDatas);

        console.log("store原始数据", this._oPanelData);
        this.$store.commit("hideLoading");
      },
      initProData() {
        for (var i in this._oPanelData) {
          this._oPanelData[i].forEach(element => {
            if (element.show) {
              this.propanelDatas.push(element);
              if (element.children.show) {
              }
            }
          });
        }
      },
      apiData() {
        getJsonFile().then(res => {
          //this.$set(this._oPanelData, "live", res.data.live);
          console.log("api数据", res);
        });
      },

      propanelData(show, item) {
        if (show) {
          this.propanelDatas.push(item);
        } else {
          this.propanelDatas = this.propanelDatas.filter(element => {
            if (item.id != element.id) {
              return true;
            }
          });
        }
      },
      falseCollapseL() {
        if (this.isCollapseL) {
          this.isCollapseL = false;
        } else {
          this.isCollapseL = true;
        }
      },
      falseCollapseR() {
        if (this.isCollapseR) {
          this.isCollapseR = false;
        } else {
          this.isCollapseR = true;
        }
      }
    },
    beforeDestroy() {
      console.log("before");
    },
    destroyed() {
      console.log("over");
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
    .display_base;

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
      flex-grow: 0;
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
