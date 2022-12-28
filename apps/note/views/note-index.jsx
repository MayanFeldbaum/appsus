const { useState, useEffect } = React

import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"
// import { NoteTxt } from '../cmps/note-txt.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'


import { notesService } from '../services/note.service.js'

// Allow removing an email

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    // const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter())
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
                // flashMsg('Note removed!')
            })
    }

    function onAddNote(newNote) {
        notesService.save(newNote)
        .then((newNote)=>{
            const newNotes =[...notes,newNote]
            setNotes(newNotes)
        })
    }

    function updateNoteStyle(noteId,newStyle){
        notesService.get(noteId)
        .then((note)=>{
            const newNote = {...note, style:{...note.style,...newStyle}}
            notesService.save(newNote)
            .then((updatedNote)=>{
                const updatedNotes = notes.map(note=> {
                    if (note.id===noteId) return updatedNote
                    return note
                })
                setNotes(updatedNotes)

            })
        })
    }

    if (!notes) return
    return <div className="notes-index">
        <NoteFilter onSetFilter={onSetFilter} />
        <NoteAdd onAddNote={onAddNote}/>
        <NoteList notes={notes} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} />

    </div>
}
