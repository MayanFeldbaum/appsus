const { useState, useEffect } = React

import { NoteEditor } from "./note-editor.jsx"

export function NotePreview({ note, onRemoveNote, updateNoteStyle, onUpdateNoteTxt, onDuplicateNote,onUpdateNoteTodos,onTogglePin}) {
console.log(note);
    const [noteTxt, setNoteTxt] = useState(note.info.txt)
    const [todos, setTodos] = useState(note.info.todos)

    function handleChange({ target }) {
        let { value } = target
        setNoteTxt(value)
        onUpdateNoteTxt(note.id, { txt: noteTxt })
    }

    function handleListChange(ev,index) {
        let { value } = ev.target
        const todosCopy = [...todos]
        todosCopy[index] = value
        setTodos(todosCopy)
        onUpdateNoteTodos(note.id,{todos:todos})
    }

    function TodosList({ todos }) {
        return <ul>
            {todos.map((todo, index) => <li><textarea onInput={event => handleListChange(event,index)} value={todo} /></li>)}
        </ul>
    }


    if (note.type === 'note-txt') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor, fontFamily: note.style.fontFamily }}>
        <textarea value={noteTxt} className="edit-note-text" type="text" id="note-text" name="text"
            onChange={handleChange}>
        </textarea>
        <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onDuplicateNote={onDuplicateNote} onTogglePin={onTogglePin} />
    </div>
    )

    if (note.type === 'note-img') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor, fontFamily: note.style.fontFamily }}>
        <img src={note.info.url} />
        <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onDuplicateNote={onDuplicateNote} onTogglePin={onTogglePin} />
    </div>
    )

    if (note.type === 'note-video') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor, fontFamily: note.style.fontFamily }}>
        <iframe width="300" height="200" src={note.info.url}></iframe>
        <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onDuplicateNote={onDuplicateNote} onTogglePin={onTogglePin} />
    </div>
    )

    if (note.type === 'note-todos') return (
        <div className="note-preview" style={{ backgroundColor: note.style.backgroundColor, fontFamily: note.style.fontFamily }}>
            {/* <textarea value={TodosList()} className="edit-note-text" type="text" id="note-text" name="text"
            onChange={handleChange}>
        </textarea> */}
            <TodosList todos={todos} />
            <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onDuplicateNote={onDuplicateNote} onTogglePin={onTogglePin} />
        </div>
    )
}
