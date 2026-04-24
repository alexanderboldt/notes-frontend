<template>
  <h1>Notes</h1>

  <div style="width: 1000px; margin-left:auto; margin-right:auto;">
    <div v-if="responseSuccessful">
      <div class="note" v-for="note in notes" :key="note.id">
        <h2>{{ note.title }}</h2>
        <div>{{ note.description }}</div>
      </div>
    </div>
    <div v-else>Could not load notes!</div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
</script>

<script>
import { ref } from 'vue'

const responseSuccessful = ref(true);
const notes = ref();
const responseError = ref();

fetch('http://localhost:4000/api/v1/notes')
    .then(response => {
      responseSuccessful.value = response.status === 200;
      return response.json();
    }).then(data => notes.value = data)
    .catch(error => responseError.value = error);
</script>

<style>
body {
  background-color: aliceblue;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: darkslategrey;
  margin-top: 60px;
}

.note {
  text-align: left;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 0px 12px 12px;
  margin-bottom: 12px;
  color: darkslategrey;
}
</style>
