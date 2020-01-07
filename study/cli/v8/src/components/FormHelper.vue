<template>
  <div>
    <h1>slot</h1>
    <!-- 接受父组件标签传递 -->
    <slot name="hh"></slot>
    <slot name="mm"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scopet>
h2 {
  background: lightgreen;
}
</style>
