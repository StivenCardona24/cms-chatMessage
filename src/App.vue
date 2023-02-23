<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, reactive, ref } from "vue";
import { useLoginStore } from "@/stores/auth"

const LoginStore = useLoginStore();
const {loadUser} = LoginStore;

onMounted(() =>{
  loadUser();
});

</script>

<template>




      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->

  <RouterView />
</template>

