const { useState, useEffect } = React

import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteAdd } from '../cmps/note-add.jsx'

import { notesService } from '../services/note.service.js'
import { showSuccessMsg } from "../../../services/event-bus.service.js"

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState('')


    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        notesService.query(filterBy)
            .then(notesToUpdate => setNotes(notesToUpdate))
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function onRemoveNote(noteId) {
        notesService.remove(noteId)
            .then(() => {
                const updatedNotes = notes.filter(note => note.id !== noteId)
                setNotes(updatedNotes)
                showSuccessMsg('Note removed!')
            })
    }

    function onRemoveTodo(noteId, listIndex) {
        notesService.get(noteId)
            .then((note) => {
                const noteTodoListToEdit = note.info.todos
                const updatedNoteList = noteTodoListToEdit.filter((todo,index) => index !== listIndex)
                const newNote = { ...note, info: { ...note.info, todos:[...updatedNoteList] } }
                notesService.save(newNote)
                    .then((updatedNote) => {
                        const updatedNotes = notes.map(note => {
                            if (note.id === noteId) return updatedNote
                            else return note
                        })
                        setNotes(updatedNotes)
                    })
            })
    }

    function onAddNote(newNote) {
        notesService.save(newNote)
            .then((newNote) => {
                const newNotes = [...notes, newNote]
                setNotes(newNotes)
                showSuccessMsg('Note added!')
            })
    }

    function updateNoteStyle(noteId, newStyle) {
        notesService.get(noteId)
            .then((note) => {
                const newNote = { ...note, style: { ...note.style, ...newStyle } }
                notesService.save(newNote)
                    .then((updatedNote) => {
                        const updatedNotes = notes.map(note => {
                            if (note.id === noteId) return updatedNote
                            return note
                        })
                        setNotes(updatedNotes)
                    })
            })
    }

    function onUpdateNoteTxt(noteId, newTxt) {
        notesService.get(noteId)
            .then((note) => {
                console.log(note);
                const newNote = { ...note, info: { ...note.info, ...newTxt } }
                console.log(newNote);
                notesService.save(newNote)
                    .then((updatedNote) => {
                        const updatedNotes = notes.map(note => {
                            if (note.id === noteId) return updatedNote
                            return note
                        })
                        setNotes(updatedNotes)
                    })
            })
    }

    function onUpdateNoteTodos(noteId, newTodo) {
        notesService.get(noteId)
            .then((note) => {
                note.info.todos.push(newTodo)
                console.log(note);
                notesService.save(note)
                    .then((updatedNote) => {
                        const updatedNotes = notes.map(note => {
                            if (note.id === noteId) return updatedNote
                            return note
                        })
                        setNotes(updatedNotes)
                    })
            })
    }

    function onDuplicateNote(noteToDuplicate) {
        const cloneNote = { ...noteToDuplicate }
        delete cloneNote.id
        onAddNote(cloneNote)
    }

    function onTogglePin(noteId) {
        notesService.get(noteId)
            .then((note) => {
                const newNote = { ...note, isPinned: (!note.isPinned) }
                notesService.save(newNote)
                    .then((updatedNote) => {
                        const updatedNotes = notes.map(note => {
                            if (note.id === noteId) return updatedNote
                            return note
                        })
                        setNotes(updatedNotes)
                    })
            })
    }

    if (!notes) return
    return <div className="notes-index note-layout">
        <section className="main-nav">
            <div className="appsus-nav">
                <button className="fa-solid fa-bars"></button>
                <div className="mail-logo">Suskeep</div>
            </div>
            <NoteFilter onSetFilter={onSetFilter} />
        </section>
        <NoteAdd onAddNote={onAddNote} />
        <NoteList notes={notes} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onUpdateNoteTxt={onUpdateNoteTxt} onDuplicateNote={onDuplicateNote} onUpdateNoteTodos={onUpdateNoteTodos} onTogglePin={onTogglePin} onRemoveTodo={onRemoveTodo} />
    </div>
}
