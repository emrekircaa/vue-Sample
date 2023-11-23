<template>
  <div class="mt-9">
    <div v-for="item in dataList" :key="item.id">
      <v-card-title class="text-title">{{ item.title }}</v-card-title>
      <v-card-subtitle class="mb-4">
        <p class="font-weight-regular text-subtitle" v-html="item.body"></p>
      </v-card-subtitle>
      <v-card-actions class="flex-row justify-end">
        <v-btn @click="openDetail(item.id)">
          <v-spacer>See More</v-spacer>
          <IconSquareRoundedArrowRight
            class="ml-6 text-primary"
          ></IconSquareRoundedArrowRight>
        </v-btn>
      </v-card-actions>
      <v-divider class="border-opacity-75 mx-4 mt-5"></v-divider>
    </div>
  </div>
  <PostDialog toogle="closeDetail" :dialog="dialog" ref="postDialogRef" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { IconSquareRoundedArrowRight } from "@tabler/icons-vue";
import PostDialog from "../components/PostDialog.vue";
const currentRoute = useRoute();
const dialog = ref(false);
const dataList = ref([]);
const postDialogRef = ref();
const fetchData = async () => {
  try {
    const apiResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${currentRoute.params.userId}`
    );
    dataList.value = apiResponse.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
onMounted(() => {
  fetchData();
});
const openDetail = (postID) => {
  postDialogRef.value.showDialog(postID);
};
</script>
