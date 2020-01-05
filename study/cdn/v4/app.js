new Vue({
    el: '#vue-app',
    data() {
        return {
            a: 0,
            b: 0,
            age: 10
        };
    },
    methods: {
        funcaddToA() {
            console.log("funcaddToA");
            return this.a + this.age;
        },
        funcaddToB() {
            console.log("funcaddToB");
            return this.b + this.age;
        }
    },
    computed: { // method 可以没有返回值 但是computed计算属性必须含有return返回值
        addToA() {
            console.log("addToA");
            return this.a + this.age;
        },
        addToB() {
            console.log("addToB");
            return this.b + this.age;
        }
    }
});