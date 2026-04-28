<template>
  <h1>Notes</h1>

  <div v-if="responseSuccessful">
    <div class="note" v-for="note in notes" :key="note.id">
      <div style="display: flex">
        <div style="flex: 1">
          <h2>{{ note.title }}</h2>
          <div>{{ note.description }}</div>
        </div>
        <button class="delete" @click="deleteNote(note.id)">DELETE</button>
      </div>
    </div>
  </div>
  <div v-else>Could not load notes!</div>
</template>

<script setup>
import { ref } from 'vue'
import { Api } from '@/Api';

const responseSuccessful = ref(true);
const notes = ref();
const responseError = ref();

const api = new Api()

readAllNotes()

function readAllNotes() {
  api
      .readAllNotes()
      .then(response => {
        responseSuccessful.value = response.status === 200;
        return response.json();
      }).then(data => notes.value = data)
      .catch(error => responseError.value = error);
}

function deleteNote(id) {
  api
      .deleteNote(id)
      .then(() => readAllNotes());
}
</script>

<style>
body {
  background-color: aliceblue;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1000px;
  margin-left:auto;
  margin-right:auto;
  text-align: center;
  color: darkslategrey;
  margin-top: 60px;
}

.note {
  text-align: left;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 0px 0px 12px 12px;
  margin-bottom: 12px;
  color: darkslategrey;
}

.delete {
  color: white;
  background-color: crimson;
  width: 68px;
  height: 48px;
  border-radius: 0px 8px;
  border: none;
}

.delete:hover {
  background-color: brown;
}

.delete:active {
  background-color: crimson;
}
</style>
