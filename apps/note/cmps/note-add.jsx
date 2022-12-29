const { useState, useEffect } = React

import {NoteTxt} from '../cmps/note-txt.jsx'

export function NoteAdd({ onGetTxtCmp,onAddNote }) {

    const [cmpType, setCmpType] = useState('txt')
    const [noteTxt, setNoteTxt] = useState('')
    const [newNote, setNewNote] = useState(false)

    function handleChange({ target }) {
        let { value } = target
        setNoteTxt(value)
    }

    function saveByType(ev) {
        ev.preventDefault()
        onGetTxtCmp(noteTxt,cmpType)   
        setNewNote(true)            
        // switch (cmpType) {
        //     case 'txt':
        //         return <h1>hello</h1>
                // return <NoteTxt/>
            // return <NoteTxt {...props} />
            // case 'img':
            // return <NoteVideo {...props} />
            // case 'video':
            // return <NoteImg {...props}/>
        // }
        // onAddNote(ev.target.value)
        // setNoteTxt('')
    }

    function setNewNoteFalse(){
        setNewNote(false)
    }

    return <div>
        <ul>
            <li type='txt' className="far fa-file-alt" onClick={ev => setCmpType(ev.target.type)}></li>
        </ul>
        <form onSubmit={saveByType}>
            <input class="text" type="text" id="note-text" name="text" value={noteTxt}
                onChange={handleChange} placeholder="What's on your mind..."></input>
            <button>Save</button>
        </form>
        {(newNote&&cmpType==='txt')&& <NoteTxt txt={noteTxt} onAddNote={onAddNote} setNewNoteFalse={setNewNoteFalse}/>}
        {(newNote&&cmpType==='img')&& <NoteImg txt={noteTxt} onAddNote={onAddNote} setNewNoteFalse={setNewNoteFalse}/>}
        </div>

























}
{/* //     const [noteTxt, setNoteTxt] = useState('')

//     function handleChange({ target }) {
        let { value } = target
        setNoteTxt(value)
    }

//     function onSaveReview(ev) {
        ev.preventDefault()
        const newNoteTxt = {
            type: "note-txt",
            isPinned: false,
            info: {
                txt: noteTxt
            },
            style: {
                backgroundColor: 'yellow',
                fontFamily: "Arial"
            }
        }
        onAddNote(newNoteTxt)
        setNoteTxt('')
    }

    return <form onSubmit={onSaveReview}>
        <div className='note-preview new'>
            <textarea
                cols="30"
                rows="10"
                placeholder='Type to add a note..'
                value={noteTxt}
                onChange={handleChange}
            >
            </textarea>
            <button>Save</button>
        </div>
    </form>
} */}