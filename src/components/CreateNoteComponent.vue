<script setup>
import { ref } from "vue"
import { Api } from "@/Api"

const api = new Api()

const emit = defineEmits(['isNoteCreated'])

const title = ref('')
const description = ref('')

function createNote() {
  api
      .createNote(title.value, description.value)
      .then(() => {
        title.value = ''
        description.value = ''

        emit('isNoteCreated', true)
      }).catch(error => console.log(error))
}
</script>

<template>
  <div style="display: grid">
    <input v-model="title" placeholder="Title" style="margin-bottom: 6px">
    <input v-model="description" placeholder="Description" style="margin-bottom: 6px">
    <button id="create" @click="createNote" style="margin-bottom: 12px" :disabled="title.length === 0">CREATE</button>
  </div>
</template>

<style scoped>
button#create {
  color: white;
  background-color: darkslategrey;
}
button#create:disabled {
  background-color: slategrey;
}
button#create:hover {
  background-color: slategrey;
}
button#create:active {
  background-color: darkslategrey;
}
</style>
