import { defineStore } from "pinia";
import { createCrud } from "@/api/crud";
import { reactive, ref } from "vue";
import type { Login } from "@/interfaces/auth.interface";
import type { Person } from "@/interfaces/person.interface";
import type { MessageBoxRef } from "@/interfaces/messageBox.interface";

const newLogin = (): Login => ({
  email: "",
  password: "",
});

export const useLoginStore = defineStore("login", () => {
  const messageBoxRef = ref<MessageBoxRef>();
  const person = ref<Person>(null);
  const login = ref<Login>(newLogin());

  const { 
    create: createLogin 
  } = createCrud({ resource: "login"});

  const { 
    create: createLogout
  } = createCrud ({resource: "logout"});



  const validateLogin = async () => {
    if (!login.value) {
        messageBoxRef.value = {
            type: "warning",
            message: `Enter email and password `,
          };
      return messageBoxRef;
    }else{
      console.log(login.value);
      const reponse = await createLogin(login.value);
      console.log(reponse);
      if(reponse.login){
        person.value = reponse.login
        setTimeout(()=>{
          updateLocalStorage();
          window.location.href = "/chat";
        },500)
        messageBoxRef.value = {
            type: "success",
            message: `Has iniciado sesión correctamente ${person.value.name} `,
          };
      }
      else{
        let word = reponse.message
        messageBoxRef.value = {
          type: "warning",
          message: word,
        };

      }
    }
  };

  const logout = async () => {
    if(!user.value){
      return messageBoxRef.value = {
        type: "error",
        message: `Usuario incorrecto`,
      };
    }
    const reponse = await createLogout(user.value);

    if(reponse.message == "logout"){
      messageBoxRef.value = {
        type: "success",
        message: `Has cerrado sesión correctamente `,
      };
      user.value = null;
      updateLocalStorage();
    }
  }

  const updateLocalStorage = () => {
    localStorage.setItem('PersonChat', JSON.stringify(user.value));  
  };

  const loadUser = () => {
    if(localStorage.getItem('PersonChat') != null){
      user.value = JSON.parse(localStorage.getItem('PersonChat'))
    }
    else{
      user.value = null;
    }
  }

  return {
    login,
    person,
    messageBoxRef,
    createLogin,
    createLogout,
    validateLogin,
    logout,
    loadUser
  };
});
