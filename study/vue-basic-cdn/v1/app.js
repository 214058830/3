// 实例化vue对象
new Vue({
    el: '#vue-app', // elemnet 表示要操作哪一个容器 -> div 只有vue-app的div块可以使用
    data() {
        return {
            name: 'gongbin',
            qq: '214058830',
            website: 'https://www.baidu.com',
            websiteTag: '<a href="http://www.taobao.com">taobao</a>'
        };
    },
    methods: { // 方法的定义
        // 底下两种写法是一样的效果 推荐第二种
        // greet: function () {
        //     return 'Hello ' + this.name;
        // }
        greet(temp) {
            // 底下两种写法效果一样 推荐第二种
            // return 'Hello ' + this.name;
            return `Hello ${this.name} ${temp}`;
        }
    }
});