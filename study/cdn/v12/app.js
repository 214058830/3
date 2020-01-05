new Vue({
    el: '#vue-app',
    data() {
        return {
            todo: [],
            v: {
                title: '',
                completed: true
            }
        };
    },
    methods: {
        submit() {
            // axios 实现POST请求
            axios.post('http://jsonplaceholder.typicode.com/todos', this.v).then(res => {
                console.log(res.data); // res 返回的是传出的参数
            });
        }
    },
    computed: {},
    mounted() { // 页面还没有渲染就会执行的函数
        // axios get 请求接口 
        axios.get('http://jsonplaceholder.typicode.com/todos').then(res => {
            console.log(res); // axios 不需要JSON解析
            this.todo = res.data;
        });
    }
});
