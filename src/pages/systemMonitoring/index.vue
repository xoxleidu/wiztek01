<template>
  <div class="testEC">
    <div class="button_main">
      <el-button type="primary" :loading="buttonLoad" @click="drawPie">换图</el-button>
      <el-button type="primary" @click="reloadMain">刷新</el-button>
    </div>
    <div class="echarts_main">
      <div id="echartsMain" class="ec_div"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      //按钮loading
      buttonLoad: false,
      echartsMap: {},
      //柱状图参数
      optionA: {
        title: { text: "使用echarts" },
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "2015", "2016", "2017"],
            ["Matcha Latte", 43.3, 85.8, 93.7],
            ["Milk Tea", 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 86.4, 65.2, 82.5],
            ["Walnut Brownie", 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      },
      //饼状图参数
      optionB: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: [
            "直达",
            "营销广告",
            "搜索引擎",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "百度",
            "谷歌",
            "必应",
            "其他"
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              normal: {
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直达", selected: true },
              { value: 679, name: "营销广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          },
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "60%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 335, name: "直达" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1048, name: "百度" },
              { value: 251, name: "谷歌" },
              { value: 147, name: "必应" },
              { value: 102, name: "其他" }
            ]
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    //全屏LOADING
    //utils下base文件定义全局字典
    let os = this.$dict.loadFullscreen;
    let ds = this.$loading(os);
    setTimeout(() => {
      this.drawLine();
      ds.close();
    }, 3000);
  },
  methods: {
    drawLine() {
      this.buttonLoad = true;
      //this.echartsMap = {};
      // 基于准备好的dom，初始化echarts实例
      this.echartsMap = echarts.init(document.getElementById("echartsMain"));
      // 绘制图表
      this.echartsMap.setOption(this.optionA);
      this.buttonLoad = false;
    },
    drawPie() {
      this.buttonLoad = true;
      setTimeout(() => {
        this.echartsMap.dispose();
        this.echartsMap = echarts.init(document.getElementById("echartsMain"));
        this.echartsMap.setOption(this.optionB);
        this.buttonLoad = false;
      }, 1000);
    },
    reloadMain() {
      location.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.testEC {
  width: 100%;
  .button_main {
    margin: 40px auto;
    width: 60%;
    text-align: center;
  }
  .echarts_main {
    margin: auto;
    width: 60%;
    height: 400px;
    .ec_div {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
