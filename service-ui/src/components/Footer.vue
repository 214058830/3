<template>
  <div class="layout">
    <div class="layout-copy">
      <p>&copy; 2020 studyVueBeego.com 水利信息服务中文网，水利信息社区，致力于构建完善的水资源服务。</p>
      <p>
        Powered by
        <a href="https://github.com/214058830">GongBin(Vue + Golang + MySQL)</a>
      </p>
      <br />
      <p>VERSION: V1.0.4 · 为了更好的体验，本站推荐使用 Chrome 或 Firefox 浏览器</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
</style>