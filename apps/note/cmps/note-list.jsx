import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes,onRemoveNote,updateNoteStyle }) {
    return <ul className="note-list">
        {notes.map(note =>
            <NotePreview note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} />
        )}
    </ul>
}
