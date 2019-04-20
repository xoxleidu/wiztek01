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
  }
};
