<template>
  <div>
    <Header />
    <div class="layout-content">
      <Row>
        <Col span="18" style="padding:10px;">
          <Card>
            <p slot="title">登录</p>
            <div class="layout_register">
              <Form
                ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="80"
              >
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
                <Checkbox :v-model="single" size="large" style="margin-left: 80px">记住登录状态</Checkbox>
                <FormItem>
                  <Button type="primary" @click="handleSubmit()" style="margin-left: 110px">登录</Button>
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
            <li>注册</li>
            <li>忘记了密码？</li>
          </Card>
        </Col>
      </Row>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      single: false,
      formValidate: {
        mail: "",
        password: ""
      },
      ruleValidate: {
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
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.axios.post("http://localhost:8081/v1/login", this.formValidate).then(
        res => {
          console.log(res.data); // res 返回的是传出的参数
          console.log(res.status + " " + res.statusText);
        },
        res => {
          console.log(res);
          console.log("error");
        }
      );
    }
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