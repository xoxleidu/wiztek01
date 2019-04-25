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
      <div>
        <el-button type="text" v-for="b in options" :key="b.id">{{b.label}}</el-button>
      </div>
      <div>
        <el-radio-group v-model="radioCity" size="mini">
          <el-radio-button label="conts">按大洲</el-radio-button>
          <el-radio-button label="citys">按城市</el-radio-button>
        </el-radio-group>
        <el-select
          v-model="toolSelectSearch"
          filterable
          remote
          placeholder="请输入关键词"
          :remote-method="handleRemoteMethod"
          :loading="selectSearchLoading"
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <el-button type="text" v-for="o in abcItem" :key="o">{{o}}</el-button>
      </div>
      <hr>
      <el-row :gutter="5">
        <el-col :span="3" class="list_sup">D</el-col>
        <el-col :span="5" class="list_int">
          <el-button type="text">大洋洲:</el-button>
        </el-col>
        <el-col :span="16" class="list_low">
          <el-button type="text" v-for="b in options" :key="b.id">{{b.label}}</el-button>
        </el-col>
      </el-row>
      <!-- <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="selectCity = false">取消</el-button>
        <el-button type="primary" size="mini" @click="selectCity = false">确定</el-button>
      </div>-->
    </el-popover>
    <el-popover ref="selectMapStyle" placement="bottom-start" width="270" v-model="selectMapStyle">
      <div class="mapStyleImg_div">
        <div class="mapStyleImg" v-for="item in aMapStyle" :key="item.id">
          <img :src="item.url">
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectSearchLoading: false,
      toolSelectSearch: "",
      options: [
        {
          id: "1",
          value: "选项1",
          label: "黄金糕"
        },
        {
          id: "2",
          value: "选项2",
          label: "双皮奶"
        }
      ],
      radioCity: "conts",
      selectCity: true,
      selectMapStyle: false,
      aMapStyle: [
        {
          id: "1",
          name: "灰色",
          url: "/static/mapStyle/01.jpg"
        },
        {
          id: "2",
          name: "彩色",
          url: "/static/mapStyle/02.jpg"
        },
        {
          id: "3",
          name: "红色",
          url: "/static/mapStyle/03.jpg"
        },
        {
          id: "4",
          name: "绿色",
          url: "/static/mapStyle/04.jpg"
        }
      ],
      abcItem: ["A", "B", "C", "D", "E", "F", "G"]
    };
  },
  methods: {
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
.el-row,
.el-col {
  padding: 0px;
  margin: 0px;
}
.list_sup {
  font-size: 28px;
}
</style>
