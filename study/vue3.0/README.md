# v1 添加插件库 vue add ***

# v2 环境变量
```
<p>dev.api.com</p>
-> 
项目名/.env  
项目名/.env.development -> run serve  
项目名/.env.production -> run build 
VUE_APP_URL=dev.api.com // VUE_APP_这个前缀必须这样 
<p>{{ url }}</p>
<script>  
export default{  
    data() {  
        return {  
            url: process.env.VUE_APP_URL
        };
    }
}
</script>
```
# v3 
