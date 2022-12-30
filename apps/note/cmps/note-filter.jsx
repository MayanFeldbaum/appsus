
const { useState, useEffect } = React

import { notesService } from '../services/note.service.js'

export function NoteFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(notesService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    return <section className="note-filter-search">
        <div className="filterByTxt">
            <label htmlFor="title"></label>
            <input type="text"
                id="title"
                name="txt"
                placeholder="Search..."
                value={filterByToEdit.txt}
                onChange={handleChange}
            />
        </div>
        <div className="filterByType">
            {/* <select name="type" onChange={handleChange}>
                <option value=''>All</option>
                <option value='note-txt'>Text</option>
                <option value='note-img'>Image</option>
                <option value='note-video'>Video</option>
                <option value='note-todos'>Todos</option>
            </select> */}
        </div>
    </section>

}