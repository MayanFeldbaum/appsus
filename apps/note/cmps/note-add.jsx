const { useState, useEffect } = React

export function NoteAdd({ onAddNote }) {

    const [cmpType, setCmpType] = useState('txt')
    const [noteTxt, setNoteTxt] = useState('')
    // const [placeholderInput, setPlaceholderInput] = useState("Whats on your mind...")

    // useEffect(()=>{
    //     placeholderInput()
    // },[cmpType])

    // function placeholderInput(){
    //     if (cmpType === 'txt') setPlaceholderInput("Whats on your mind...")
    //     if (cmpType === 'img') addNoteImg("Enter image URL")
    //     if (cmpType === 'video') addNoteVideo("Enter video URL")
    // }

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

    function addNoteTxt(){
        const newNoteTxt = {
            type: "note-txt",
            isPinned: false,
            info: {
                txt: noteTxt,
            },
            style: {
                backgroundColor: 'yellow',
                fontFamily: "Arial"
            }
        }
        setNoteTxt('')
        onAddNote(newNoteTxt)
    }

    function addNoteImg(){
        const newNoteImg = {
            type: "note-img",
            isPinned: false,
            info: {
                url:noteTxt,
                title: "image"
            },
            style: {
                backgroundColor: 'yellow',
                fontFamily: "Arial"
            }
        }
        onAddNote(newNoteImg)
    }

    function addNoteVideo(){
        const newNoteVideo = {
            type: "note-video",
            isPinned: false,
            info: {
                url:noteTxt,
                title: "video"
            },
            style: {
                backgroundColor: 'yellow',
                fontFamily: "Arial"
            }
        }
        onAddNote(newNoteVideo)
    }

    return <div>
        <ul>
            <li type='txt' className="far fa-file-alt" onClick={ev => setCmpType(ev.target.type)}></li>
            <li type='img' className="far fa-file-image" onClick={ev => setCmpType(ev.target.type)}></li>
            <li type='video' className="fab fa-youtube" onClick={ev => setCmpType(ev.target.type)}></li>
        </ul>
        <form onSubmit={onSubmitNote}>
            <input className="text" type="text" id="note-text" name="text"
                onChange={handleChange} placeholder="Enter Text.."></input>
            <button>Save</button>
        </form>
    </div>
}
