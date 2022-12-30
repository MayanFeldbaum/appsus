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
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regex.test(note.info.txt))
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type ===filterBy.type)
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
    return { txt: '', type:''}
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
                    txt: "find hotel recommendations in Portugal"
                },
                style: {
                    backgroundColor: "rgb(209,179,179)",
                    fontFamily: "Arial"
                },
                createdAt: new Date().toLocaleDateString()
            },
            {
                id: "n102",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Buy a birthday gift for Sarah"
                },
                style: {
                    backgroundColor: "#dda15e",
                    fontFamily: "Arial"
                },
                createdAt: new Date().toLocaleDateString()
            },
            {
                id: "n103",
                type: "note-img",
                info: {
                    url: "https://images.unsplash.com/photo-1582911131929-b5fa50720002?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                    title: "Image"
                },
                style: {
                    backgroundColor: "#f4f3ee",
                    fontFamily: "Arial"
                },
                createdAt: new Date().toLocaleDateString()
            },
            {
                id: "n104",
                type: "note-todos",
                info: {
                    label: "Get my stuff together",
                     todos: [
                        { txt: "Milk"},
                        { txt: "Eggs"},
                        { txt: "Bread"},
                    ]
                },
                style: {
                    backgroundColor: "rgb(175,217,207)",
                    fontFamily: "Arial"
                },
                createdAt: new Date().toLocaleDateString()
            },
            {
                id: "n105",
                type: "note-img",
                info: {
                    url: "https://images.unsplash.com/photo-1603208228995-e1363f894188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                    title: "Image"
                },
                style: {
                    backgroundColor: "#dda15e",
                    fontFamily: "Arial"
                },
                createdAt: new Date().toLocaleDateString()
            },
            {
                id: "n106",
                type: "note-video",
                info: {
                    url: "https://www.youtube.com/embed/uXnLyUZYkVw",
                    title: "video"
                },
                style: {
                    backgroundColor: "#f4f3ee",
                    fontFamily: "Arial"
                },
                createdAt: new Date().toLocaleDateString()
            },
        ]
        storageService.saveToStorage(NOTES_KEY, notes)
    }
}