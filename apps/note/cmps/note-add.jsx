const { useState, useEffect } = React

export function NoteAdd({ onAddNote }) {

    const [cmpType, setCmpType] = useState('txt')
    const [noteTxt, setNoteTxt] = useState('')
    const [placeholderInput, setPlaceholderInput] = useState("Whats on your mind...")

    const addNotesBtns = [
        { title: 'Text', className: 'far fa-file-alt ', type: 'txt' },
        { title: 'Image', className: 'far fa-file-image ', type: 'img' },
        { title: 'Video', className: 'fab fa-youtube ', type: 'video' },
        { title: 'List', className: 'fa solid fa-list ', type: 'list' }
    ]


    useEffect(() => {
        placeholderUpdate()
    }, [cmpType])

    function placeholderUpdate() {
        if (cmpType === 'txt') setPlaceholderInput("Take a note...")
        if (cmpType === 'img') setPlaceholderInput("Enter image URL")
        if (cmpType === 'video') setPlaceholderInput("Enter video URL")
        if (cmpType === 'list') setPlaceholderInput("Enter comma separated list")
    }

    function handleChange({ target }) {
        let { value } = target
        setNoteTxt(value)
    }

    function onSubmitNote(ev) {
        ev.preventDefault()

        if (cmpType === 'txt') addNoteTxt()
        if (cmpType === 'img') addNoteImg()
        if (cmpType === 'video') addNoteVideo()
        if (cmpType === 'list') addNoteTodos()
        setNoteTxt('')
    }

    function getURL() {
        const noteUrl = noteTxt
        const newUrl = noteUrl.split('=').slice(-1)[0]
        const finalURL = `https://www.youtube.com/embed/${newUrl}`
        console.log(getURL);
        return finalURL
    }

    function addNoteTxt() {
        const newNoteTxt = {
            type: "note-txt",
            isPinned: false,
            info: {
                txt: noteTxt,
            },
            style: {
                backgroundColor: "#ffff",
                fontFamily: "Arial"
            },
            createdAt: new Date().toLocaleDateString()
        }
        onAddNote(newNoteTxt)
    }

    function addNoteImg() {
        const newNoteImg = {
            type: "note-img",
            isPinned: false,
            info: {
                url: noteTxt,
                title: "image"
            },
            style: {
                backgroundColor: "#ffff",
                fontFamily: "Arial"
            },
            createdAt: new Date().toLocaleDateString()
        }
        onAddNote(newNoteImg)
    }

    function addNoteVideo() {
        const newNoteVideo = {
            type: "note-video",
            isPinned: false,
            info: {
                url: getURL(),
                title: "video"
            },
            style: {
                backgroundColor: "#ffff",
                fontFamily: "Arial"
            },
            createdAt: new Date().toLocaleDateString()
        }
        onAddNote(newNoteVideo)
    }

    function addNoteTodos() {
        const newNoteTodos = {
            type: "note-todos",
            isPinned: false,
            info: {
                title: getTodosTitle(),
                todos: getTodosTxt()
            },
            style: {
                backgroundColor: "#ffff",
                fontFamily: "Arial"
            },
            createdAt: new Date().toLocaleDateString()
        }
        onAddNote(newNoteTodos)
    }

    function getTodosTitle() {
        const splitTxt = noteTxt.split(',')
        const title = splitTxt[0]
        return title
    }

    function getTodosTxt() {
        const splitTxt = noteTxt.split(',')
        const TodosList = splitTxt.map(todo=>{
            return {
                txt: todo
            }
        })
        return TodosList
    }

    return <div className="input-new-note">
        <form className="input-note-form" onSubmit={onSubmitNote}>
            <input className="text" type="text" id="note-text" name="text"
                onChange={handleChange} placeholder={placeholderInput} value={noteTxt}>
            </input>
            <div className="note-type-icons">
                {addNotesBtns.map(btn=> { return <li title={btn.title} type={btn.type} className={`${btn.className} ${cmpType === btn.type && 'active'}`} onClick={ev => setCmpType(ev.target.type)}></li>})}
    
            </div>
        </form>
    </div>
}
