import XLSX from "xlsx";

export default {
  exportExcel({ data, sheetName, fileName }) {
    var ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, fileName);
  },
  downloadFile(fileName, url) {
    var iframe = document.getElementById("downloadiframe");
    iframe = iframe ? iframe : document.createElement("iframe");
    iframe.id = "downloadiframe";
    iframe.src = url;
    iframe.addEventListener("load", function() {
      iframe.remove();
    });
    document.body.appendChild(iframe);
  },
  timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = date.getDate() + " ";
    var h = date.getHours() + ":";
    var m = date.getMinutes() + ":";
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  },
  callResponse(vm, res) {
    vm.loading = false;
    if (res.data.code == 0) {
      vm.$emit("success");
      vm.$emit("end");
      vm.$message({ message: res.data.msg, type: "success" });
    } else {
      vm.$message({ message: res.data.msg, type: "error" });
    }
  },
  //返回比较两个数组不同的值
  getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function(v, i, arr) {
      return arr.indexOf(v) === arr.lastIndexOf(v);
    });
  },
  //返回两个数组相同的值
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
  browserStr: function() {
    return navigator.userAgent;
  },
  browserType: function() {
    //只返回浏览器名称
    if (this.browserStr().match("Chrome")) {
      return "Chrome";
    } else if (this.browserStr().match("Firefox")) {
      return "Firefox";
    } else if (this.browserStr().match("MSIE")) {
      return "IE";
    } else if (this.browserStr().match("Safari")) {
      return "Safari";
    } else if (this.browserStr().match("Opera")) {
      return "Opera";
    }
  },
  browserVersion: function() {
    //返回浏览器名称和版本号,如：["Chrome/31.0.1650.63"]，是一个数组类型
    var regChrome = /chrome\/[\d.]+/gi;
    var regFF = /firefox\/[\d.]+/gi;
    var regIE = /msie [\d.]+;/gi;
    var regSafari = /safari\/[\d.]+/gi;
    var regOpera = /Opera\/[\d.]+/gi;
    switch (this.browserType()) {
      case "Chrome":
        return this.browserStr().match(regChrome);
        break;
      case "Firefox":
        return this.browserStr().match(regFF);
        break;
      case "IE":
        return this.browserStr().match(regIE);
        break;
      case "Safari":
        return this.browserStr().match(regSafari);
        break;
      case "Opera":
        return this.browserStr().match(regOpera);
        break;
      default:
        return "我的天呐~~~,您这是啥浏览器啊???该换个浏览器了!!!"
    }
  }
};
