<template>
  <v-app-bar elevation="0">
    <v-btn size="36" @click="commonStore.drawer = !commonStore.drawer">
      <IconMenu2></IconMenu2>
    </v-btn>
    <v-btn @click="router.go(-1)" v-if="route.path !== '/'"
      ><IconSquareRoundedArrowLeft
        v-if="titles[route.name] !== 'users'"
      ></IconSquareRoundedArrowLeft>
      <v-app-bar-title class="text-h6 font-weight-medium ml-6">{{
        titles[route.name] ? titles[route.name] : "All Users"
      }}</v-app-bar-title>
    </v-btn>
  </v-app-bar>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { IconMenu2, IconSquareRoundedArrowLeft } from "@tabler/icons-vue";
import { useCommonStore } from "../stores/common";

const commonStore = useCommonStore();
const route = useRoute();
const router = useRouter();

const titles = ref({
  users: "All Users",
  todo: "Go Back",
  posts: "Go Back",
  albums: "Go Back",
  photos: "Go Albums",
});
</script>
