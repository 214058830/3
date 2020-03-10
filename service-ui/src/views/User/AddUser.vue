<template>
  <div>
    <Card>
      <p slot="title">录入用户信息</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="用户名" prop="name">
          <Input v-model="formValidate.name" style="width: 300px" placeholder="请输入用户名"></Input>
          <span class="layout_description">只能包含大小写字母、数字和下划线(最多12字符)</span>
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
      </Form>
    </Card>
    <div class="button">
      <Button type="primary" @click="handleReset('formValidate')">清空</Button>
      <Button style="margin-left: 10px" type="primary" @click="register('formValidate')">录入</Button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.formValidate.password) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };

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
                process.env.VUE_APP_FILTER +
                "/user/register",
              this.formValidate
            )
            .then(
              res => {
                setTimeout(msg, 0);
                let data = res.data;
                if (data.code == 2000) {
                  this.handleReset("formValidate");
                  this.$Message.success("录入成功");
                } else if (res.data.code == 2008) {
                  this.$Message.warning("请登录后再尝试操作");
                  this.$router.replace({ path: "/login" });
                } else {
                  this.$Message.warning("录入失败，" + data.msg);
                }
              },
              res => {
                setTimeout(msg, 0);
                this.$Message.warning("录入失败，请刷新或重试。");
              }
            );
        } else {
          this.$Message.warning("请输入正确的内容");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped>
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
.button {
  text-align: center;
  margin-top: 30px;
}
</style>