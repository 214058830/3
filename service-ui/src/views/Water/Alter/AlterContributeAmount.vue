<template>
  <Card>
    <p slot="title">请输入缴费信息</p>
    <div class="layout_alter">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="user_name">
          <Input disabled v-model="formValidate.user_name" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="mail">
          <Input disabled v-model="formValidate.mail" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="缴费金额" prop="contribute_amount">
          <Input
            type="number"
            number
            v-model="formValidate.contribute_amount"
            style="width: 300px"
            placeholder="请输入缴费金额"
          ></Input>
        </FormItem>
        <FormItem label="时间" prop="time">
          <Input v-model="formValidate.time" style="width: 300px" placeholder="请输入缴费时间"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="save()" style="margin-left: 110px">保存</Button>
        </FormItem>
      </Form>
    </div>
  </Card>
</template>

<script>
export default {
  components: {},
  data() {
    const validateAmount = (rule, value, callback) => {
      setTimeout(() => {
        var pattern = /^\d+.?\d{0,2}$/;
        if (value > 214748) {
          return callback(new Error("销售报价金额过大"));
        } else if (value <= 214748 && !pattern.test(value)) {
          return callback(new Error("小数点后最多只能输入两位"));
        } else return callback();
      }, 1000);
    };
    return {
      formValidate: {
        user_name: "",
        mail: "",
        contribute_amount: 0.0,
        time: ""
      },
      ruleValidate: {
        user_name: [
          {
            required: true,
            message: "user_name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "The mail cannot be empty",
            trigger: "blur"
          }
        ],
        contribute_amount: [
          {
            type: "number",
            required: true,
            message: "The contribute_amount cannot be empty",
            trigger: "blur"
          },
          { required: true, validator: validateAmount, trigger: "change" }
        ],
        time: [
          {
            required: true,
            message: "The time cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 修改用户信息
    save() {
      // 登录的过渡动画
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      this.axios
        .post(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/user/updataUserInfo",
          this.formValidate
        )
        .then(
          res => {
            setTimeout(msg, 0);
            if (res.data.code == 2000) {
              this.$Message.success("保存成功");
              this.$emit(
                "updataUserInfo",
                "username",
                this.formValidate.username
              );
              this.$emit(
                "updataUserInfo",
                "password",
                this.formValidate.password
              );
            } else if (res.data.code == 5000) {
              this.$Message.success("服务器出错，请稍后重试。");
            } else {
              this.$Message.warning("保存失败，请稍后重试。");
            }
          },
          res => {
            setTimeout(msg, 0);
            this.$Message.warning("保存失败，请刷新或重试。");
          }
        );
    }
  },
  mounted() {
    this.formValidate = this.$route.params;
  }
};
</script>

<style scoped>
.layout_alter {
  margin-left: 200px;
}
</style>