<template>
  <div id="app">
    <!-- 传递标签 对方slot接受 -->
    <FormHelper>
      <h2 slot="hh">传标签</h2>
      <!-- 不写slot="**" 则对方直接slot标签接受即可不用加slot name="**" -->
      <p slot="mm">内容</p>
    </FormHelper>
  </div>
</template>

<script>
import FormHelper from "./components/FormHelper";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    FormHelper
  },
  methods: {}
};
</script>

<style>
</style>
