const { useState, useEffect } = React

import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteTxt } from '../cmps/note-txt.jsx'

import { notesService } from '../services/note.service.js'

// Allow removing an email

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    // const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        notesService.query()
            .then(notesToUpdate => setNotes(notesToUpdate))
    }

    // function onSetFilter(filterByFromFilter) {
    //     setFilterBy(filterByFromFilter)
    // }
    
console.log(notes);
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

    if (!notes) return
    return <div className="notes-index">
        <NoteTxt onAddNote={onAddNote} />
        {/* <NoteFilter onSetFilter={onSetFilter} /> */}
        <NoteList notes={notes} onRemoveNote={onRemoveNote} />

    </div>
}
