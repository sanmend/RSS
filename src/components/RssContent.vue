<template>
  <div class="container" v-if="dataList?.length">
    <div class="content">
      <article>
        <div
          v-for="item in dataList"
          :key="item?.title"
          class="item"
          @click="checkItem(item)"
          :style="'color:' + (item?.title == itemInfo?.title ? 'red' : 'black')"
        >
          <p>{{ item.title }}</p>
        </div>
      </article>
      <footer>
        <a-pagination
          v-model:current="current"
          show-quick-jumper
          :total="total"
          @change="onChange"
        />
      </footer>
    </div>
    <div class="info" v-if="itemInfo?.title">
      <p class="info-title">{{ itemInfo.title }}</p>
      <a class="info-link" :href="itemInfo.link" target="_blank">进入阅读</a>
      <div class="info-change">
        <p class="info-change-left">可以标记是否阅读</p>
        <a-radio-group
        v-model:value="checkReadStatus"
        @change="checkRead"
        button-style="solid"
      >
        <a-radio-button :value="true">已读</a-radio-button>
        <a-radio-button :value="false">未读</a-radio-button>
      </a-radio-group>
      </div>
      
      
      <p class="info-description">详情:{{ itemInfo.description }}</p>
      <p class="info-author">作者:{{ itemInfo.author }}</p>
      <p class="info-pubdate">时间:{{ itemInfo.pubdate }}</p>
      
    </div>
    <div class="info" v-else>
      <h1>请选择文章</h1>
    </div>
  </div>
  <div class="container" v-else>
    <div class="content">
      <h1>暂无信息。。。</h1>
    </div>
    <div class="info">
      <h1>无。。。</h1>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
export default {
  name: "RssContent",
  props: ["checkData", "checkTitle"],
  setup(props) {
    const store = useStore();
    const state = reactive({
      current: 1,
      itemInfo: "",
      checkReadStatus: "",
      total: computed(() => {
        return props.checkData?.length;
      }),
    });
    const dataList = ref(
      computed(() => {
        return props.checkData.slice(
          (state.current - 1) * 10,
          state.current * 10
        );
      })
    );
    //选择文档列表渲染item的详情
    const checkItem = (item) => {
      state.itemInfo = item;
      item?.checkReadStatus
        ? (state.checkReadStatus = true)
        : (state.checkReadStatus = false);
    };
    //改变是否已读状态
    const checkRead = () => {
      let data = {
        title: props.checkTitle,
        item_title: state.itemInfo.title,
        checkReadStatus: state.checkReadStatus,
      };
      store.commit("CHANGE_DATALIST_ISREADE", data);
    };

    //父组件传值的数据长度改变,重新触发init,
    watch(
      () => props.checkData?.length,
      () => {
        state.current = 1;
        init();
      }
    );
    //初始化列表时,列表默认选中第一个
    const init = () => {
      //vuex中的初始化数据是异步操作,所以加一个懒加载,避免显示为空
      let timer = setInterval(() => {
        console.log(props.checkData);
        state.itemInfo = dataList?.value[0];
        state.itemInfo?.checkReadStatus
          ? (state.checkReadStatus = true)
          : (state.checkReadStatus = false);
        console.log(state.itemInfo?.checkReadStatus);
        console.log(state.checkReadStatus);
        if (dataList.value?.length > 0) {
          clearInterval(timer);
          console.log("成功");
        }
      }, 300);
    };
    //分页改变触发init
    const onChange = () => {
      init();
    };
    onMounted(() => {
      init();
    });
    return {
      ...toRefs(state),
      onChange,
      dataList,
      checkItem,
      checkRead,
    };
  },
};
</script>
<style scoped lang="less">
.container {
  display: flex;
  width: 100%;
  .content {
    position: relative;
    height: 100%;
    width: 70%;
    article {
      height: 90%;
      overflow: auto;
      .item {
        font-size: 20px;
      }
    }
    footer {
      position: absolute;
      bottom: 10px;
    }
  }
  .info {
    width: 30%;
    padding: 10px;
    border: 1px solid rgb(173, 173, 173);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0;
    font-size: 16px;
    .info-title {
      font-weight: 600;
      font-size: 20px;
      text-align: center;
    }
    .info-link{
      padding: 5px;
      background: rgb(70, 187, 255);
      color: #fff;
      margin-right: 10px;
    }
    .info-change{
      display: flex;
      .info-change-left {
        margin: 0;
      }
    }
    .info-description{
      margin-top: 20px;
    }
    .info-author{
      align-self: flex-end;
    }
  }
}
</style>
