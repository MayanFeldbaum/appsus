import { NoteEditor } from "./note-editor.jsx"
import { NoteTxt } from "./note-txt.jsx"

export function NotePreview({ note, onRemoveNote, updateNoteStyle }) {
    // DyncCmp?

    if (note.type === 'note-txt') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor ,fontFamily: note.style.fontFamily}}>
        {/* <span>{note.info.txt}</span> */}
        <textarea cols="30"
                rows="10"
                value={note.info.txt}>

        </textarea>
        <div>
            <NoteEditor />
            <button className="remove-note-btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
            <input class="input-color" onChange={(ev) => updateNoteStyle(note.id, { backgroundColor: ev.target.value })} type="color" id="fillerColor" name="fillerColor" value="#ffffff" />
            <label for="fillerColor"><i class="fas fa-palette"></i></label>
            
            <select id="fonts" onChange={(ev) => updateNoteStyle(note.id, { font: ev.target.value })}>
                <option value="Impact">Impact</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
            </select>
        </div>
    </div>
    )

    if (note.type === 'note-img')
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
