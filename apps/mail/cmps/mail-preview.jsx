const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

import { LongTxt } from "../../../cmps/long-txt.jsx"

import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onUpdateMail }) {
    // Click on an email-preview – opens the email for reading
    // Show a read/unread state per email
    const [isExpanded, setIsExpanded] = useState(false)

    const { id, subject, body, sentAt, from, to, isRead } = mail
    const readDisplay = isRead ? 'read' : 'unread'
    return <Fragment>
        <tr className={readDisplay} onClick={() => {
            setIsExpanded(!isExpanded)
            onUpdateMail(mail.id, { ...mail, isRead: true })
        }}>
            <td>{from}</td>
            <LongTxt txt={subject} length={length = 30} />
            <td>{utilService.formatTime(sentAt)}</td>
        </tr>
        <tr hidden={!isExpanded}>
            <td colSpan="3">
                <div className="expanded-td">
                    <div className="mail-preview-head">
                        <h3>{subject}</h3>
                        <div className="mail-preview-links">
                        <Link to={`/mail/${id}`} className="fa-solid fa-arrow-up-right-from-square"></Link>
                        <Link to={`/note/${body}`} className="fa-regular fa-paper-plane"></Link>
                        </div>
                    </div>
                    <div className="mail-preview-details">
                        <span>{`from: <${from}> to: <${to}>`}</span>
                        <p>{utilService.getFormattedTime(sentAt)}</p>
                    </div>
                    <p>{body}</p>
                </div>
            </td>
        </tr>
    </Fragment>
}