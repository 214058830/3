new Vue({
    el: '#vue-app',
    data() {
        return {
            name: '',
            age: '',
            r1: '',
            r2: ''
        };
    },
    methods: {
        getR1() {
            // console.log(this.$refs.ref1.value);
            this.r1 = this.$refs.ref1.value;
        },
        getR2() {
            this.r1 = this.$refs.ref2.value;
        }
    },
    watch: { // 持续监听属性状态，影响项目性能 不建议使用
        r1(val, oldval) { // 形参为 最新值 和 更新前值
            console.log("val: ", val);
            console.log("oldval: ", oldval);
        }
    }
});