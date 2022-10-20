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
      <a-button class="btn-add" type="primary">新建源</a-button>
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
          <a-button type="primary" danger style="margin-right:10px">取消订阅</a-button>
          <a-radio-group v-model:value="checkStatus">
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
        <rss-content></rss-content>
        <rss-info></rss-info>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import RssContent from "@/components/RssContent.vue";
import RssInfo from "@/components/RssInfo.vue";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    RssContent,
    RssInfo,
  },

  setup() {
    const store = useStore();
    const state = reactive({
      checkStatus:true,
    });
    const dataList = ref(
      computed(() => {
        return store.state.dataList;
      })
    );
    const selectedKeys = ref([dataList.value[0].title]);
    const checkoutRss = (value) => {};
    onMounted(() => {});
    return {
      ...toRefs(state),
      selectedKeys,
      collapsed: ref(false),
      dataList,
      checkoutRss,
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
</style>
