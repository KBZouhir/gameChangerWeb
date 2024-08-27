import { defineStore } from "pinia";

export const usePostStore = defineStore("PostStore", {
  state: () => ({
    posts: [],
  }),
  getters: {
    getPosts: (state) => state.posts,
  },
  actions: {
    setPosts(posts) {
      this.posts = posts;
    },

    addPost(newPost) {
      this.posts?.data?.push(newPost);
    },
    removePost(index) {
      this.posts?.data?.splice(index, 1);
    },
  },
})
