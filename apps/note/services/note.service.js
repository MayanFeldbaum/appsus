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

function query(filterBy) {
    return asyncStorageService.query(NOTES_KEY)
        .then(notes => {
            if (filterBy) {
                const regex = new RegExp(filterBy, 'i')
                notes = notes.filter(note => regex.test(note.info.txt))
            }
            return notes
        })
}

function get(noteId) {
    return asyncStorageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTES_KEY, note)
    } else {
        return asyncStorageService.post(NOTES_KEY, note)
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
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n107",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "i am second!"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n102",
                type: "note-img",
                info: {
                    url: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
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