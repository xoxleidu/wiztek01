<template>
  <div>
    <router-view v-if="$route.path!='/user/list'"></router-view>
    <div v-if="$route.path=='/user/list'">
      <router-link :to="'/user/list/info'">User</router-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style>
</style>