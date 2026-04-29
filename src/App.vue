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
</style>
