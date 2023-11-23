import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore(
  "profile",
  () => {
    const userData = ref();
    return { userData };
  },
  { persist: true }
);
