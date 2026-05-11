export class Api {
  baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  notesUrl = `${this.baseUrl}/api/v1/notes`

  createNote(title, description) {
    return fetch(
        this.notesUrl,
      { method: 'post' , headers: { 'Access-Control-Allow-Origin': '*' , 'Content-type': 'application/json', },
        body: JSON.stringify({ title: title, description: description })
      })
  }

  readAllNotes() {
    return fetch(this.notesUrl)
  }

  deleteNote(id) {
    return fetch(`${this.notesUrl}/${id}`, { method: 'delete' })
  }

  downloadImage(id) {
    return fetch(`${this.notesUrl}/${id}/images`)
  }
}
