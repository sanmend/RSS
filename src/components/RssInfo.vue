<template>
 <div class="container">
  <h1>详情</h1>
</div>
</template>
<script>
import {ref,reactive,toRefs, onMounted} from 'vue'
export default {
name: 'RssInfo',
setup(){
 const state=reactive({})
onMounted(()=>{})
 return {
...toRefs(state)
}
}
}
</script>
<style scoped lang='less'>
.container {
  width: 30%;
  border: 1px solid rgb(156, 156, 153);
}
</style> 