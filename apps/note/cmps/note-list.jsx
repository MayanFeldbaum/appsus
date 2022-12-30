import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onRemoveNote, updateNoteStyle, onUpdateNoteTxt, onDuplicateNote, onUpdateNoteTodos, onTogglePin }) {
    return <container className="note-list-pinned"><div className="note-list-pinned">
        {notes.map(note => {
            if (note.isPinned) return <div key={note.id}><NotePreview note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onUpdateNoteTxt={onUpdateNoteTxt} onDuplicateNote={onDuplicateNote} onUpdateNoteTodos={onUpdateNoteTodos} onTogglePin={onTogglePin} /></div>
        })}
    </div>
    <div className="note-list-unpinned">
        {notes.map(note => {
            if (!note.isPinned) return <div key={note.id}><NotePreview note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onUpdateNoteTxt={onUpdateNoteTxt} onDuplicateNote={onDuplicateNote} onUpdateNoteTodos={onUpdateNoteTodos} onTogglePin={onTogglePin} /></div>
        })}
    </div>
    </container>
}
