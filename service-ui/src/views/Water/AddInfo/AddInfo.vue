<template>
  <div>
    <Card>
      <p slot="title">录入缴费历史信息</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="邮箱" prop="mail">
          <Input v-model="formValidate.mail" style="width: 300px" placeholder="请输入Email"></Input>
        </FormItem>
        <FormItem label="缴费账单号" prop="history_id">
          <Input v-model="formValidate.history_id" style="width: 300px" placeholder="请输入缴费账单号"></Input>
        </FormItem>
      </Form>
      <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽文件到这里以上传</p>
        </div>
      </Upload>
    </Card>
    <div class="button">
      <Button :disabled="lastdisable" type="primary" @click="handleReset('formValidate')">清空</Button>
      <Button
        :disabled="nextdisable"
        style="margin-left: 10px"
        type="primary"
        @click="submit('formValidate')"
      >提交</Button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      formValidate: {
        mail: "",
        history_id: ""
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
        history_id: [
          {
            required: true,
            message: "The account number cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    submit(name) {
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
    }
  },
  computed: {},
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
  text-align: center;
  margin-top: 30px;
}
</style>