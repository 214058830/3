const one = new Vue({
    el: '#vue-app-one',
    data() {
        return {
            title: 'this is one'
        };
    },
    methods: {},
    computed: {}
});

const two = new Vue({
    el: '#vue-app-two',
    data() {
        return {
            title: 'this is two'
        };
    },
    methods: {
        changeTitleOne() { // 从一个vue中改变其他vue的属性
            one.title = "gaibianla hahaha";
        }
    },
    computed: {}
});

two.title = "外面也可以改变vue的属性"