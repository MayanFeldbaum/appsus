import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes,onRemoveNote,updateNoteStyle }) {
    return <ul className="note-list">
        {notes.map(note =>
            <div key={note.id}><NotePreview note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} /></div>
        )}
    </ul>
}
