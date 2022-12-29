import { NoteEditor } from "./note-editor.jsx"

export function NotePreview({ note, onRemoveNote, updateNoteStyle }) {

    if (note.type === 'note-txt') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor, fontFamily: note.style.fontFamily }}>
        <span>{note.info.txt}</span>

        <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} />
    </div>
    )

    if (note.type === 'note-img') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor, fontFamily: note.style.fontFamily }}>
        <img src={note.info.url} />
        <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} />
    </div>
    )

    if (note.type === 'note-video') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor, fontFamily: note.style.fontFamily }}>
    <iframe src={note.info.url}></iframe>
    <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} />
</div>
)
}
