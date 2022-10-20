import { createStore } from 'vuex'

export default createStore({
  state: {
    dataList:[
      {title:"少数派",xmlUrl:"https://sspai.com/feed",list:[]},
      {title:"Hacker News",xmlUrl:"https://hnrss.org/newest",list:[]}
    ],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
