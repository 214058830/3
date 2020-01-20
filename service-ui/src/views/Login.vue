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
              <Checkbox :v-model="single" size="large" style="margin-left: 80px">记住登录状态</Checkbox>
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
          <li>注册</li>
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
      single: true, // 记住登录状态标志
      formValidate: {
        // 登录邮箱密码
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
              if (this.single) {
                this.setCookie(
                  this.formValidate.mail,
                  this.formValidate.password,
                  7
                );
              } else {
                this.clearCookie();
              }
              // this.$router.replace({ path: "/water" });
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
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "mail" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "mail") {
            this.formValidate.mail = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "password") {
            this.formValidate.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  },
  mounted() {
    this.getCookie();
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