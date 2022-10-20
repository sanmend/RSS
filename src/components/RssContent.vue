<template>
  <div class="container">
    <article>
      <div v-for="item in dataList" :key="item.title"></div>
    </article>
    <footer>
      <a-pagination
        v-model:current="current"
        show-quick-jumper
        :total="500"
        @change="onChange"
      />
    </footer>
  </div>
</template>
<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import {getData} from "@/utils/ready.js";
export default {
  name: "RssContent",
  setup() {
    const state = reactive({
      current: 1,
    });
    const onChange = (pageNumber) => {
      console.log("Page: ", pageNumber);
    };
    const dataList = ref([]);
    onMounted(() => {
      getData()
    });
    return {
      ...toRefs(state),
      onChange,
      dataList,
    };
  },
};
</script>
<style scoped lang="less">
.container {
  position: relative;
  width: 70%;
  border: 1px solid rgb(156, 156, 153);
  article {
    height: 90%;
    background-color: red;
    overflow: auto;
  }
  footer {
    position: absolute;
    bottom: 10px;
  }
}
</style>
