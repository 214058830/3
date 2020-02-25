<template>
  <div>
    <Input
      search
      enter-button
      v-model="searchContent"
      style="width: 300px"
      placeholder="搜索"
      clearable
      @on-change="search"
    />
    <Card style="margin-top: 10px">
      <List>
        <ListItem v-for="(val, key) in data">
          <ListItemMeta
            avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
            :title="val.title"
            @click.native="browse(val)"
            style="cursor:pointer"
          >
            <template slot="description">
              <div>
                <span v-if="val.logo == true" style="color: #ff7700; border: 1px solid #ff7700;">置顶</span>
                <span v-if="val.logo == true">&nbsp;•&nbsp;</span>
                <strong>{{val.user_name}}</strong>
                &nbsp;•&nbsp; 发布于 {{val.create_time}}
              </div>
            </template>
          </ListItemMeta>
          <template slot="action">
            <li>
              <Icon type="ios-share-alt-outline" />
              {{val.share_num}}
            </li>
            <li>
              <Icon type="ios-thumbs-up-outline" />
              {{val.like_num}}
            </li>
            <li>
              <Icon type="ios-chatbubbles-outline" />
              {{val.comment_num}}
            </li>
          </template>
        </ListItem>
      </List>
    </Card>
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
  </div>
</template>

<script>
export default {
  props: {
    mail: String
  },
  data() {
    return {
      searchContent: "",
      page: {
        number: 1,
        size: 10,
        total: 0
      },
      data: [], // 当前页的文章显示
      forumArticle: []
    };
  },
  methods: {
    search() {
      if (this.searchContent == "") {
        this.initTable(1, 10, this.forumArticle.length);
        this.updataTable();
      } else {
        this.data = this.forumArticle.filter(d => {
          return (
            d.user_name.indexOf(this.searchContent) > -1 ||
            d.title.indexOf(this.searchContent) > -1 ||
            d.create_time.indexOf(this.searchContent) > -1
          );
        });
        this.initTable(1, 10, this.data.length);
      }
    },
    changePageNumber(num) {
      this.page.number = num;
      this.updataTable();
    },
    updataTable() {
      this.data = [];
      if (this.forumArticle.length >= this.page.number * this.page.size) {
        this.data = this.forumArticle.slice(
          (this.page.number - 1) * this.page.size,
          this.page.number * this.page.size
        );
      } else {
        this.data = this.forumArticle.slice(
          (this.page.number - 1) * this.page.size
        );
      }
    },
    changePageSize(size) {
      this.page.size = size;
      this.updataTable();
    },
    initTable(num, size, total) {
      this.page.number = num;
      this.page.size = size;
      this.page.total = total;
    },
    initAllForum() {
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      let req = { mail: this.mail };
      this.axios
        .post(
          process.env.VUE_APP_BASE_URL + process.env.VUE_APP_VERSION + "/forum",
          req
        )
        .then(
          response => {
            setTimeout(msg, 0);
            if (response.data.code == 2000) {
              this.forumArticle = response.data.data;
              this.initTable(1, 10, this.forumArticle.length);
              this.updataTable(); // 请求完数据后刷新自动表格数据
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
    browse(val) {
      // 保证用户保存书签的时候可以正确进入
      this.$router.push({
        path: "/platform/browse",
        query: {
          id: val.id
        }
      });
    }
  },
  mounted() {
    this.initAllForum();
  }
};
</script>

<style scoped>
.list-unstyled {
  padding-left: 0;
  list-style: none;
}
</style>