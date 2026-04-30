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
