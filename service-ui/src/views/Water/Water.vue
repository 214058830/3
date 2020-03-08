<template>
  <div>
    <Row>
      <Col span="6">
        <Menu :active-name="MenuItem" @on-select="selectMenuItem">
          <Menu-group title="水利信息查询">
            <Menu-item name="s1-1">
              <Icon type="document-text"></Icon>查询
            </Menu-item>
          </Menu-group>
          <Menu-group title="水利信息更改" v-if="this.logo == 'true'">
            <Menu-item name="s2-1">
              <Icon type="heart"></Icon>录入
            </Menu-item>
            <Menu-item name="s2-2">
              <Icon type="heart-broken"></Icon>修改
            </Menu-item>
          </Menu-group>
        </Menu>
      </Col>
      <Col span="18">
        <router-view :logo="logo" :mail="mail" :flag="flag" />
      </Col>
    </Row>
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
      MenuItem: "s1-1"
    };
  },
  methods: {
    selectMenuItem(name) {
      this.MenuItem = name;
      if (this.MenuItem == "s1-1") {
        this.$router.push({ path: "/water/water_information" });
      } else if (this.MenuItem == "s2-1") {
        this.$router.push({ path: "/water/add_info" });
      } else if (this.MenuItem == "s2-2") {
        this.$router.push({ path: "/water/alter" });
      }
    }
  },
  mounted() {},
  created() {
    if (this.flag != "true") {
      this.$emit("updataParamActiveMenu", "login");
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style scoped>
</style>