import { createStore } from "vuex";
import { changeData } from "@/utils/ready";
import { getData } from "@/api";

export default createStore({
  state: {
    dataList: [],
  },
  getters: {},
  mutations: {
    SET_DATALIST: (state, dataList) => {
      state.dataList = state.dataList.concat(dataList);
      localStorage.setItem("dataList",JSON.stringify(state.dataList))
    },
    DELETE_DATALIST: (state, title) => {
      let deleteIndex = state.dataList.findIndex((item) => {
        return item.title == title;
      });
      state.dataList.splice(deleteIndex, 1);
      localStorage.setItem("dataList",JSON.stringify(state.dataList))
    },
    CHANGE_DATALIST_ISREADE: (state, data) => {
      let dataListIndex = state.dataList.findIndex((item) => {
        return item.title == data.title;
      });

      console.log(dataListIndex);
      let itemIndex = state.dataList[dataListIndex].list.findIndex((item) => {
        return item.title == data.item_title;
      });
      state.dataList[dataListIndex].list[itemIndex].checkReadStatus =data.checkReadStatus;
      localStorage.setItem("dataList",JSON.stringify(state.dataList))
    },
  },
  actions: {
    dataListInit: ({ commit }) => {
      return new Promise((resolve, reject) => {
        try {
          getData("https://sspai.com/feed").then((res) => {
            res = {
              title: "少数派",
              xmlUrl: "https://sspai.com/feed",
              list: changeData(res.data),
            };
            commit("SET_DATALIST", res);
            resolve(res);
          });
        } catch (err) {
          reject(err);
        }
      });
    },
    dataListAdd: ({ commit }, source) => {
      return new Promise((resolve, reject) => {
        getData(source.xmlUrl)
          .then((res) => {
            res = {
              title: source.title,
              xmlUrl: source.xmlUrl,
              list: changeData(res.data),
            };
            commit("SET_DATALIST", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {},
});
