<template>
  <div>
    <Input
      search
      enter-button
      v-model="searchContent"
      style="width: 400px"
      placeholder="可输入邮箱、用户名的关键字进行搜索"
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
      water_information: [], // 所有的总数据
      columns: [
        {
          title: "序号",
          key: "id"
        },
        {
          title: "单位名称",
          key: "company_name"
        },
        {
          title: "负责人",
          key: "principal"
          // render: (h, params) => {
          //   return h("div", params.row.amount.toFixed(2));
          // }
        },
        {
          title: "电话",
          key: "telephone_number"
        },
        {
          title: "传真",
          key: "fax_number"
        },
        {
          title: "邮编",
          key: "post_code"
        },
        {
          title: "地址",
          key: "address"
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
                      this.queryWaterInformationDetail(params.row);
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
    initWaterInformation() {
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      this.axios
        .get(
          process.env.VUE_APP_BASE_URL + process.env.VUE_APP_VERSION + "/water/"
        )
        .then(
          response => {
            setTimeout(msg, 0);
            if (response.data.code == 2000) {
              this.water_information = response.data.data;
              this.initTable(1, 10, this.water_information.length);
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
      if (this.water_information.length >= this.page.number * this.page.size) {
        this.data = this.water_information.slice(
          (this.page.number - 1) * this.page.size,
          this.page.number * this.page.size
        );
      } else {
        this.data = this.water_information.slice(
          (this.page.number - 1) * this.page.size
        );
      }
    },
    changePageSize(size) {
      this.page.size = size;
      this.updataTable();
    },
    search() {
      if (this.searchContent == "") {
        this.initTable(1, 10, this.water_information.length);
        this.updataTable();
      } else {
        this.data = this.water_information.filter(d => {
          return (
            d.user_name.indexOf(this.searchContent) > -1 ||
            d.mail.indexOf(this.searchContent) > -1
          );
        });
        this.initTable(1, 10, this.data.length);
      }
    },
    initTable(num, size, total) {
      this.page.number = num;
      this.page.size = size;
      this.page.total = total;
    },
    queryWaterInformationDetail(row) {
      console.log(row);
      // this.$router.push({
      //   name: "QueryContributeAmount",
      //   params: {
      //     mail: row.mail
      //   }
      // });
    }
    // getUserAmount(mail) {
    //   // 登录的过渡动画
    //   const msg = this.$Message.loading({
    //     content: "Loading...",
    //     duration: 0
    //   });
    //   let req = { mail: mail };
    //   this.axios
    //     .post(
    //       process.env.VUE_APP_BASE_URL +
    //         process.env.VUE_APP_VERSION +
    //         "/water/amount",
    //       req
    //     )
    //     .then(response => {
    //       setTimeout(msg, 0);
    //       if (response.data.code == "2000") {
    //         this.amount = response.data.data.amount;
    //       } else {
    //         this.$Message.warning("服务器出错，请稍后重试。");
    //       }
    //     });
    // }
  },
  mounted() {
    this.initWaterInformation();
  }
};
</script>
