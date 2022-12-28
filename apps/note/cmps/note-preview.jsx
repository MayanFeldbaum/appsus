import { NoteEditor } from "./note-editor.jsx"


export function NotePreview({ note, onRemoveNote }) {
    // DyncCmp

    return <div className="note-preview">
        <span>{note.info.txt}</span>
        <div>
        <NoteEditor />
        <button onClick={() => onRemoveNote(note.id)}>X</button>
        </div>
    </div>
}