<script setup>
import { ref } from 'vue'

import CreateNoteComponent from './components/CreateNoteComponent.vue'
import ReadAllNotesComponent from './components/ReadAllNotesComponent.vue'

const readAllNotesRef = ref(true)

function readAllNotes() {
  readAllNotesRef.value.readAllNotes()
}
</script>

<template>
  <h1>Notes</h1>

  <CreateNoteComponent @isNoteCreated="readAllNotes" />
  <ReadAllNotesComponent ref="readAllNotesRef" />
</template>

<style>
body {
  background-color: aliceblue;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1000px;
  margin-left:auto;
  margin-right:auto;
  text-align: center;
  color: darkslategrey;
  margin-top: 60px;
}

#app, input {
  font-family: Serif, sans-serif, Arial;
}

input {
  font-size: 16px;
}

button {
  font-weight: bold;
}
</style>
