// 全局变量
let data = {
    name: 'gongbinYa'
};

// 全局组件
Vue.component('Gong', {
    // html 模版 这个里面只能有一个标签 支持嵌套
    template: `
        <p>这是全局组件，可以在任何实例的容器中使用 {{ name }}
        <button @click='changeName'>changeName</button>
        </p>
    `,
    // 属性 
    data() {
        return data;
        // name: 'gongbin',
        // age: '21'
    },
    // 方法
    methods: {
        changeName() {
            this.name = 'gonggong'
        }
    }
});

const one = new Vue({
    el: '#vue-app-one',
    data() {
        return {};
    },
    methods: {},
    computed: {}
});

const two = new Vue({
    el: '#vue-app-two',
    data() {
        return {
        };
    },
    methods: {},
    computed: {}
});