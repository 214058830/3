<template>
  <div>
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
      user_contribute_amount: [], // 所有的总数据
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
          title: "缴费金额",
          key: "contribute_amount",
          render: (h, params) => {
            return h("div", params.row.contribute_amount.toFixed(2));
          }
        },
        {
          title: "时间",
          key: "create_time"
        }
      ]
    };
  },
  methods: {
    initUserContributeHistoryInfo() {
      this.axios
        .post(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/water/contribute_history",
          this.$route.params
        )
        .then(response => {
          this.user_contribute_amount = response.data.data;
          this.initTable(1, 10, this.user_contribute_amount.length);
          this.updataTable(); // 请求完数据后刷新自动表格数据
        });
    },
    exportData() {
      this.$refs.table.exportCsv({
        filename: "缴费历史账单"
      });
    },
    changePageNumber(num) {
      this.page.number = num;
      this.updataTable();
    },
    updataTable() {
      this.data = [];
      if (
        this.user_contribute_amount.length >=
        this.page.number * this.page.size
      ) {
        this.data = this.user_contribute_amount.slice(
          (this.page.number - 1) * this.page.size,
          this.page.number * this.page.size
        );
      } else {
        this.data = this.user_contribute_amount.slice(
          (this.page.number - 1) * this.page.size
        );
      }
    },
    changePageSize(size) {
      this.page.size = size;
      this.updataTable();
    },
    search() {
      this.data = this.user_contribute_amount.filter(d => {
        return (
          d.user_name.indexOf(this.searchContent) > -1 ||
          d.mail.indexOf(this.searchContent) > -1 ||
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
    this.initUserContributeHistoryInfo();
  }
};
</script>
