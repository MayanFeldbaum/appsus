export function NoteEditor({ note, onRemoveNote, updateNoteStyle,onDuplicateNote,onTogglePin }) {
    return <div className="note-editor">
    <button className="duplicate-note-btn" onClick={() => onDuplicateNote(note)}><i className="fa-solid fa-clone"></i></button>
    <button className="remove-note-btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
    <input className="input-color" onChange={(ev) => {
        updateNoteStyle(note.id, { backgroundColor: ev.target.value })}} type="color" id={'fillerColor' + note.id} name="fillerColor" value="#ffffff" />
    <label for={'fillerColor' + note.id}><i className="fas fa-palette"></i></label>
    <button className="pin-note-btn" onClick={() => onTogglePin(note.id)}><i className={`fa-solid fa-thumbtack ${note.isPinned && 'active'}`}></i></button>
    <span>{note.createdAt}</span>
    </div>
}
