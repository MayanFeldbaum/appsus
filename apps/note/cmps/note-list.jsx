import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes,onRemoveNote,updateNoteStyle,onUpdateNoteTxt,onDuplicateNote,onUpdateNoteTodos,onTogglePin }) {
    return <div className="note-list">
        {notes.map(note =>
            <div key={note.id}><NotePreview note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onUpdateNoteTxt={onUpdateNoteTxt} onDuplicateNote={onDuplicateNote} onUpdateNoteTodos={onUpdateNoteTodos} onTogglePin={onTogglePin} /></div>
        )}
    </div>
}
