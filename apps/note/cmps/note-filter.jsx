
const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'

export function NoteFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="note-filter">
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="title">Search By</label>
            <input type="text"
                id="title"
                name="txt"
                placeholder="By Title"
                value={filterByToEdit.txt}
                onChange={handleChange}
            />

        </form>

    </section>
}