
export function NoteEditor({ note, onRemoveNote, updateNoteStyle,onDuplicateNote }) {

    return <div className="note-editor">
        <button className="duplicate-note-btn" onClick={() => onDuplicateNote(note)}><i className="fa-solid fa-clone"></i></button>
        <button className="remove-note-btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
        <input className="input-color" onChange={(ev) => updateNoteStyle(note.id, { backgroundColor: ev.target.value })} type="color" id="fillerColor" name="fillerColor" value="#ffffff" />
        <label htmlFor="fillerColor"><i className="fas fa-palette"></i></label>
    </div>
}