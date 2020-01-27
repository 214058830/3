<template>
  <div class="layout-content">
    <Row>
      <Col span="18" style="padding:10px;">
        <Card>
          <p slot="title">登录</p>
          <div class="layout_register">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="邮箱" prop="mail">
                <Input v-model="formValidate.mail" style="width: 300px" placeholder="请输入邮箱"></Input>
              </FormItem>
              <FormItem label="密码" prop="password">
                <Input
                  v-model="formValidate.password"
                  type="password"
                  style="width: 300px"
                  placeholder="请输入密码"
                ></Input>
              </FormItem>
              <Checkbox v-model="formValidate.single" size="large" style="margin-left: 80px">记住登录状态</Checkbox>
              <FormItem>
                <Button type="primary" @click="login()" style="margin-left: 110px">登录</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </Col>
      <Col span="6" style="padding:10px;">
        <Card>
          <p slot="title">
            <Icon type="ios-person" size="20" />第三方账号登录
          </p>
          <Button type="success" long>
            <Icon type="logo-github" />GitHub
          </Button>
          <br />
          <br />
          <Button type="success" long>
            <Icon type="logo-github" />Gitea
          </Button>
        </Card>
        <br />
        <Card>
          <p slot="title">
            <Icon type="md-list-box" size="20" />还没有账号？
          </p>
          <li to="/register">注册</li>
          <li>忘记了密码？</li>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      formValidate: {
        // 登录邮箱密码
        mail: "",
        password: "",
        single: true // 记住登录状态标志
      },
      ruleValidate: {
        mail: [
          {
            required: true,
            message: "The mail cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
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
    // 登录
    login() {
      // 登录的过渡动画
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      this.axios
        .post(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/user/login",
          this.formValidate
        )
        .then(
          res => {
            setTimeout(msg, 0);
            if (res.data.code == 2000) {
              this.$Message.success("登录成功");
              this.$emit("changeFlag", "true");
              this.$emit("updataUserInfo", "id", res.data.data.id);
              this.$emit("updataUserInfo", "mail", res.data.data.mail);
              this.$emit("updataUserInfo", "username", res.data.data.user_name);
              this.$emit("updataUserInfo", "password", res.data.data.pass_word);
              this.$emit("updataUserInfo", "logo", res.data.data.logo);
              this.$router.replace({ path: "/" });
            } else if (res.data.code == 5000) {
              this.$Message.success("服务器出错，请稍后重试。");
            } else {
              this.$Message.warning("登录失败，用户名或密码错误。");
            }
          },
          res => {
            setTimeout(msg, 0);
            this.$Message.warning("登录失败，请刷新或重试。");
          }
        );
    },
    //读取服务端Session
    getSession: function() {
      this.axios
        .get(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/user/session"
        )
        .then(res => {
          var data = res.data;
          if (data.code == 2000) {
            this.formValidate.mail = data.data.Mail;
            this.formValidate.password = data.data.PassWord;
            this.formValidate.single = data.data.Single;
          }
        });
    }
  },
  mounted() {
    this.getSession();
  }
};
</script>

<style scoped>
.layout_register {
  margin-left: 180px;
}
.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
  margin-left: 100px;
  margin-right: 100px;
}
</style>