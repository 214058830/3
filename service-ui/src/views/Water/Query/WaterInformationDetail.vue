<template>
  <div>
    <div style="text-align: center;">
      <h1 slot="title">主要职责</h1>
      <p style="color: #858585; font-size:14px; margin-top: 20px" slot="title">
        <span>发布时间: {{this.data.last_modified_time}}</span>
      </p>
      <img :src="imgUrl" />
    </div>
    <p>{{ this.data.introduction }}</p>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      imgUrl: "",
      data: {}
    };
  },
  methods: {
    init() {
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0
      });
      this.axios
        .get(
          process.env.VUE_APP_BASE_URL +
            process.env.VUE_APP_VERSION +
            "/water/detail",
          { params: { id: this.$route.params.id } }
        )
        .then(
          response => {
            setTimeout(msg, 0);
            if (response.data.code == 2000) {
              this.data = response.data.data;
              this.imgUrl = require(process.env
                .VUE_APP_WATERINFORMATIONIMAGE_URL + this.data.image_path);
            } else {
              this.$Message.warning(response.data.msg);
            }
          },
          res => {
            setTimeout(msg, 0);
            this.$Message.warning("获取数据失败，请刷新或重试。");
          }
        );
    }
  },
  computed: {},
  mounted() {
    if (this.$route.params.id == undefined) {
      this.$router.push({ path: "/water/water_information" });
    } else {
      this.init();
    }
  }
};
</script>

<style scoped>
</style>