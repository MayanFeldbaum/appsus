const { useState, useEffect, useRef, Fragment } = React
const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailCompose({ onAddMail }) {
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    const elMailComposeRef = useRef(null)
    const params = useParams()
    const paramsFromNote = params.txt
    const navigate = useNavigate()

    useEffect(() => {
        if(paramsFromNote) onOpenMailCompose()
    }, [])

    function handleChange({ target }) {
        let { value, name: field } = target
        setNewMail(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSendMail(ev) {
        ev.preventDefault()
        onCloseMailCompose()
        onAddMail(newMail)
    }

    function onOpenMailCompose() {
        elMailComposeRef.current.style.display = 'flex'
    }

    function onCloseMailCompose() {
        elMailComposeRef.current.style.display = 'none'
        navigate('/mail')
    }

    return <Fragment>
        <button className="btn-mail-compose" onClick={onOpenMailCompose}>
            <span className="fa-solid fa-pen"></span>
            <span>New email</span>
        </button>
        <section className="mail-compose" ref={elMailComposeRef}>
            <header className="mail-compose-header">
                <span>new message</span>
                <button className="fa-solid fa-xmark"
                    onClick={onCloseMailCompose}></button>
            </header>
            <form className="mail-compose-form" id="form-compose"
                onSubmit={onSendMail}>
                <input type="email" placeholder="to"
                    name="to" onChange={handleChange} />
                <input type="text" placeholder="subject" value={newMail.subject}
                    name="subject" onChange={handleChange} />
                <textarea rows="15" cols="50" placeholder="body" value={params && paramsFromNote || newMail.body}
                    name="body" onChange={handleChange}></textarea>
            </form>
            <footer className="mail-compose-footer">
                <button form="form-compose" onClick={onSendMail}>send</button>
            </footer>
        </section>
    </Fragment>
}