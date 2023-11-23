<template>
  <div class="mt-9">
    <div v-for="item in dataList" :key="item.id">
      <v-checkbox
        :label="item.title"
        color="#4F359B"
        class="font-weight-regular text-body-2 h-12"
        v-model="item.checked"
        @click="toggleItemCheck(item)"
      ></v-checkbox>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const dataList = ref([]);
const currentRoute = useRoute();
const fetchData = async () => {
  try {
    const savedData = JSON.parse(
      localStorage.getItem(`savedData_${currentRoute.params.userId}`)
    );

    let response;
    if (savedData) {
      const apiResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${currentRoute.params.userId}/posts`
      );
      const checkedIds = savedData
        .filter((item) => item.checked)
        .map((item) => item.id);
      const updatedData = apiResponse.data.map((item) => {
        return {
          ...item,
          checked: checkedIds.includes(item.id),
        };
      });
      dataList.value = updatedData;
    } else {
      response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${currentRoute.params.userId}/posts`
      );
      dataList.value = response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

onMounted(() => {
  fetchData();
});

const toggleItemCheck = (item) => {
  item.checked = !item.checked;
  updateLocalStorage();
};

const updateLocalStorage = () => {
  localStorage.setItem(
    `savedData_${currentRoute.params.userId}`,
    JSON.stringify(dataList.value)
  );
};
</script>
