<template>
  <a-layout style="height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="sider"
    >
      <div class="logo">
        <h3 class="logo-text">RSS</h3>
        <h3 class="logo-text" v-if="!collapsed">阅读器</h3>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item
          v-for="item in dataList"
          :key="item.title"
          @click="checkoutRss(item)"
          class="rss-item"
        >
          <span>{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
      <a-button class="btn-add" type="primary" @click="addSource"
        >新建源</a-button
      >
      <a-modal v-model:visible="visible" title="新建源" @ok="handleOk">
        <template #default>
          <div>
            <a-spin tip="Loading..." :spinning="spinning">
              <a-input
                v-model:value="source.title"
                placeholder="请输入源名称"
              />
              <a-input
                v-model:value="source.xmlUrl"
                placeholder="请输入源地址"
              />
            </a-spin>
          </div>
        </template>
      </a-modal>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header" style="background: #fff; padding: 0">
        <div class="header-left">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <h2 class="title">{{ selectedKeys[0] }}</h2>
        </div>

        <div class="header-right">
          <a-button
            type="primary"
            danger
            style="margin-right: 10px"
            @click="deleteData"
            >取消订阅</a-button
          >
          <a-radio-group
            v-model:value="checkStatus"
            button-style="solid"
            @change="isRead"
          >
            <a-radio-button :value="true">全部</a-radio-button>
            <a-radio-button :value="false">未读</a-radio-button>
          </a-radio-group>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
        class="content"
      >
        <rss-content
          :checkData="checkData"
          :checkTitle="selectedKeys[0]"
        ></rss-content>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

import RssContent from "@/components/RssContent";
import { debounce } from "@/utils/debounce";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    RssContent,
  },

  setup() {
    const store = useStore();
    const state = reactive({
      checkStatus: true,
      checkData: [],
      checkDataTotal:[],
      visible: false,
      source: {
        title: "",
        xmlUrl: "",
      },
      spinning: false,
    });
    //rss列表随动vuex
    const dataList = ref(
      computed(() => {
          return store.state.dataList;
      })
    );
    const selectedKeys = ref([]);
    //切换rss列表
    const checkoutRss = (value) => {
      state.checkData = value.list;
      state.checkStatus=true
    };
    //初始化data,使刚进页面时,锁定第一个数据(在onMoundted中执行)
    const dataInit = () => {
      //vuex中的初始化数据是异步操作,所以加一个懒加载,避免显示为空
      let timer = setInterval(() => {
        state.checkData = store.state.dataList[0]?.list;
        selectedKeys.value = [dataList?.value[0]?.title];
        if (store.state?.dataList[0]?.list) {
          clearInterval(timer);
        }
      }, 300);
    };
    //打开添加源的输入框弹窗
    const addSource = () => {
      state.visible = true;
    };
    //确定添加源
    //加层防抖
    const handleOk = debounce(
      () => {
        state.spinning = true;
        store
          .dispatch("dataListAdd", state.source)
          .then(() => {
            message.success("添加成功");
            state.visible = false;
            state.spinning = false;
          })
          .catch(() => {
            message.warning("源不存在或源跨域");
            state.spinning = false;
          });
      },
      1000,
      true
    );
    //取消订阅
    const deleteData = () => {
      store.commit("DELETE_DATALIST", selectedKeys.value[0]);
      dataInit();
    };
    //切换全部/未读的数据
    const isRead = () => {
      state.checkDataTotal=dataList.value.find((item)=>{return item.title==selectedKeys.value[0]}).list
      if (state.checkStatus) {
        state.checkData=state.checkDataTotal
      }else{
        state.checkData=state.checkDataTotal.filter((item)=>{return !item?.checkReadStatus})
      }
    };
    onMounted(() => {
      dataInit();
    });
    return {
      ...toRefs(state),
      selectedKeys,
      collapsed: ref(false),
      dataList,
      checkoutRss,
      addSource,
      handleOk,
      deleteData,
      isRead,
    };
  },
});
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-left {
    display: flex;
    .title {
      margin: 0;
    }
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
    }

    .trigger:hover {
      color: #1890ff;
    }
  }
  .header-right {
    display: flex;
    margin-right: 10%;
  }
}
/deep/ .ant-layout-sider-children {
  position: relative;
  .rss-item {
    text-align: center;
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
    display: flex;
    justify-content: center;
    .logo-text {
      line-height: 32px;
      color: #fff;
      margin: 0;
    }
  }
  .btn-add {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translate(-50%);
  }
}

.site-layout .site-layout-background {
  background: #fff;
}
.content {
  display: flex;
}
/deep/ .ant-spin-container {
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
