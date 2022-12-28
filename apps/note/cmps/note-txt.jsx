const { useState, useEffect } = React

import { NoteEditor } from "./note-editor.jsx"

export function NoteTxt({ onAddNote }) {

    const [noteTxt, setNoteTxt] = useState('')

    function handleChange({ target }) {
        let { value } = target
        setNoteTxt(value)
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        
        const newNoteTxt ={
            type:"note-txt",
            isPinned:false,
            info:{
                txt:noteTxt
            },
            backgroundColor:'yellow'
        }
        onAddNote(newNoteTxt)
        setNoteTxt('')
    }


    return <form onSubmit={onSaveReview}>
        <div className='note-preview new'>
            <textarea
                cols="30"
                rows="10"
                placeholder='Type to add a note..'
                value={noteTxt}
                onChange={handleChange}
            >
            </textarea>
            <NoteEditor />
            <button>Save</button>
        </div>
    </form>
}