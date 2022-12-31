const { useState } = React

import { NoteEditor } from "./note-editor.jsx"

export function NotePreview({ note, onRemoveNote, updateNoteStyle, onUpdateNoteTxt, onDuplicateNote, onUpdateNoteTodos, onTogglePin, onRemoveTodo }) {

    const [noteTxt, setNoteTxt] = useState(note.info.txt)
    const [todos, setTodos] = useState(note.info.todos)
    const [todoTxt, setTodoTxt] = useState('')

    function handleChange({ target }) {
        let { value } = target
        setNoteTxt(value)
        onUpdateNoteTxt(note.id, { txt: noteTxt })
    }

    function removeTodo(index) {
        todos.splice(index,1)
        setTodos(todos)
        onRemoveTodo(note.id,index)
    }

    function TodosList() {
        if (todos||todos.length>0) {
            return <ul>
                {todos.map((todo, index) =>
                    <ol className="todo-list-textarea" key={note.id + index}><button onClick={() => removeTodo(index)}>X</button><span>{todo.txt}</span></ol>)}
            </ul>
        }
    }

    function addListTodo({target}){
        let { value } = target
        setTodoTxt(value)
    }

    function onSubmitNote(ev) {
        ev.preventDefault()
        todos.push({txt: todoTxt, isDone:false})
        setTodos(todos)
        onUpdateNoteTodos(note.id,{txt: todoTxt, isDone:false})
        setTodoTxt('')
    }

    if (note.type === 'note-txt') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor}}>
        <textarea value={noteTxt} className="edit-note-text" type="text" id="note-text" name="text"
            onChange={handleChange}>
        </textarea>
        <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onDuplicateNote={onDuplicateNote} onTogglePin={onTogglePin} />
    </div>
    )

    if (note.type === 'note-img') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor}}>
        <img src={note.info.url} />
        <p>{note.info.title}</p>
        <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onDuplicateNote={onDuplicateNote} onTogglePin={onTogglePin} />
    </div>
    )

    if (note.type === 'note-video') return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor}}>
        <iframe width="300" height="200" src={note.info.url}></iframe>
        <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onDuplicateNote={onDuplicateNote} onTogglePin={onTogglePin} />
    </div>
    )

    if (note.type === 'note-todos') return (
        <div className="note-preview" style={{ backgroundColor: note.style.backgroundColor}}>
            <h1 className="todo-list-title">{note.info.title}</h1>
            <TodosList/>
            <form className="input-note-form" onSubmit={onSubmitNote}>
            <input className="text" type="text" id="note-text" name="text"
                onChange={addListTodo} placeholder='Add a todo..' value={todoTxt}>
            </input>
            </form>
            <NoteEditor note={note} onRemoveNote={onRemoveNote} updateNoteStyle={updateNoteStyle} onDuplicateNote={onDuplicateNote} onTogglePin={onTogglePin} /></div>
    )
}
