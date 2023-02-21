

<template>
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="">
        <img class="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
  
        <div class="form-floating">
          <input v-model="login.email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required>
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input v-model="login.password" type="password" class="form-control" id="floatingPassword" placeholder="Password" required>
          <label for="floatingPassword">Password</label>
        </div>
  
        <!-- <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div> -->
        <button class="w-100 btn btn-lg btn-primary" id="liveToastBtn" @click="loginValidate">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
      </form>
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img src="..." class="rounded me-2" alt="...">
      <strong class="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</div>
    </main>
</template>

<script setup lang="ts">
import { useLoginStore } from "@/stores/auth";
import type { FormInstance, FormRules } from "element-plus";
import { ElLoading, ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
const LoginStore = useLoginStore();
const { login, messageBoxRef } = storeToRefs(LoginStore);
const { validateLogin } = LoginStore;

const formRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: "Por favor ingrese el correo",
      trigger: "blur",
    },
    {
      pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
      message: "Porfavor Ingrese un correo valido",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Por favor ingrese la contraseña",
      trigger: "blur",
    },
  ],
});


const loginValidate = async () => {
      await validateLogin();

       ElMessage({
        type: `${messageBoxRef.value.type}`,
        message: `${messageBoxRef.value.message}`,
      });
};

</script>
