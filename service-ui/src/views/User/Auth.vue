<template>
  <div>
    <Table border ref="selection" :columns="columns" :data="user"></Table>
    <Button @click="handleSelectAll(true)">Set all selected</Button>
    <Button @click="handleSelectAll(false)">Cancel all selected</Button>
    <Button style="float: right" type="primary" size="large" @click="exportData()">
      <Icon type="ios-download-outline"></Icon>Export source data
    </Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          key: "logo"
        },
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
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    getAllUser() {
      this.axios
        .get("http://localhost:8081/v1/user") //请求接口
        .then(response => {
          this.user = response.data;
        });
    },
    exportData() {
      this.$refs.table.exportCsv({
        filename: "The original data"
      });
    }
  },
  mounted() {
    this.getAllUser();
  }
};
</script>
