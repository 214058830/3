<template>
  <div>
    <Card>
      <p slot="title">录入单位信息</p>
      <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="120">
        <FormItem label="单位名称" prop="company_name">
          <Input v-model="formData.company_name" style="width: 300px" placeholder="请输入单位名称"></Input>
        </FormItem>
        <FormItem label="所属级别" prop="level">
          <Select v-model="formData.level" style="width:200px">
            <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="负责人" prop="principal">
          <Input v-model="formData.principal" style="width: 300px" placeholder="请输入负责人姓名"></Input>
        </FormItem>
        <FormItem label="电话" prop="telephone_number">
          <Input v-model="formData.telephone_number" style="width: 300px" placeholder="请输入单位联系方式"></Input>
        </FormItem>
        <FormItem label="传真" prop="fax_number">
          <Input v-model="formData.fax_number" style="width: 300px" placeholder="请输入传真号"></Input>
        </FormItem>
        <FormItem label="邮编" prop="post_code">
          <Input v-model="formData.post_code" style="width: 300px" placeholder="请输入邮编号"></Input>
        </FormItem>
        <FormItem label="地址" prop="address">
          <Input v-model="formData.address" style="width: 300px" placeholder="请输入单位地址"></Input>
        </FormItem>
        <FormItem label="单位简介" prop="introduction">
          <Input
            v-model="formData.introduction"
            :maxlength="introductionInputLength"
            type="textarea"
            placeholder="请输入单位简介"
            :autosize="{minRows: 3,maxRows: 5}"
          />
        </FormItem>
      </Form>
      <Upload
        v-if="this.formData.file.length == 0"
        :before-upload="handleUpload"
        accept="image/gif, image/jpeg, image/png, image/jpg"
        type="drag"
        :action="uploadUrl"
        name="contributeHistoryPhoto"
      >
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽文件到这里上传单位图片</p>
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
      <Button type="primary" @click="handleReset('formData')">清空</Button>
      <Button style="margin-left: 10px" type="primary" @click="submit('formData')">提交</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      introductionInputLength: 512,
      levelList: [
        {
          value: "厅属",
          label: "厅属"
        },
        {
          value: "市区",
          label: "市区"
        }
      ],
      uploadUrl:
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_VERSION +
        "/water/upload",
      formData: {
        company_name: "",
        principal: "",
        telephone_number: "",
        fax_number: "",
        post_code: "",
        address: "",
        level: "",
        introduction: "",
        file: []
      },
      ruleValidate: {
        company_name: [
          {
            required: true,
            message: "单位名称不能为空",
            trigger: "blur"
          }
        ],
        telephone_number: [
          {
            required: true,
            message: "联系电话不能为空",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "地址不能为空",
            trigger: "blur"
          }
        ],
        level: [
          {
            required: true,
            message: "所属级别不能为空",
            trigger: "blur"
          }
        ],
        introduction: [
          {
            required: true,
            message: "单位简介不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleUpload(file) {
      this.formData.file.push(file);
      return false;
    },
    handleReset(name) {
      this.formData.file = [];
      this.$refs[name].resetFields();
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formData.file.length == 0) {
            this.$Message.warning("上传文件不能为空");
            return;
          }
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
          let req = new FormData();
          for (let i = 0; i < this.formData.file.length; i++) {
            req.append("file", this.formData.file[i]);
          }
          // 处理formData数据
          const map = new Map([
            ["company_name", this.formData.company_name],
            ["principal", this.formData.principal],
            ["telephone_number", this.formData.telephone_number],
            ["fax_number", this.formData.fax_number],
            ["post_code", this.formData.post_code],
            ["address", this.formData.address],
            ["level", this.formData.level],
            ["introduction", this.formData.introduction]
          ]);
          for (let [key, value] of map) {
            req.append(key, value);
          }
          this.axios.post(this.uploadUrl, req, config).then(
            res => {
              setTimeout(msg, 0);
              let data = res.data;
              if (data.code == 2000) {
                this.$Message.success("提交成功");
                this.handleReset("formData");
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