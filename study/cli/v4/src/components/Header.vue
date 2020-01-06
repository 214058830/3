<template>
  <div class="header">
    <h1>{{title}}</h1>
  </div>
</template>

<script>

export default {
  data() {
      return{
          title: 'Vue components Header'
      };
  }
}
</script>

<style scoped>
.header {
    background: lightgreen;
    padding: 10px;
}
h1 {
    color: #222;
    text-align: center;
}
</style>
