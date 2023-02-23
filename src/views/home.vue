<template>
  <NavHeader />
</template>

<script setup lang="ts">
import  NavHeader  from "../components/NavHeader.vue";
import router from "@/router";
import { useLoginStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";

const LoginStore = useLoginStore();
const { login, messageBoxRef, person } = storeToRefs(LoginStore);
const { validateLogin } = LoginStore;

onMounted(() => {
  if (!person.value &&  router.currentRoute.value.path != "/") {
   router.push('/')
  } 
  else if(person.value &&  router.currentRoute.value.path == '/'){
   router.push('/home')
  }
});
</script>