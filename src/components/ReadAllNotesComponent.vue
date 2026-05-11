<script setup>
import { reactive } from "vue"
import { Api } from "../Api"

const api = new Api()

const response = reactive({
  isSuccessful: true,
  notes: null,
  notesAvailable: false
})

const images = reactive({})

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

        // download images for each note
        data.forEach(note => {
          if (note.filename != null) {
            downloadImage(note.id)
          }
        })
      }).catch(error => console.log(error))
}

function deleteNote(id) {
  api
      .deleteNote(id)
      .then(() => readAllNotes())
}

function downloadImage(id) {
  api
      .downloadImage(id)
      .then(res => res.blob())
      .then(data => images[id] = URL.createObjectURL(data))
      .catch(error => console.log(error))
}

defineExpose({readAllNotes})
</script>

<template>
  <div v-if="response.isSuccessful">
    <div v-if="response.notesAvailable">
      <div class="noteRow" v-for="note in response.notes" :key="note.id">
        <img v-if="note.filename != null" :src="images[note.id]" alt="Image of Note" width="200px" height="200px">
        <div class="noteContent">
          <p>{{ new Date(note.createdAt).toLocaleString() }}</p>
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
.noteRow {
  display: flex;
  text-align: left;
  border: 1px solid lightgray;
  border-radius: var(--border-radius);
  padding: 0px 0px 0px 0px;
  margin-bottom: 12px;
  color: darkslategrey;
}

.noteRow img {
  border-radius: var(--border-radius) 0px 0px var(--border-radius);
}

div.noteContent {
  flex: 1;
  margin-left: 16px;
}

button.delete {
  color: white;
  background-color: crimson;
  height: 48px;
  border-radius: 0px var(--border-radius);
  cursor: pointer;
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
