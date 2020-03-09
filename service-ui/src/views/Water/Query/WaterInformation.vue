<template>
  <div>
    <Row>
      <Col span="12">
        <Input
          search
          enter-button
          v-model="searchContent"
          style="width: 300px"
          placeholder="可输入关键字进行搜索"
          clearable
          @on-change="search"
        />
      </Col>
      <Col>
        <Select
          v-model="searchLevel"
          clearable
          style="width:200px; float: right"
          @on-change="search"
        >
          <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <span style="float: right; font-size: 16px">所属单位：</span>
      </Col>
    </Row>
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
  props: {},
  data() {
    return {
      levelList: [
        {
          value: "厅属",
          label: "厅属"
        },
        {
          value: "市区",
          label: "市区"
        }
      ],
      searchLevel: "",
      searchContent: "",
      page: {
        number: 1,
        size: 10,
        total: 0
      },
      data: [], // 表格中当前显示的数据
      water_information: [], // 所有的总数据
      columns: [
        {
          title: "单位名称",
          key: "company_name"
        },
        {
          title: "负责人",
          key: "principal"
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
      ]
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
        filename: "水利信息单位信息表"
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
    searchInput() {
      this.data = this.water_information.filter(d => {
        return (
          d.company_name.indexOf(this.searchContent) > -1 ||
          d.principal.indexOf(this.searchContent) > -1 ||
          d.address.indexOf(this.searchContent) > -1
        );
      });
      this.initTable(1, 10, this.data.length);
    },
    initTable(num, size, total) {
      this.page.number = num;
      this.page.size = size;
      this.page.total = total;
    },
    queryWaterInformationDetail(row) {
      this.$router.push({
        name: "WaterInformationDetail",
        params: {
          id: row.detail_id,
          title: row.company_name
        }
      });
    },
    selectChange() {
      this.data = this.water_information.filter(d => {
        return d.level.indexOf(this.searchLevel) > -1;
      });
      this.initTable(1, 10, this.data.length);
    },
    searchInputAndSelect() {
      this.data = this.water_information.filter(d => {
        return (
          (d.company_name.indexOf(this.searchContent) > -1 ||
            d.principal.indexOf(this.searchContent) > -1 ||
            d.address.indexOf(this.searchContent) > -1) &&
          d.level.indexOf(this.searchLevel) > -1
        );
      });
      this.initTable(1, 10, this.data.length);
    },
    search() {
      if (this.searchLevel == undefined && this.searchContent == "") {
        this.initTable(1, 10, this.water_information.length);
        this.updataTable();
      } else if (this.searchLevel != undefined && this.searchContent != "") {
        this.searchInputAndSelect();
      } else if (this.searchContent != "") {
        this.searchInput();
      } else {
        this.selectChange();
      }
    }
  },
  mounted() {
    this.initWaterInformation();
  }
};
</script>
