// import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'

const NOTES_KEY = 'notesDB'
_createNotes()

export const notesService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
    return asyncStorageService.query(NOTES_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regex.test(note.title))
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function getDefaultFilter() {
    return { txt: ''}
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        const notes = [
            {
                id: "n101",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "i am first!"
                }
            },
            {
                id: "n104",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "i am second!"
                }
            },
            // {
            //     id: "n102",
            //     type: "note-img",
            //     info: {
            //         url: "http://some-img/me",
            //         title: "Bobi and Me"
            //     },
            //     style: {
            //         backgroundColor: "#00d"
            //     }
            // },
            // {
            //     id: "n103",
            //     type: "note-todos",
            //     info: {
            //         label: "Get my stuff together", todos: [
            //             { txt: "Driving liscence", doneAt: null },
            //             { txt: "Coding power", doneAt: 187111111 }]
            //     }
            // }
        ]
        storageService.saveToStorage(NOTES_KEY, notes)
    }
}