import { defineStore } from "pinia";
import { createCrud } from "../api/crud";
import { reactive, ref } from "vue";
import type { Person } from "@/interfaces/person.interface";
import type { messageBoxRef } from "@/interfaces/messageBox.interface";

const newPerson = (): Person => ({
  name: "",
  email: "",
  password: "",
});

export const usePersonStore = defineStore("person", () => {
  const messageBoxRef = ref<MessageBoxRef>();
  const persons = ref<Person[]>([]);
  const currentPerson = ref<Person>(newPerson());

  const {
    getAll: loadApi,
    create: createApi,
    update: updateApi,
    deleteOne: deleteApi,
  } = createCrud({ resource: "person" });

  const createNewPerson = () => {
    currentPerson.value = newPerson();
  };

  const loadPersons = async () => {
    persons.value =  await loadApi();
    console.log(persons.value);
    
  };

  const savePerson = async () => {
    if (!currentPerson.value) {
      return messageBoxRef;
    }
    if (!currentPerson.value.id) {
      await createApi(currentPerson.value);
      messageBoxRef.value = {
        type: "success",
        message: `La Persona ${currentPerson.value.name} a sido creado correctamente`,
      };
    } else {
      await updateApi(currentPerson.value.id, currentPerson.value);
      messageBoxRef.value = {
        type: "success",
        message: `La Persona ${currentPerson.value.name} se actualizo correctamente`,
      };
    }
    await loadPersons();
  };

  const editPerson = (Person: Person) => {
    currentPerson.value = JSON.parse(JSON.stringify(Person));
  };

  const deletePerson = async (Person: Person) => {
    currentPerson.value = JSON.parse(JSON.stringify(Person));
    await deleteApi(currentPerson.value.id);
    await loadPersons();
  };
  return {
    persons,
    currentPerson,
    messageBoxRef,
    createNewPerson,
    savePerson,
    editPerson,
    loadPersons,
    deletePerson,
  };
});
