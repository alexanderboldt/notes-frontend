export class Api {
    baseUrl = process.env.VUE_APP_BACKEND_BASE_URL

    readAllNotes() {
        return fetch(this.baseUrl + '/api/v1/notes')
    }

    deleteNote(id) {
        return fetch(this.baseUrl + '/api/v1/notes/' + id, { method: 'delete' })
    }
}