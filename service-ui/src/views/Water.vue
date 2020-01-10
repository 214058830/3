<template>
  <Row>
    <Col span="6">
      <Menu v-bind:active-name="select">
        <Menu-group title="信息查询">
          <Menu-item name="s1-1" @click.native="select = 's1-1'">
            <Icon type="document-text"></Icon>水利信息查询
          </Menu-item>
        </Menu-group>
        <Menu-group title="信息更改">
          <Menu-item name="s2-1" @click.native="select = 's2-1'">
            <Icon type="heart"></Icon>录入信息
          </Menu-item>
          <Menu-item name="s2-2" @click.native="select = 's2-2'">
            <Icon type="heart-broken"></Icon>信息修改
          </Menu-item>
        </Menu-group>
      </Menu>
    </Col>
    <Col span="18">
      <div v-show="select == 's1-1'">
        <p>s1-1</p>
      </div>
      <div v-show="select == 's2-1'">
        <p>s2-1</p>
      </div>
      <div v-show="select == 's2-2'">
        <p>s2-2</p>
      </div>
    </Col>
  </Row>
</template>

<script>
export default {
  data() {
    return {
      select: "s1-1"
    };
  },
  methods: {
    info() {
      this.$Message.info("这是一条普通的提醒");
    }
  }
};
</script>
