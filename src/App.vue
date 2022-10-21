<template>
  <router-view></router-view>
</template>
<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store=useStore()
    if(localStorage.getItem("dataList")){
      //如果有本地缓存,则将缓存保存至vuex中
      store.commit("SET_DATALIST",JSON.parse(localStorage.getItem("dataList")))
    }else{
      //如果没有本地缓存,则初始化vuex,触发初始化函数
      store.dispatch("dataListInit").then((res)=>{
    })
    }
  },
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
