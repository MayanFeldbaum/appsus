const { useState, useEffect } = React

export function NoteAdd({ onAddNote }) {

    const [cmpType, setCmpType] = useState('txt')
    const [noteTxt, setNoteTxt] = useState('')
    const [placeholderInput, setPlaceholderInput] = useState("Whats on your mind...")

    useEffect(() => {
        placeholderUpdate()
    }, [cmpType])

    function placeholderUpdate() {
        if (cmpType === 'txt') setPlaceholderInput("Take a note...")
        if (cmpType === 'img') setPlaceholderInput("Enter image URL")
        if (cmpType === 'video') setPlaceholderInput("Enter video URL")
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
            }
        }
        setNoteTxt('')
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
            }
        }
        onAddNote(newNoteImg)
    }

    function addNoteVideo() {
        const newNoteVideo = {
            type: "note-video",
            isPinned: false,
            info: {
                url: noteTxt,
                title: "video"
            },
            style: {
                backgroundColor: "#ffff",
                fontFamily: "Arial"
            }
        }
        onAddNote(newNoteVideo)
    }

    return <div className="input-new-note">
        <form className="input-note-form" onSubmit={onSubmitNote}>
            <input className="text" type="text" id="note-text" name="text"
                onChange={handleChange} placeholder={placeholderInput}>
            </input>
            <div className="note-type-icons">
                <li title ="Text" type='txt' className="far fa-file-alt" onClick={ev => setCmpType(ev.target.type)}></li>
                <li title ="Image" type='img' className="far fa-file-image" onClick={ev => setCmpType(ev.target.type)}></li>
                <li title ="Video" type='video' className="fab fa-youtube" onClick={ev => setCmpType(ev.target.type)}></li>
            </div>
        </form>

    </div>
}
