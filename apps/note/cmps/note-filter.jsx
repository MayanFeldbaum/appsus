
const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'

export function NoteFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState('')

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value } = target
        setFilterByToEdit(value)
        return onSetFilter(filterByToEdit)
    }

    return <section className="note-filter">
        <label htmlFor="title"></label>
        <input type="text"
            id="title"
            name="txt"
            placeholder="Search..."
            value={filterByToEdit.txt}
            onChange={handleChange}
        />
    </section>
}