<template>
  <div style="text-align: center">
    <Card v-if="this.current == 0">
      <p style="margin-left: -750px" slot="title">录入水利信息</p>
      <RadioGroup v-model="button" type="button">
        <Row>
          <Col>
            <Radio id="radio" label="余额信息"></Radio>
          </Col>
          <Col>
            <Radio id="radio" style="margin-top: 10px" label="缴费历史信息"></Radio>
          </Col>
        </Row>
      </RadioGroup>
    </Card>
    <Card v-if="this.current == 1">
      <p style="margin-left: -750px" slot="title">2</p>
    </Card>
    <div class="button">
      <Button :disabled="lastdisable" type="primary" @click="last">上一步</Button>
      <Button :disabled="nextdisable" style="margin-left: 10px" type="primary" @click="next">下一步</Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      button: "余额信息",
      current: 0
    };
  },
  methods: {
    next() {
      this.current += 1;
    },
    last() {
      this.current -= 1;
    }
  },
  computed: {
    nextdisable: {
      get: function() {
        return this.current >= 3;
      }
    },
    lastdisable: {
      get: function() {
        return this.current <= 0;
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
#radio {
  width: 200px;
  height: 60px;
  text-align: center;
  font-size: 16px;
  line-height: 60px;
}
.button {
  float: right;
  margin-top: 30px;
}
</style>