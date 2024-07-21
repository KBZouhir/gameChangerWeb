import { defineStore } from "pinia";

export const usePostStore = defineStore("PostStore", {
  state: () => ({
    posts: null,
  }),
  getters: {
    getPosts: (state) => state.posts,
  },
  actions: {
    setPosts(posts) {
      this.posts = posts;
    },
  },
});
