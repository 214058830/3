<template>
  <div>
    <Card>
      <p slot="title">个人中心</p>
      <div class="layout_register">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="用户名" prop="username">
            <Input v-model="formValidate.username" style="width: 300px" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input
              v-model="formValidate.password"
              type="password"
              style="width: 300px"
              placeholder="请输入密码"
            ></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="save()" style="margin-left: 110px">保存</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    username: String,
    password: String,
    id: String
  },
  components: {},
  data() {
    return {
      formValidate: {
        username: "",
        password: "",
        id: ""
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: "username cannot be empty",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "The password cannot be empty",
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
    this.formValidate.username = this.username;
    this.formValidate.password = this.password;
    this.formValidate.id = this.id;
  }
};
</script>

<style scoped>
.layout_register {
  margin-left: 360px;
}
</style>