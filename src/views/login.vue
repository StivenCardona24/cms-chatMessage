

<template >
  <div class="login">
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

  </div>
</template>

<script setup lang="ts">

import router from "@/router";
import { useLoginStore } from "@/stores/auth";
import { ElLoading, ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
const LoginStore = useLoginStore();
const { login, messageBoxRef, person } = storeToRefs(LoginStore);
const { validateLogin } = LoginStore;

const loginValidate = async () => {
      await validateLogin();

       ElMessage({
        type: `${messageBoxRef.value.type}`,
        message: `${messageBoxRef.value.message}`,
      });
};

onMounted(() => {
  if (!person.value &&  router.currentRoute.value.path != "/") {
   router.push('/')
  } 
  else if(person.value &&  router.currentRoute.value.path == '/'){
   router.push('/home')
  }
});

</script>

<style scoped>


.login {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}


</style>