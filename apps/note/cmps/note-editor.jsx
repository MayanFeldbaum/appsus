export function NoteEditor({note,onRemoveNote,updateNoteStyle}) {
    return <div><button className="remove-note-btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
        <input className="input-color" onChange={(ev) => updateNoteStyle(note.id, { backgroundColor: ev.target.value })} type="color" id="fillerColor" name="fillerColor" value="#ffffff" />
        <label htmlFor="fillerColor"><i className="fas fa-palette"></i></label>
    </div>
}