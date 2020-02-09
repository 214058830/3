<template>
  <div>
    <div v-if="this.logo == 'true'">
      <Input
        search
        enter-button
        v-model="searchContent"
        style="width: 400px"
        placeholder="可输入邮箱、用户名、关键字进行搜索"
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
    <div v-if="this.logo == 'false'" style="padding: 20px">
      <Card :bordered="false" style="width: 700px">
        <p slot="title">账户余额</p>
        <p
          slot="extra"
          @click="queryContributeAmount(param)"
          style="font-size: 16px; cursor: pointer"
        >
          查看历史账单
          <Icon type="ios-arrow-forward" size="20" />
        </p>
        <p style="font-size: 18px;">
          <Icon type="logo-yen" />
          &nbsp {{this.amount.toFixed(2)}}
        </p>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mail: String,
    logo: String,
    flag: String
  },
  data() {
    return {
      searchContent: "",
      param: {
        // 传递给QueryContributeAmount组件的参数
        mail: this.mail
      },
      page: {
        number: 1,
        size: 10,
        total: 0
      },
      data: [], // 表格中当前显示的数据
      user_amount: [], // 所有的总数据
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
          title: "剩余金额",
          key: "amount",
          render: (h, params) => {
            return h("div", params.row.amount.toFixed(2));
          }
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
                      this.queryContributeAmount(params.row);
                    }
                  }
                },
                "查看详情"
              )
            ]);
          }
        }
      ],
      amount: 0.0 // 普通用户的当前金额
    };
  },
  methods: {
    initAllUserAmount() {
      this.axios
        .get(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/water/amount"
        )
        .then(response => {
          this.user_amount = response.data;
          this.initTable(1, 10, this.user_amount.length);
          this.updataTable(); // 请求完数据后刷新自动表格数据
        });
    },
    exportData() {
      this.$refs.table.exportCsv({
        filename: "用户金额账单"
      });
    },
    changePageNumber(num) {
      this.page.number = num;
      this.updataTable();
    },
    updataTable() {
      this.data = [];
      if (this.user_amount.length >= this.page.number * this.page.size) {
        this.data = this.user_amount.slice(
          (this.page.number - 1) * this.page.size,
          this.page.number * this.page.size
        );
      } else {
        this.data = this.user_amount.slice(
          (this.page.number - 1) * this.page.size
        );
      }
    },
    changePageSize(size) {
      this.page.size = size;
      this.updataTable();
    },
    search() {
      this.data = this.user_amount.filter(d => {
        return (
          d.user_name.indexOf(this.searchContent) > -1 ||
          d.mail.indexOf(this.searchContent) > -1
        );
      });
      this.initTable(1, 10, this.data.length);
    },
    initTable(num, size, total) {
      this.page.number = num;
      this.page.size = size;
      this.page.total = total;
    },
    queryContributeAmount(row) {
      this.$router.push({
        name: "QueryContributeAmount",
        params: {
          mail: row.mail
        }
      });
    },
    getUserAmount(mail) {
      // 登录的过渡动画
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      let req = { mail: mail };
      this.axios
        .post(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/water/amount",
          req
        )
        .then(response => {
          setTimeout(msg, 0);
          if (response.data.code == "2000") {
            this.amount = response.data.data.amount;
          } else {
            this.$Message.warning("服务器出错，请稍后重试。");
          }
        });
    }
  },
  mounted() {
    if (this.logo == "true") {
      this.initAllUserAmount();
    } else if (this.logo == "false") {
      this.getUserAmount(this.mail);
    }
  }
};
</script>
