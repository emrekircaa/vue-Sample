<template>
  <v-dialog width="1024" height="609" v-model="dialog" scrollable>
    <v-card title="">
      <div class="d-flex flex-row justify-between mx-6 mt-6 mb-1">
        <div class="text-2xl font-weight-medium">{{ dataDetail.title }}</div>
        <button @click="dialog = false">
          <IconSquareRoundedX></IconSquareRoundedX>
        </button>
      </div>
      <v-card-text>
        <v-row class="h-full">
          <v-col cols="7" class="h-full overflow-auto">
            <div
              class="font-weight-regular text-subtitle text-body-2 tracking-[.28px]"
            >
              {{ dataDetail.body }}
            </div>
          </v-col>
          <v-divider vertical class="border-opacity-75"></v-divider>
          <v-col cols="5" class="h-full overflow-auto">
            <div class="text-h6 font-weight-regular">Comments</div>
            <div class="flex" v-for="items in dataDetailComments">
              <div class="w-11 h-11 shrink-0">
                <img src="../assets/Ellipse 22.png" />
              </div>
              <div class="ml-4">
                <div class="font-weight-medium text-body-2 mb-1">
                  {{ items.name }}
                </div>
                <div
                  class="font-secondaryFont text-body-2 font-weight-regular text-subtitle w-[300]"
                >
                  {{ items.body }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import { IconSquareRoundedX } from "@tabler/icons-vue";
import axios from "axios";
const dialog = ref(false);
const dataDetail = ref([]);
const dataDetailComments = ref([]);

const fetchData = async (postID) => {
  try {
    const apiResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postID}`
    );
    const commentResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postID}/comments`
    );
    dataDetailComments.value = commentResponse.data;
    dataDetail.value = apiResponse.data;
  } catch (error) {}
};
const showDialog = (postID) => {
  fetchData(postID);
  dialog.value = true;
};
defineExpose({ showDialog });
</script>
