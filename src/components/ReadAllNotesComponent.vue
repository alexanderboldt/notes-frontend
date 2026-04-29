<script setup>
import { reactive } from "vue";
import { Api } from "@/Api";

const api = new Api()

const response = reactive({
  isSuccessful: true,
  notes: null,
})

readAllNotes()

function readAllNotes() {
  api
      .readAllNotes()
      .then(res => {
        response.isSuccessful = res.status === 200;
        return res.json();
      }).then(data => response.notes = data)
      .catch(error => console.log(error));
}

function deleteNote(id) {
  api
      .deleteNote(id)
      .then(() => readAllNotes());
}

defineExpose({readAllNotes})
</script>

<template>
  <div v-if="response.isSuccessful">
    <div class="note" v-for="note in response.notes" :key="note.id">
      <div style="display: flex">
        <div style="flex: 1">
          <h2>{{ note.title }}</h2>
          <div>{{ note.description }}</div>
        </div>
        <button class="delete" @click="deleteNote(note.id)">DELETE</button>
      </div>
    </div>
  </div>
  <div v-else style="margin-top: 12px;">Could not load notes!</div>
</template>

<style scoped>
div.note {
  text-align: left;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 0px 0px 12px 12px;
  margin-bottom: 12px;
  color: darkslategrey;
}

button.delete {
  color: white;
  background-color: crimson;
  width: 68px;
  height: 48px;
  padding: 12px;
  border-radius: 0px 8px;
  border: none;
}

button.delete:hover {
  background-color: brown;
}

button.delete:active {
  background-color: crimson;
}
</style>
