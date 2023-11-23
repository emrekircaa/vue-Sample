<template>
  <v-navigation-drawer v-model="commonStore.drawer" location="left">
    <template v-slot:prepend v-if="route.path !== '/'">
      <v-list-item
        lines="two"
        class="break-normal"
        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
        :title="profileStore.userData.name"
        :subtitle="profileStore.userData.email"
        rounded="0"
      ></v-list-item>
    </template>
    <v-divider class="border-opacity-75 mx-4 mb-14"></v-divider>
    <v-list class="!p-0" density="compact" nav v-if="route.path !== '/'">
      <v-list-item
        :prepend-icon="IconChecklist"
        title="Todo"
        class="pl-6"
        color="#4F359B"
        rounded="0"
        :to="{ name: 'todo', params: { userId: $route.params.userId } }"
      ></v-list-item>
      <v-list-item
        :prepend-icon="IconNotebook"
        title="Post"
        class="pl-6"
        color="#4F359B"
        rounded="0"
        :to="{ name: 'posts', params: { userId: $route.params.userId } }"
      ></v-list-item>
      <v-list-item
        :prepend-icon="IconPhotoHeart"
        title="Albums"
        class="pl-6"
        color="#4F359B"
        rounded="0"
        :to="{ name: 'albumsview', params: { userId: $route.params.userId } }"
      ></v-list-item>
    </v-list>
    <v-list density="compact" nav v-if="route.path === '/'">
      <v-list-item
        :prepend-icon="IconUsers"
        title="Users"
        class="pl-6"
        color="#4F359B"
        rounded="0"
        to="/"
      ></v-list-item>
      <!-- :to="{ name: 'users' }" -->
    </v-list>
    <template v-slot:append>
      <v-divider class="border-opacity-75 mx-4 mb-2"></v-divider>
    </template>
  </v-navigation-drawer>
</template>
<script setup>
import {
  IconChecklist,
  IconNotebook,
  IconPhotoHeart,
  IconUsers,
} from "@tabler/icons-vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useProfileStore } from "../stores/profile";
import { useCommonStore } from "../stores/common";
import axios from "axios";

const commonStore = useCommonStore();

const profileStore = useProfileStore();
const route = useRoute();

const fetchData = async (newVal) => {
  try {
    const apiResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${newVal}`
    );
    profileStore.userData = apiResponse.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

watch(
  () => route.params.userId,
  (newVal) => {
    newVal && fetchData(newVal);
  }
);
</script>
