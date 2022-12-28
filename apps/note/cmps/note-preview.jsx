import { NoteEditor } from "./note-editor.jsx"
import { NoteTxt } from "./note-txt.jsx"

export function NotePreview({ note, onRemoveNote,updateNoteStyle }) {
    // DyncCmp?

    if (note.type === 'note-txt') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor }}>
        <span>{note.info.txt}</span>
        {/* <textarea
                value={note.info.txt}
            >
            </textarea> */}
        <div>
            <NoteEditor />
            <button onClick={() => onRemoveNote(note.id)}>X</button>
            {/* <input onChange={(ev)=> updateNoteStyle(note.id,{backgroundColor:ev.target.value})} class="color" type="color" id="fillerColor" name="fillerColor" value="#ffffff"/> */}
                {/* <label for="fillerColor"></label> */}
                <button class="color-btn"><input class="input-color" onChange={(ev)=> updateNoteStyle(note.id,{backgroundColor:ev.target.value})} className="color" type="color" id="fillerColor" name="fillerColor" value="#ffffff"/></button>
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
