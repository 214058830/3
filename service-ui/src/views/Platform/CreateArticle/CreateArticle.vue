<template>
  <div>
    <Card style="margin-top: 10px">
      <Input
        v-model="value16"
        maxlength="10"
        show-word-limit
        placeholder="Enter something..."
        style="width: 200px"
      />
      <mavon-editor v-model="article.content" />
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {
        title: "",
        content: ""
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
</style>