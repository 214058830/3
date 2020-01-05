new Vue({
    el: '#vue-app',
    data() {
        return {
            age: 30,
            x: 0,
            y: 0
        };
    },
    methods: {
        add() {
            this.age++;
        },
        updateXY(event) {
            // console.log(event)
            this.x = event.offsetX;
            this.y = event.offsetY;
        },
        handleClick() {
            alert("hello");
        },
        logNmae() {
            console.log("正在输入名字...")
        },
        logAge() {
            console.log("正在输入年龄...")
        }
    }
});