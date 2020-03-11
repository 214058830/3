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
        <span
          v-if="this.logo == 'true' && this.data.forum_article.logo == false"
          style="cursor:pointer; color: #2db7f5; float: right; margin-right: 10px"
          @click="sticky(true)"
        >置顶</span>
        <span
          v-else-if="this.logo == 'true' && this.data.forum_article.logo != false"
          style="cursor:pointer; color: #2db7f5; float: right; margin-right: 10px"
          @click="sticky(false)"
        >取消置顶</span>
        <span
          v-if="this.logo == 'true' && this.data.forum_article.announcement == false"
          style="cursor:pointer; color: #2db7f5; float: right; margin-right: 10px"
          @click="announcement(true)"
        >设置为公告</span>
        <span
          v-else-if="this.logo == 'true' && this.data.forum_article.announcement != false"
          style="cursor:pointer; color: #2db7f5; float: right; margin-right: 10px"
          @click="announcement(false)"
        >取消公告设置</span>
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
        @click.native="clickCommentInput()"
      />
      <div style="margin-top: 20px">
        <Button @click="comment()">回复</Button>
      </div>
      <List style="margin-top: 20px">
        <ListItem v-for="(val, key) in this.data.comment">
          <ListItemMeta
            avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
            :title="val.user_name"
          >
            <template slot="description">
              <p>{{ val.content }}</p>
            </template>
          </ListItemMeta>
          <template slot="action">
            <li>{{val.create_time}}</li>
          </template>
        </ListItem>
      </List>
    </Card>
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
      likeflag: true // 点赞标志
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
          like_user_mail: this.mail,
          flag: this.likeflag
        };
        this.axios
          .post(
            process.env.VUE_APP_BASE_URL +
              process.env.VUE_APP_VERSION +
              process.env.VUE_APP_FILTER +
              "/forum/like",
            req
          )
          .then(
            res => {
              if (res.data.code == 2000) {
                if (this.likeflag) {
                  this.data.forum_article.like_num++;
                } else {
                  this.data.forum_article.like_num--;
                }
                this.likeflag = !this.likeflag;
              } else if (res.data.code == 2008) {
                this.$Message.warning("请登录后再尝试操作");
                this.$router.replace({ path: "/login" });
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
              process.env.VUE_APP_FILTER +
              "/forum/comment",
            req
          )
          .then(
            response => {
              if (response.data.code == 2000) {
                this.commentText = "";
                this.$Message.success("评论成功");
              } else if (res.data.code == 2008) {
                this.$Message.warning("请登录后再尝试操作");
                this.$router.replace({ path: "/login" });
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
            process.env.VUE_APP_FILTER +
            "/forum/sticky",
          req
        )
        .then(
          response => {
            if (response.data.code == 2000) {
              this.data.forum_article.logo = flag;
            } else if (res.data.code == 2008) {
              this.$Message.warning("请登录后再尝试操作");
              this.$router.replace({ path: "/login" });
            } else {
              this.$Message.warning("操作失败，" + response.data.msg);
            }
          },
          res => {
            this.$Message.warning("获取数据失败，请刷新或重试。");
          }
        );
    },
    // 公告设置 参数: bool
    announcement(flag) {
      let req = {
        article_id: this.data.forum_article.id,
        flag: flag
      };
      this.axios
        .post(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            process.env.VUE_APP_FILTER +
            "/forum/set_announcement",
          req
        )
        .then(
          response => {
            if (response.data.code == 2000) {
              this.data.forum_article.announcement = flag;
            } else if (res.data.code == 2008) {
              this.$Message.warning("请登录后再尝试操作");
              this.$router.replace({ path: "/login" });
            } else {
              this.$Message.warning("操作失败，" + response.data.msg);
            }
          },
          res => {
            this.$Message.warning("获取数据失败，请刷新或重试。");
          }
        );
    },
    // 查询点赞状态
    selectLikeFlag() {
      this.axios
        .get(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/forum/like_flag",
          {
            params: {
              article_id: this.$route.query.id,
              like_user_mail: this.mail
            }
          }
        )
        .then(
          response => {
            if (response.data.code == 2000) {
              this.likeflag = !response.data.data;
            } else {
              this.$Message.warning(response.data.msg);
            }
          },
          res => {
            this.$Message.warning("获取数据失败，请刷新或重试。");
          }
        );
    }
  },
  mounted() {
    this.init();
    this.selectLikeFlag();
  }
};
</script>

<style scoped>
</style>