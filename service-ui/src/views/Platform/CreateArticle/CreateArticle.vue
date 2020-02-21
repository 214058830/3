<template>
  <div>
    <Card style="margin-top: 10px">
      <Input v-model="article.title" :maxlength="maxlength" placeholder="请输入文章标题" />
      <mavon-editor v-model="article.content" style="margin-top: 20px" />
      <div class="button">
        <Button type="primary" @click="release()">发布</Button>
        <Button style="margin-left: 10px" type="primary" @click="handleReset()">清空</Button>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    username: String,
    mail: String
  },
  data() {
    return {
      maxlength: 24,
      article: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    release() {
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      let req = this.article;
      req.username = this.username;
      req.mail = this.mail;

      this.axios
        .post(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/forum/release",
          req
        )
        .then(
          res => {
            setTimeout(msg, 0);
            let data = res.data;
            if (data.code == 2000) {
              this.handleReset();
              this.$Message.success("发布成功");
            } else {
              this.$Message.warning("发布失败，" + data.msg);
            }
          },
          res => {
            setTimeout(msg, 0);
            this.$Message.warning("发布失败，请刷新或重试。");
          }
        );
    },
    handleReset() {
      this.article = {};
    }
  },
  mounted() {}
};
</script>

<style scoped>
.button {
  text-align: center;
  margin-top: 30px;
}
</style>