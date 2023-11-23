<template>
  <div class="masonry">
    <figure v-for="image in dataList" :key="image.id">
      <img :src="image.thumbnailUrl" alt="" />
    </figure>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const dataList = ref([]);

const fetchData = async () => {
  try {
    const apiResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/?userId=${1}&albumId=1`
    );
    dataList.value = apiResponse.data;
  } catch (error) {}
};
onMounted(() => {
  fetchData();
});
</script>
