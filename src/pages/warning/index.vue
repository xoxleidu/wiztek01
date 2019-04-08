<template>
  <div class="map-div">
    <div class="left" v-show="isccc"></div>
    <div :class="[isccc ? butt1 : butt2 ]" @click="isddd">1</div>
    <div id="map" class="main"></div>
  </div>
</template>
<style lang="less">
@import url("../../style/style");
.map-div {
  position: relative;
  widows: 100%;
  height: 100%;
  display: flex;
  .left {
    flex: 0 0 @baseLeftWidth;
    background-color: #424242;
    min-height: 100%;
  }
  .butt {
      z-index: 1100;
      position: absolute;
      top:50%;
      left: @baseLeftWidth;
      width: 20px;
      height: 20px;
      background-color: aquamarine;
  }
  .buttone {
      z-index: 1100;
      position: absolute;
      top:50%;
      left: 0px;
      width: 20px;
      height: 20px;
      background-color: aquamarine;
  }
  .main {
    flex: 1;
    widows: 100%;
    height: 100%;
  }
}

#map {
}
</style>

<script>
import lmap from "leaflet";
export default {
  data() {
    return {
        isccc:true,
        butt1:"butt",
        butt2:"buttone"
    };
  },
  methods: {
    isddd() {
        if (this.isccc) {
        this.isccc = false;
        
      } else {
        this.isccc = true;
      }
    }
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
  }
};
</script>
