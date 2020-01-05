new Vue({
    el: '#vue-app',
    data() {
        return {
            color1: true,
            color2: true,
            length: true
        };
    },
    methods: {},
    computed: {
        compClass() {
            return { changeColor: this.color2, changeLength: this.length }
        }
    }
});