const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        console.log('loading...')
        mailService.get(mailId)
            .then(mail => setMail(mail))
            .catch(() => {
                showErrorMsg('Had issues with mail details')
                navigate('/mail')
            })
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
    const { id, subject, to, from, body } = mail
    return <section className="mail-details">
        <header className="mail-details-header">
            <Link to={'/mail'}
                className="fa-solid fa-arrow-left"></Link>
            <button onClick={() => onRemoveMail(id)}
                className="fa-regular fa-trash-can"></button>
        </header>
        <div className="mail-details-content">
            <h2>{subject}</h2>
            <span>{`from: <${from}> to: <${to}>`}</span>
            <p>{body}</p>
        </div>
    </section>
}