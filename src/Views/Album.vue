<template>
  <v-row>
    <v-col v-for="item in dataList" :key="item" cols="4">
      <v-hover v-slot="{ isHovering, props }" open-delay="100">
        <v-card
          v-bind="props"
          class="mx-auto py-6 px-6 !border !border-solid !border-border rounded-lg"
          max-width="auto"
          :elevation="isHovering ? 8 : 0"
          :class="isHovering ? 'primary' : undefined"
          @click="goDetail(item.id)"
        >
          <div class="grid grid-cols-2 grid-rows-2">
            <img :src="item.url" />
            <img :src="item.url" />
            <img :src="item.url" />
            <img :src="item.url" />
          </div>
          <div
            class="text-subtitle-2 font-weight-regular font-secondary text-title mt-4"
          >
            {{ item.title }}
          </div>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const dataList = ref([]);

const fetchData = async () => {
  try {
    const apiResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/?userId=${route.params.userId}&albumId=1`
    );
    dataList.value = apiResponse.data.slice(0, 10);
  } catch (error) {}
};
onMounted(() => {
  fetchData();
});

const goDetail = (userID) => {
  router.push({ name: "photos", params: { albumId: userID } });
};
</script>
