<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 bg-light">
          <div class="d-flex justify-content-between align-items-center p-3">
            <h3>Amigos</h3>
            <button class="btn btn-primary" @click="showAddFriendModal = true">Agregar amigo</button>
          </div>
          <hr>
          <div class="p-3">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Buscar amigos">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">Buscar</button>
              </div>
            </div>
            <ul class="list-group">
              <li class="list-group-item" v-for="(friend, index) in persons" :key="index">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <!-- <img :src="friend.avatar" class="rounded-circle mr-3" width="50" height="50" alt="Avatar"> -->
                    <div>
                      <h6 class="mb-0">{{ friend.name }}</h6>
                      <small class="text-muted">{{ friend.email }}</small>
                    </div>
                  </div>
                  <div>
                    <button class="btn btn-sm btn-secondary" @click="startChat(friend)">Chatear</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div class="d-flex justify-content-between align-items-center p-3 bg-light">
            <h3 v-if="currentChat">Chat con {{ currentChat.name }}</h3>
            <div v-else>
              <h3>Bienvenido al chat</h3>
              <p>Seleccione un amigo para comenzar a chatear</p>
            </div>
            <button class="btn btn-primary" v-if="currentChat" @click="showAddFriendModal = true">Agregar amigo</button>
          </div>
          <div class="p-3 chat-container" v-if="currentChat">
            <div class="message" v-for="(message, index) in messages" :key="index" :class="{ 'sent': message.sentByMe }">
              <div class="message-content">
                {{ message.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <add-friend-modal v-if="showAddFriendModal" @close="showAddFriendModal = false" /> -->
    </div>
  </template>

<script setup lang="ts">

import { storeToRefs } from "pinia";
import router from "@/router";
import { usePersonStore } from "@/stores/Person";
import { ElLoading, ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
const PersonStore = usePersonStore();
const { persons} = storeToRefs(PersonStore);

const currentChat = ref(null);

const messages= [
    { content: 'Hola, ¿cómo estás?', sentByMe: false },
    { content: 'Muy bien, gracias. ¿Y tú?', sentByMe: true },
    { content: 'Bien también. ¿Qué planes tienes para hoy?', sentByMe: false },
    { content: 'Nada en especial, ¿tú?', sentByMe: true },
    { content: 'Pensaba ir al cine esta tarde, ¿quieres venir?', sentByMe: false }
  ];

const showAddFriendModal =  ref(false);

function startChat(person:any){
    console.log("holaaa");
    currentChat.value = person;
    console.log(currentChat);
}


</script>

<style scoped>
.chat-container {
  height: 400px;
  overflow-y: auto;
}

.message {
  max-width: 70%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  color: white;
}

.message.sent {
  background-color: #007bff;
  align-self: flex-end;
}

.message.received {
  background-color: #6c757d;
}

.message-content {
  font-size: 1.2rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #f2f2f2;
}
</style>