export class Api {
  baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  notesUrl = `${this.baseUrl}/api/v1/notes`

  createNote(title, description) {
    return fetch(
        this.notesUrl,
      { method: 'post' , headers: { 'Access-Control-Allow-Origin': '*' , 'Content-type': 'application/json' },
        body: JSON.stringify({ title: title, description: description })
      })
  }

  readAllNotes() {
    return fetch(this.notesUrl)
  }

  deleteNote(id) {
    return fetch(`${this.notesUrl}/${id}`, { method: 'delete' })
  }

  uploadImage(id, image) {
    const formData = new FormData()
    formData.append('image', image)

    return fetch(`${this.notesUrl}/${id}/images`, {
      method: 'post',
      body: formData
    })
  }

  downloadImage(id) {
    return fetch(`${this.notesUrl}/${id}/images`)
  }

  deleteImage(id) {
    return fetch(`${this.notesUrl}/${id}/images`, { method: 'delete' })
  }
}
