import { defineStore } from 'pinia';

export const useConferenceStore = defineStore('conferenceStore', {
  state: () => ({
    conferenceList: [],
  }),
  getters: {
    getConferenceList: (state) => state.conferenceList,
  },
  actions: {
    setConferenceList(conferenceList) {
      this.conferenceList = conferenceList;
    }
  },
});
