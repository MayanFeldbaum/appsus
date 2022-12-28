const { useState, useEffect } = React

import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"

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
    console.log(notes);

    // function onSetFilter(filterByFromFilter) {
    //     setFilterBy(filterByFromFilter)
    // }

    return <div className="notes-index">
        {/* <NoteFilter onSetFilter={onSetFilter} /> */}
        <NoteList notes={notes} />

    </div>
}
