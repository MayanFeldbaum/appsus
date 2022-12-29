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
            <LongTxt txt={subject} length={length = 50} />
            <td>{utilService.formatTime(sentAt)}</td>
        </tr>
        <tr hidden={!isExpanded}>
            <td colSpan="3">
                <div className="expanded-td">
                    <Link to={`/mail/${id}`}>Details</Link>
                    <p>{utilService.getFormattedTime(sentAt)}</p>
                    <p>{from}</p>
                    <p>{to}</p>
                    <p>{body}</p>
                </div>
            </td>
        </tr>
    </Fragment>
}