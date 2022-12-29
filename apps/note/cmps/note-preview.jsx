const { useState, useEffect } = React

import { NoteEditor } from "./note-editor.jsx"

export function NotePreview({ note, onRemoveNote, updateNoteStyle, onUpdateNoteTxt,onDuplicateNote }) {

    const [noteTxt, setNoteTxt] = useState(note.info.txt)

    function handleChange({ target }) {
        let { value } = target
        setNoteTxt(value)
        onUpdateNoteTxt(note.id, { txt: noteTxt })
        setNoteTxt('')

    }

    if (note.type === 'note-txt') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor, fontFamily: note.style.fontFamily }}>
            <textarea  value={noteTxt} className="edit-note-text" type="text" id="note-text" name="text"
                onChange={handleChange}>
            </textarea>
        <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onDuplicateNote={onDuplicateNote} />
    </div>
    )

    if (note.type === 'note-img') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor, fontFamily: note.style.fontFamily }}>
        <img src={note.info.url} />
        <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onDuplicateNote={onDuplicateNote} />
    </div>
    )

    if (note.type === 'note-video') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor, fontFamily: note.style.fontFamily }}>
        <iframe src={note.info.url}></iframe>
        <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onDuplicateNote={onDuplicateNote} />
    </div>
    )
}
