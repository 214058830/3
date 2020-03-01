<template>
  <div>
    <Card>
      <h1 slot="title">{{ this.data.forum_article.title }}</h1>
      <p style=" color: #858585; font-size:14px; margin-top: 20px" slot="title">
        <span style="color: #2db7f5">{{ this.data.forum_article.user_name }}</span>
        <time style="margin-left: 20px">最后发布于{{this.data.forum_article.last_modified_time}}</time>
        <span
          v-if="this.mail == this.data.forum_article.mail"
          style="cursor:pointer; color: #2db7f5; float: right; margin-right: 10px"
          @click="edit()"
        >编辑</span>
      </p>
      <article v-html="this.data.content"></article>
      <div style="margin-top: 20px">
        <Button v-if="this.data.forum_article.like_num == 0" @click="like()">点赞</Button>
        <Button v-else @click="like()">点赞 {{this.data.forum_article.like_num}}</Button>
        <Button style="margin-left: 10px" @click="handleReset()">分享</Button>
      </div>
    </Card>
    <Card style="margin-top: 30px">
      <p style=" color: black; font-size:14px; " slot="title">添加一条回复</p>
      <Input
        v-model="commentText"
        :maxlength="length"
        type="textarea"
        placeholder="想对作者说点什么"
        :autosize="true"
      />
      <div style="margin-top: 20px">
        <Button @click="comment()">回复</Button>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    mail: String,
    flag: String
  },
  data() {
    return {
      length: 1000,
      commentText: "",
      data: {
        forum_article: {},
        content: ""
      },
      likeflag: 0 // 点赞标志
    };
  },
  methods: {
    init() {
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      this.axios
        .get(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/forum/browse",
          { params: { id: this.$route.query.id } }
        )
        .then(
          response => {
            setTimeout(msg, 0);
            if (response.data.code == 2000) {
              this.data = response.data.data;
            } else {
              this.$Message.warning(response.data.msg);
            }
          },
          res => {
            setTimeout(msg, 0);
            this.$Message.warning("获取数据失败，请刷新或重试。");
          }
        );
    },
    like() {
      if (this.mail == "") {
        this.$router.replace({ path: "/login" });
      } else {
        let req = {
          article_id: this.data.forum_article.id,
          like_user_mail: this.mail
        };
        this.axios
          .post(
            process.env.VUE_APP_BASE_URL +
              process.env.VUE_APP_VERSION +
              "/forum/like",
            req
          )
          .then(
            res => {
              if (res.data.code == 2000) {
                if (res.data.data == true) {
                  this.data.forum_article.like_num++;
                } else {
                  this.data.forum_article.like_num--;
                }
              } else {
                this.$Message.warning("失败，" + res.data.msg);
              }
            },
            res => {
              this.$Message.warning("失败，请刷新或重试。");
            }
          );
      }
    },
    edit() {
      this.$router.push({
        name: "EditArticle",
        params: {
          id: this.data.forum_article.id
        }
      });
    },
    comment() {
      // 帖子评论
      if (this.flag != true) {
        this.$router.replace({ path: "/login" });
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
</style>