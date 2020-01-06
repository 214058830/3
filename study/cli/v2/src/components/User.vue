<template>
    <div class="user">
        <p>User</p>
        <ul>
            <li v-for="v in users">{{v}}</li>
        </ul>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                users: ['a', 'b', 'c']
            };
        }
    };
</script>

<style>
</style>