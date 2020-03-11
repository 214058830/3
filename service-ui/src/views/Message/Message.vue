<template>
  <div>
    <Row>
      <Col span="6">
        <Menu :active-name="MenuItem" @on-select="selectMenuItem">
          <Menu-item name="like">点赞</Menu-item>
          <Menu-item name="comment">评论</Menu-item>
        </Menu>
      </Col>
      <Col span="18">
        <p v-if="this.message.length == 0">消息收件箱为空</p>
        <List v-else>
          <ListItem v-for="(val, key) in data">
            <ListItemMeta :title="val.content">
              <template slot="description">
                <a @click="browse(val.article_id)">{{val.article_title}}</a>
              </template>
            </ListItemMeta>
            <template slot="action">{{val.create_time}}</template>
          </ListItem>
        </List>
        <div style="text-align: center;">
          <Page
            style="margin-top: 20px;"
            :total="this.page.total"
            :current="this.page.number"
            :page-size="this.page.size"
            show-sizer
            show-elevator
            show-total
            @on-change="changePageNumber"
            @on-page-size-change="changePageSize"
          />
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    mail: String
  },
  components: {},
  data() {
    return {
      page: {
        number: 1,
        size: 10,
        total: 0
      },
      data: [],
      MenuItem: "",
      message: []
    };
  },
  methods: {
    selectMenuItem(name) {
      this.MenuItem = name;
      if (name == "like") {
        this.getLikeMessage();
      } else if (name == "comment") {
        this.getCommentMessage();
      }
    },
    getLikeMessage() {
      this.axios
        .get(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            process.env.VUE_APP_FILTER +
            "/message",
          { params: { mail: this.mail, type: "like" } }
        )
        .then(
          res => {
            if (res.data.code == 2000) {
              if (res.data.data != null) {
                this.message = res.data.data;
              } else {
                this.message = [];
              }
              for (var i = 0, len = this.message.length; i < len; i++) {
                this.message[i].content =
                  this.message[i].notice_user + "点赞了你的帖子";
              }
              this.initTable(1, 10, this.message.length);
              this.updataTable();
            } else {
              this.$Message.warning("消息获取失败，请稍后重试。");
            }
          },
          res => {
            this.$Message.warning("消息获取失败，请刷新或重试。");
          }
        );
    },
    getCommentMessage() {
      this.axios
        .get(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            process.env.VUE_APP_FILTER +
            "/message",
          { params: { mail: this.mail, type: "comment" } }
        )
        .then(
          res => {
            if (res.data.code == 2000) {
              if (res.data.data != null) {
                this.message = res.data.data;
              } else {
                this.message = [];
              }
              for (var i = 0, len = this.message.length; i < len; i++) {
                this.message[i].content =
                  this.message[i].notice_user + "评论了你的帖子";
              }
              this.initTable(1, 10, this.message.length);
              this.updataTable();
            } else {
              this.$Message.warning("消息获取失败，请稍后重试。");
            }
          },
          res => {
            this.$Message.warning("消息获取失败，请刷新或重试。");
          }
        );
    },
    changePageSize(size) {
      this.page.size = size;
      this.updataTable();
    },
    changePageNumber(num) {
      this.page.number = num;
      this.updataTable();
    },
    initTable(num, size, total) {
      this.page.number = num;
      this.page.size = size;
      this.page.total = total;
    },
    updataTable() {
      this.data = [];
      if (this.message.length >= this.page.number * this.page.size) {
        this.data = this.message.slice(
          (this.page.number - 1) * this.page.size,
          this.page.number * this.page.size
        );
      } else {
        this.data = this.message.slice((this.page.number - 1) * this.page.size);
      }
    },
    browse(id) {
      this.$router.push({
        path: "/platform/browse",
        query: {
          id: id
        }
      });
    }
  },
  mounted() {
    this.MenuItem = this.$route.params.msg;
    if (this.MenuItem == "like") {
      this.getLikeMessage();
    } else {
      this.getCommentMessage();
    }
  }
};
</script>

<style scoped>
</style>