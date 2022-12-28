import { NoteEditor } from "./note-editor.jsx"


export function NotePreview({note}) {
    // DyncCmp

    return <div className="note-preview">
        <span>{note.info.txt}</span>
        <NoteEditor />
    </div>
}