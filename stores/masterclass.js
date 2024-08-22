import { defineStore } from 'pinia';

export const useMasterClassStore = defineStore('masterclassStore', {
  state: () => ({
    masterClassList: [],
  }),
  getters: {
    getMasterClassList: (state) => state.masterClassList,
  },
  actions: {
    setMasterClassList(masterClassList) {
      this.masterClassList = masterClassList;
    }
  },
});
