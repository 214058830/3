<template>
  <div>
    <Card>
      <p slot="title">录入缴费信息</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <FormItem label="邮箱" prop="mail">
          <Input
            :disabled="this.maildisabledflag"
            v-model="formValidate.mail"
            style="width: 300px"
            placeholder="请输入Email"
          ></Input>
        </FormItem>
        <FormItem label="缴费账单号" prop="history_id">
          <Input v-model="formValidate.history_id" style="width: 300px" placeholder="请输入缴费账单号"></Input>
        </FormItem>
        <FormItem label="缴费金额" prop="amount">
          <Input
            type="number"
            number
            v-model="formValidate.amount"
            style="width: 300px"
            placeholder="请输入缴费金额"
          ></Input>
        </FormItem>
      </Form>
      <Upload
        v-if="this.formValidate.file.length == 0"
        :before-upload="handleUpload"
        accept="image/gif, image/jpeg, image/png, image/jpg"
        type="drag"
        :action="uploadUrl"
        name="contributeHistoryPhoto"
      >
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽文件到这里以上传</p>
        </div>
      </Upload>
      <Row v-else style="padding: 20px 0; height: 118px; text-align: center; position:relative;">
        <Col style>
          <Icon size="40" type="ios-checkmark-circle-outline" />
          <p style="font-size: 16px;">上传成功</p>
        </Col>
      </Row>
    </Card>
    <div class="button">
      <Button type="primary" @click="handleReset('formValidate')">清空</Button>
      <Button style="margin-left: 10px" type="primary" @click="submit('formValidate')">提交</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mail: String,
    logo: String
  },
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
      uploadUrl:
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_VERSION +
        "/water/contribute_history/upload",
      formValidate: {
        mail: this.mail,
        history_id: "",
        amount: 0.0,
        file: []
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
        ],
        amount: [
          {
            type: "number",
            required: true,
            message: "The amount cannot be empty",
            trigger: "blur"
          },
          { required: true, validator: validateAmount, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleUpload(file) {
      this.formValidate.file.push(file);
      return false;
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formValidate.file.length == 0) {
            this.$Message.warning("上传文件不能为空");
            return;
          }
          // 登录的过渡动画
          const msg = this.$Message.loading({
            content: "Loading...",
            duration: 0
          });
          let config = {
            headers: {
              "Content-Type":
                "multipart/form-data; boundary = " + new Date().getTime()
            }
          };
          // 处理file上传文件
          let formData = new FormData();
          for (let i = 0; i < this.formValidate.file.length; i++) {
            formData.append("file", this.formValidate.file[i]);
          }
          // 处理formValidate数据
          const map = new Map([
            ["mail", this.formValidate.mail],
            ["history_id", this.formValidate.history_id],
            ["amount", this.formValidate.amount]
          ]);
          for (let [key, value] of map) {
            formData.append(key, value);
          }
          this.axios.post(this.uploadUrl, formData, config).then(
            res => {
              setTimeout(msg, 0);
              let data = res.data;
              if (data.code == 2000) {
                const title = "提交结果";
                const content = "<p>预计三个工作日出现结果</p>";
                this.$Modal.success({
                  title: title,
                  content: content,
                  onOk: () => {
                    this.$router.replace({ path: "/" });
                  }
                });
              } else {
                this.$Message.warning("提交失败，" + data.msg);
              }
            },
            res => {
              setTimeout(msg, 0);
              this.$Message.warning("提交失败，请刷新或重试。");
            }
          );
        } else {
          this.$Message.warning("请输入正确的内容");
        }
      });
    }
  },
  computed: {
    maildisabledflag: function() {
      return this.logo == "false";
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
  text-align: center;
  margin-top: 30px;
}
</style>