<script setup>
import SideMenu from "./components/SideMenu.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <v-app>
    <SideMenu />
    <Header />
    <v-main>
      <div class="p-5">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>
