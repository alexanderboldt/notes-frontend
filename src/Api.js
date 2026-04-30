export class Api {
    baseUrl = import.meta.env.VITE_BACKEND_BASE_URL

    createNote(title, description) {
        return fetch(
            this.baseUrl + '/api/v1/notes',
            { method: 'post' , headers: { 'Access-Control-Allow-Origin': '*' , 'Content-type': 'application/json', },
                body: JSON.stringify({ title: title, description: description })
            })
    }

    readAllNotes() {
        return fetch(this.baseUrl + '/api/v1/notes')
    }

    deleteNote(id) {
        return fetch(this.baseUrl + '/api/v1/notes/' + id, { method: 'delete' })
    }
}
