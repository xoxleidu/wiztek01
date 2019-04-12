<template>
  <el-select
    v-model="selectModel"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="(queryString)=>{
        remoteMethod(queryString, allSelectList);
    }"
  >
    <el-option-group
      v-for="group in multipleSelectOption"
      :key="group.name"
      :label="group.name"
      @click.native="checkAll(group.name)"
    >
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      ></el-option>
    </el-option-group>
  </el-select>
</template>
 
<script>
//import provinceCity from '../../../static/json/provinceCity.json'
export default {
  data() {
    return {
      selectList: [
        {
          name: "11", //一级名称
          CName: "22", //二级名称
          value: "11" //值
        },
        { name: "22", CName: "33", value: "22" }
      ],
      selectModel: [],
      multipleSelectOption: []
    };
  },
  methods: {
    //将源数据转成element所需格式
    transMultipleSelectOption() {
      var level1List = Enumerable.from(this.allSelectList)
        .distinct("o=>o.name")
        .toArray();

      var newArr = level1List.map(item => {
        let children = Enumerable.from(this.allSelectList)
          .where(o => {
            return o.name == item.name;
          })
          .toArray();

        var options = children.map(itemc => {
          return { name: itemc.CName, value: itemc.value };
        });
        return { name: item.name, options: options };
      });
      this.multipleSelectOption = newArr;
    },
    //重置options(select自动补全相关)
    remoteMethod(queryString, lists) {
      //lists:原始数据
      var mappedList = Enumerable.from(lists)
        .where(o => {
          return (
            o.CName.indexOf(queryString) != -1 ||
            o.name.indexOf(queryString) != -1
          );
        })
        .toArray(); //找出匹配搜索关键字的数据集
      var level1List = Enumerable.from(mappedList)
        .distinct("o=>o.name")
        .toArray(); //从所匹配的数据集中找出所有一级菜单集合（含去重）
      //重新拼成element所需的数据格式
      var newArr = level1List.map(item => {
        let children = Enumerable.from(mappedList)
          .where(o => {
            return o.name == item.name;
          })
          .toArray();

        var options = children.map(itemc => {
          return { name: itemc.CName, value: itemc.value };
        });
        return { name: item.name, options: options };
      });
      this.multipleSelectOption = newArr;
    },
    //点击一级菜单全选/全不选实现
    checkAll(value) {
      //value: 点击的一级name
      var list = Enumerable.from(this.multipleSelectOption)
        .where(o => {
          return o.name == value;
        })
        .toArray();
      var level2ValueList = Enumerable.from(list[0].options)
        .select("o=>o.value")
        .toArray(); //所有该一级下二级的value集合

      var num = 0;
      level2ValueList.forEach(value => {
        this.selectModel2.forEach((model, index) => {
          if (model == value) {
            this.selectModel2.splice(index, 1); //如有匹配，先删除
            num++;
            return true;
          }
        });
      });

      if (num < level2ValueList.length) {
        //需要全选
        this.selectModel2 = this.selectModel2.concat(level2ValueList); //合并数组
      }
    }
  },
  mounted: function() {
    this.transMultipleSelectOption();
  }
};
</script>
 
<style lang="less" scoped>
</style>