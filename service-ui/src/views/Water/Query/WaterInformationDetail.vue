<template>
  <div>
    <h1 slot="title">{{ this.data.forum_article.title }}</h1>
    <p style=" color: #858585; font-size:14px; margin-top: 20px" slot="title">
      <span style="color: #2db7f5">{{ this.data.forum_article.user_name }}</span>
      <time style="margin-left: 20px">最后发布于{{this.data.forum_article.last_modified_time}}</time>
    </p>
    <article v-html="this.data.content"></article>
  </div>
</template>

<script>
export default {
  props: {
    mail: String,
    flag: String,
    logo: String
  },
  data() {
    return {
      length: 64,
      commentText: "",
      data: {
        forum_article: {},
        content: "",
        comment: []
      },
      likeflag: 0 // 点赞标志
    };
  },
  methods: {
    init() {
      console.log(this.$route.params.id);
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      this.axios
        .get(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/water/detail",
          { params: { id: this.$route.params.id } }
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
      if (this.commentText == "") {
        this.$Message.warning("评论内容不能为空");
      } else {
        let req = {
          article_id: this.data.forum_article.id,
          mail: this.mail,
          comment: this.commentText
        };
        this.axios
          .post(
            process.env.VUE_APP_BASE_URL +
              process.env.VUE_APP_VERSION +
              "/forum/comment",
            req
          )
          .then(
            response => {
              if (response.data.code == 2000) {
                this.commentText = "";
                this.$Message.success("评论成功");
              } else {
                this.$Message.warning("评论失败，" + response.data.msg);
              }
            },
            res => {
              this.$Message.warning("获取数据失败，请刷新或重试。");
            }
          );
      }
    },
    clickCommentInput() {
      if (this.flag != "true") {
        this.$router.replace({ path: "/login" });
      }
    },
    // 置顶操作 参数: bool
    sticky(flag) {
      let req = {
        article_id: this.data.forum_article.id,
        flag: flag
      };
      this.axios
        .post(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/forum/sticky",
          req
        )
        .then(
          response => {
            if (response.data.code == 2000) {
              this.data.forum_article.logo = flag;
            } else {
              this.$Message.warning("操作失败，" + response.data.msg);
            }
          },
          res => {
            this.$Message.warning("获取数据失败，请刷新或重试。");
          }
        );
    }
  },
  mounted() {
    if (this.$route.params.id == undefined) {
      this.$router.push({ path: "/water/water_information" });
    } else {
      this.init();
    }
  }
};
</script>

<style scoped>
</style>