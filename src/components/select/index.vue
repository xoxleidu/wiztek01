<template>
  <div>
    <dict-select class="base-select" v-model="tableQuery.thistype" :dict="$dict.PAY_MODE"></dict-select>
    {{tableQuery.thistype}}
    <br>
    <upload v-model="tableQuery.imgUrl"></upload>
    {{tableQuery.imgUrl}}
    <br>
    <editor :catchData="catchData"></editor>
    <br>
    {{content}}
  </div>
</template>
<script>
import dictSelect from "@/components/select/dict-select";
import upload from "@/components/upload/upload";
import editor from "@/components/editor/editor";
export default {
  components: { dictSelect, upload, editor },
  data() {
    return {
      tableQuery: {},
      content: ''
    };
  },
  methods: {
    catchData(value) {
      this.content = value; //在这里接受子组件传过来的参数，赋值给data里的参数
    }
  }
};
</script>

