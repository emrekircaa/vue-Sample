<template>
  <v-row>
    <v-col v-for="n in dataList" :key="n" cols="4">
      <v-hover v-slot="{ isHovering, props }" open-delay="100">
        <v-card
          v-bind="props"
          class="mx-auto py-6 px-6 !border !border-solid !border-border"
          max-width="auto"
          :elevation="isHovering ? 8 : 0"
          :class="isHovering ? 'primary' : undefined"
          @click="goDetail(n.id, n)"
        >
          <div>
            <div class="w-24 h-24 rounded-full d-flex">
              <img
                src="https://randomuser.me/api/portraits/women/81.jpg"
                class="rounded-circle"
              />
              <div>
                <v-card-title class="text-title">{{ n.name }}</v-card-title>
                <v-card-subtitle>
                  <p class="font-weight-light text-subtitle">{{ n.email }}</p>
                  <p class="font-weight-light text-subtitle">
                    {{ n.phone }}
                  </p></v-card-subtitle
                >
              </div>
            </div>
          </div>
          <div class="mt-8">
            <div class="d-flex">
              <div class="mr-3 mb-2">
                <IconMapPinHeart></IconMapPinHeart>
              </div>
              <p class="text-base font-weight-medium text-title">Location</p>
            </div>
            <div>
              <p
                class="font-light font-weight-light text-subtitle text-subtitle-2 text-gray"
              >
                {{ n.address.street }}
              </p>
              <p
                class="font-light font-weight-light text-subtitle text-subtitle-2"
              >
                {{ n.address.city }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <div class="d-flex">
              <div class="mr-3 mb-2">
                <IconBuildingSkyscraper></IconBuildingSkyscraper>
              </div>
              <p class="text-base font-weight-medium text-title">Company</p>
            </div>
            <div>
              <p
                class="font-light font-weight-light text-subtitle text-subtitle-2"
              >
                {{ n.company.name }}
              </p>
              <p
                class="font-light font-weight-light text-subtitle text-subtitle-2"
              >
                {{ n.company.catchPhrase }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <div class="d-flex">
              <div class="mr-3 mb-2"><IconWorldShare></IconWorldShare></div>
              <p class="text-base font-weight-medium text-title">Website</p>
            </div>
            <div>
              <p
                class="font-light font-weight-light text-subtitle text-subtitle-2"
              >
                {{ n.website }}
              </p>
            </div>
          </div>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import {
  IconMapPinHeart,
  IconBuildingSkyscraper,
  IconWorldShare,
} from "@tabler/icons-vue";
import { useProfileStore } from "../stores/profile";

const profileStore = useProfileStore();
const router = useRouter();
const dataList = ref([]);
const fetchData = async () => {
  try {
    const apiResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dataList.value = apiResponse.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
onMounted(() => {
  fetchData();
});
const goDetail = (userID, user) => {
  profileStore.userData = user;
  router.push({
    name: "todo",
    params: { userId: userID },
  });
};
</script>
