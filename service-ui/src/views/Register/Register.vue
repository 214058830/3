<template>
  <div class="layout-content">
    <Row>
      <Col span="18" style="padding:10px;">
        <Card>
          <p slot="title">注册新用户</p>
          <div class="layout_register">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="姓名" prop="name">
                <Input v-model="formValidate.name" style="width: 300px" placeholder="请输入用户名"></Input>
                <span class="layout_description">只能包含大小写字母、数字和下划线（6-20字符）</span>
              </FormItem>
              <FormItem label="邮箱" prop="mail">
                <Input v-model="formValidate.mail" style="width: 300px" placeholder="请输入Email"></Input>
                <span class="layout_description">邮箱是账号唯一的凭证，只能设置一次。</span>
              </FormItem>
              <FormItem label="密码" prop="password">
                <Input
                  v-model="formValidate.password"
                  type="password"
                  style="width: 300px"
                  placeholder="请输入密码"
                ></Input>
              </FormItem>
              <FormItem label="确认密码" prop="password_sure">
                <Input
                  v-model="formValidate.password_sure"
                  type="password"
                  style="width: 300px"
                  placeholder="请再次确认密码"
                ></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="register()" style="margin-left: 50px">注册</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 10px">清空</Button>
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
            <Icon type="md-list-box" size="20" />已经有账号了？
          </p>
          <li>登录</li>
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
        name: "",
        mail: "",
        password: "",
        password_sure: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
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
        ],
        password_sure: [
          {
            required: true,
            message: "The password_sure cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    register() {
      console.log(this.formValidate);
      this.axios
        .post(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/user/register",
          this.formValidate
        )
        .then(res => {
          console.log(res.data); // res 返回的是传出的参数
        });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped>
.layout_register {
  margin-left: 90px;
}
.layout_description {
  margin-left: 10px;
  font-size: 15px;
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