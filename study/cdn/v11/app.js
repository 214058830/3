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
            console.log(this.v);
            fetch('http://jsonplaceholder.typicode.com/todos', {
                method: "POST",
                body: JSON.stringify(this.v),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(res => {
                return res.json();
            }).then(todo => {
                console.log(todo);
            })
        }
    },
    computed: {},
    mounted() { // 页面还没有渲染就会执行的函数
        // fetch api 请求接口 成功.then 失败.catch
        fetch('http://jsonplaceholder.typicode.com/todos')
            .then(
                res => {
                    // console.log(res);
                    // console.log(res.json());
                    return res.json();
                }
            )
            .then( // 上面res => 成功的话会执行这个.then
                todo => {
                    // console.log(todo);
                    this.todo = todo;
                }
            )
    }
});
