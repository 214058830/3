<template>
  <div>
    <Input
      search
      enter-button
      v-model="searchContent"
      style="width: 400px"
      placeholder="可输入邮箱、用户名、管理员、注册时间关键字进行搜索"
      clearable
      @on-change="search"
    />
    <Table border ref="table" :columns="columns" :data="data" style="margin-left: -8px"></Table>
    <Button style="float: right" type="primary" size="large" @click="exportData()">
      <Icon type="ios-download-outline"></Icon>Export source data
    </Button>
    <Page
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
      data: [], // 表格中当前显示的数据
      user: [], // 所有的总数据
      columns: [
        {
          title: "邮箱",
          key: "mail"
        },
        {
          title: "用户名",
          key: "user_name"
        },
        {
          title: "管理员",
          key: "logo"
        },
        {
          title: "注册时间",
          key: "create_time"
        },
        {
          title: "Action",
          key: "action",
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.setup(params.row);
                    }
                  }
                },
                "设置"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.cancle(params.row);
                    }
                  }
                },
                "取消"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    initAllUserInfo() {
      this.axios.get("http://localhost:8081/v1/user").then(response => {
        this.user = response.data;
        this.initTable(1, 10, this.user.length);
        this.updataTable(); // 请求完数据后刷新自动表格数据
      });
    },
    exportData() {
      this.$refs.table.exportCsv({
        filename: "用户名单"
      });
    },
    setup(data) {
      if (data.mail == "admin@qq.com") {
        this.$Message.warning("对不起，您没有该操作权限。");
      } else {
        this.$Modal.info({
          title: " 确定设置该用户管理员？",
          content: `Name：${data.user_name}<br>Mail：${data.mail}`
        });
      }
    },
    cancle(data) {
      if (data.user_name == "admin") {
        this.$Message.warning("对不起，您没有该操作权限。");
      } else {
        console.log(data);
      }
    },
    changePageNumber(num) {
      this.page.number = num;
      this.updataTable();
    },
    updataTable() {
      this.data = [];
      if (this.user.length >= this.page.number * this.page.size) {
        this.data = this.user.slice(
          (this.page.number - 1) * this.page.size,
          this.page.number * this.page.size
        );
      } else {
        this.data = this.user.slice((this.page.number - 1) * this.page.size);
      }
    },
    changePageSize(size) {
      this.page.size = size;
      this.updataTable();
    },
    search() {
      this.data = this.user.filter(d => {
        return (
          d.user_name.indexOf(this.searchContent) > -1 ||
          d.mail.indexOf(this.searchContent) > -1 ||
          String(d.logo).indexOf(this.searchContent) > -1 ||
          d.create_time.indexOf(this.searchContent) > -1
        );
      });
      this.initTable(1, 10, this.data.length);
    },
    initTable(num, size, total) {
      this.page.number = num;
      this.page.size = size;
      this.page.total = total;
    }
  },
  mounted() {
    this.initAllUserInfo();
  }
};
</script>
