<script setup>
import { reactive, ref } from "vue"
import { Api } from "@/Api"

const api = new Api()

const response = reactive({
  isSuccessful: true,
  notes: null,
  notesAvailable: false
})

readAllNotes()

function readAllNotes() {
  api
      .readAllNotes()
      .then(res => {
        response.isSuccessful = res.status === 200;
        return res.json()
      }).then(data => {
        response.notes = data
        response.notesAvailable = data.length > 0
      }).catch(error => console.log(error))
}

function deleteNote(id) {
  api
      .deleteNote(id)
      .then(() => readAllNotes())
}

defineExpose({readAllNotes})
</script>

<template>
  <div v-if="response.isSuccessful">
    <div v-if="response.notesAvailable">
      <div class="noteRow" v-for="note in response.notes" :key="note.id">
        <div class="noteContent">
          <h2>{{ note.title }}</h2>
          <div><p>{{ note.description }}</p></div>
        </div>
        <button class="delete" @click="deleteNote(note.id)">DELETE</button>
      </div>
    </div>
    <p v-else class="message">No notes available! Create some.</p>
  </div>
  <p v-else class="message">Could not load notes!</p>

</template>

<style scoped>
div.noteRow {
  display: flex;
  text-align: left;
  border: 1px solid lightgray;
  border-radius: var(--border-radius);
  padding: 0px 0px 12px 12px;
  margin-bottom: 12px;
  color: darkslategrey;
}

div.noteContent {
  flex: 1;
}

button.delete {
  color: white;
  background-color: crimson;
  height: 48px;
  border-radius: 0px var(--border-radius);
}
button.delete:hover {
  background-color: brown;
}
button.delete:active {
  background-color: crimson;
}

p.message {
  margin-top: 12px;
  font-size: 20px;
}
</style>
