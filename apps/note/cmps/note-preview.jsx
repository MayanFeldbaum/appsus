import { NoteEditor } from "./note-editor.jsx"
import { NoteTxt } from "./note-txt.jsx"

export function NotePreview({ note, onRemoveNote }) {
    // DyncCmp

    if (note.type==='note-txt') return (<div className="note-preview">
        <span>{note.info.txt}</span>
        {/* <textarea
                value={note.info.txt}
            >
            </textarea> */}
        <div>
        <NoteEditor />
        <button onClick={() => onRemoveNote(note.id)}>X</button>
        </div>
    </div>
    )

    if (note.type === 'note-img') console.log(note);
    return (<div className="note-preview">
        <span>{note.info.txt}</span>
        <img src={note.info.url} />
        <div>
            <NoteEditor />
            <button onClick={() => onRemoveNote(note.id)}>X</button>
        </div>
    </div>
    )
}
