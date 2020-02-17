<template>
  <div>
    <Row>
      <Col span="18" style="padding:10px;">
        <Card>
          <p slot="title">注册新用户</p>
          <div class="layout_register">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="用户名" prop="name">
                <Input v-model="formValidate.name" style="width: 300px" placeholder="请输入用户名"></Input>
                <span class="layout_description">只能包含大小写字母、数字和下划线(最多12字符)</span>
              </FormItem>
              <FormItem label="邮箱" prop="mail">
                <Input v-model="formValidate.mail" style="width: 300px" placeholder="请输入Email"></Input>
                <span class="layout_description">邮箱是账号唯一的凭证，只能设置一次。</span>
              </FormItem>
              <FormItem label="验证码" prop="verification_code">
                <Input
                  v-model="formValidate.verification_code"
                  style="width: 100px"
                  placeholder="请输入验证码"
                ></Input>
                <span
                  class="layout_description"
                  style="cursor:pointer"
                  @click="getVerificationCode()"
                >获取验证码</span>
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
                <Button
                  type="primary"
                  @click="register('formValidate')"
                  style="margin-left: 50px"
                >注册</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 10px">清空</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </Col>
      <Col span="6" style="padding:10px;">
        <Card>
          <p slot="title">第三方登录方式</p>
          <Row>
            <Col span="6">
              <img style="cursor:pointer" src="../../assets/icon32_wx_logo.png" />
            </Col>
            <Col span="6">
              <img style="cursor:pointer" src="../../assets/alipay_logo.png" />
            </Col>
          </Row>
        </Card>
        <br />
        <Card>
          <p slot="title">已经有账号了？</p>
          <li style="cursor:pointer" to="/register">登录</li>
          <li style="cursor:pointer">忘记了密码？</li>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    const validatePassCheck = (rule, value, callback) => {
      setTimeout(() => {
        if (value === "") {
          callback(new Error("Please enter your password again"));
        } else if (value !== this.formValidate.password) {
          callback(new Error("The two input passwords do not match!"));
        } else {
          callback();
        }
      }, 1000);
    };

    return {
      formValidate: {
        name: "",
        mail: "",
        password: "",
        password_sure: "",
        verification_code: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          },
          {
            max: 12,
            message: "请输入最多12位"
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
          },
          {
            min: 6,
            message: "请输入最少6位"
          },
          {
            max: 18,
            message: "请输入最少18位"
          }
        ],
        password_sure: [
          {
            required: true,
            message: "The password_sure cannot be empty",
            trigger: "blur"
          },
          {
            required: true,
            validator: validatePassCheck,
            trigger: "change"
          }
        ],
        verification_code: [
          {
            required: true,
            message: "The verification_code cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    register(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 登录的过渡动画
          const msg = this.$Message.loading({
            content: "Loading...",
            duration: 0
          });
          this.axios
            .post(
              process.env.VUE_APP_BASE_URL +
                process.env.VUE_APP_VERSION +
                "/user/register",
              this.formValidate
            )
            .then(
              res => {
                setTimeout(msg, 0);
                let data = res.data;
                if (data.code == 2000) {
                  this.$Message.success("注册成功");
                  this.$router.replace({ path: "/login" });
                } else {
                  this.$Message.warning("注册失败，" + data.msg);
                }
                console.log(res.data); // res 返回的是传出的参数
              },
              res => {
                setTimeout(msg, 0);
                this.$Message.warning("注册失败，请刷新或重试。");
              }
            );
        } else {
          this.$Message.warning("请输入正确的内容");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getVerificationCode() {
      this.formValidate.verification_code = "1234";
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
</style>