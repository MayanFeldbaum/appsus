const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [nextMailId, setNextMailId] = useState(null)
    const [prevMailId, setPrevMailId] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(mail => setMail(mail))
            .catch(() => {
                showErrorMsg('Had issues with mail details')
                navigate('/mail')
            })
        mailService.getNextMailId(mailId)
            .then(setNextMailId)
        mailService.getPrevMailId(mailId)
            .then(setPrevMailId)
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                showSuccessMsg('Mail Deleted!')
                navigate('/mail')
            })
            .catch(() => {
                showErrorMsg('Could not delete mail, try again please!')
            })
    }

    if (!mail) return <div>loading...</div>
    const { id, subject, to, from, body, sentAt } = mail
    return <section className="mail-details">
        <header className="mail-details-header">
            <Link to={'/mail'}
                className="fa-solid fa-arrow-left"></Link>
            <button onClick={() => onRemoveMail(id)}
                className="fa-regular fa-trash-can"></button>
            <Link to={`/mail/${prevMailId}`} className="fa-solid fa-caret-left"></Link>
            <Link to={`/mail/${nextMailId}`} className="fa-solid fa-caret-right"></Link>
        </header>
        <div className="mail-details-content">
            <h2>{subject}</h2>
            <p>{utilService.getFormattedTime(sentAt)}</p>
            <span>{`from: <${from}> to: <${to}>`}</span>
            <p>{body}</p>
        </div>
    </section>
}