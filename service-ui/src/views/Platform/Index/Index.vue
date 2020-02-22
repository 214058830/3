<template>
  <Row>
    <Col span="18" style="padding:10px;">
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
                  <span
                    v-if="val.logo == true"
                    style="color: #ff7700; border: 1px solid #ff7700;"
                  >置顶</span>
                  <span v-if="val.logo == true">&nbsp;•&nbsp;</span>
                  <strong>{{val.user_name}}</strong>
                  &nbsp;•&nbsp; 发布于 {{val.create_time}}
                </div>
              </template>
            </ListItemMeta>
            <template slot="action">
              <li>
                <Icon type="ios-star-outline" />
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
    </Col>
    <Col span="6" style="padding:10px; margin-top: 30px">
      <Card style="margin-top: 10px">
        <p slot="title">统计信息</p>
        <ul class="list-unstyled">
          <li>
            会员数:
            <span>123</span> 人
          </li>
          <li>
            文章数:
            <span>234</span> 个
          </li>
          <li>
            回复数:
            <span>345</span> 个
          </li>
        </ul>
      </Card>
      <br />
      <Card>
        <p slot="title">友情链接</p>
        <ul class="list-unstyled">
          <li style="margin-left:15px; margin-bottom:5px;">
            <a href="https://www.xinruiyun.cn/" target="_blank" title="免费云服务器">免费云服务器</a>
          </li>
          <li style="margin-left:15px; margin-bottom:5px;">
            <a href="https://kotlintc.com?fr=studygolang" target="_blank" title="Kotlin中国">Kotlin中国</a>
          </li>
          <li style="margin-left:15px; margin-bottom:5px;">
            <a href="https://phperzh.com?fr=studygolang" target="_blank" title="PHP中文社区">PHP中文社区</a>
          </li>
          <li style="margin-left:15px; margin-bottom:5px;">
            <a href="https://blog.csdn.net/qq_42434979" target="_blank" title="我倒数三秒的博客">我倒数三秒的博客</a>
          </li>
          <li style="margin-left:15px; margin-bottom:5px;">
            <a href="http://c.biancheng.net/golang/" target="_blank" title="Go语言">Go语言</a>
          </li>
          <li style="margin-left:15px; margin-bottom:5px;">
            <a href="https://www.linuxprobe.com" target="_blank" title="Linux命令">Linux命令</a>
          </li>
          <li style="margin-left:15px; margin-bottom:5px;">
            <a href="https://golangtc.com?fr=studygolang" target="_blank" title="Golang中国">Golang中国</a>
          </li>
          <li style="margin-left:15px; margin-bottom:5px;">
            <a href="http://www.dotcpp.com/?fr=studygolang" target="_blank" title="C语言">C语言</a>
          </li>
          <li style="margin-left:15px; margin-bottom:5px;">
            <a href="http://www.softwhy.com/?fr=studygolang" target="_blank" title="前端">前端</a>
          </li>
          <li style="margin-left:15px; margin-bottom:5px;">
            <a
              href="http://www.pythontab.com/?fr=studygolang"
              target="_blank"
              title="Python社区"
            >Python社区</a>
          </li>
        </ul>
      </Card>
    </Col>
  </Row>
</template>

<script>
export default {
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
      this.axios
        .get(
          process.env.VUE_APP_BASE_URL + process.env.VUE_APP_VERSION + "/forum"
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