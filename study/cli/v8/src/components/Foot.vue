<template>
  <div>
    <footer>
      <p>{{title}}</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Vue components Foot"
    };
  }
};
</script>

<style scopet>
footer {
  background: #222;
  padding: 6px;
}

p {
  color: lightgreen;
  text-align: center;
}
</style>
