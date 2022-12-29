const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

import { LongTxt } from "../../../cmps/long-txt.jsx"

import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail }) {
    // Click on an email-preview – opens the email for reading
    // Show a read/unread state per email
    const [isExpanded, setIsExpanded] = useState(false)
    const [mailRead, setMailRead] = useState(mail)

    function onReadMail() {
        setMailRead(prevMail => ({ ...prevMail, isRead: true }))
    }

    const { id, subject, body, sentAt, from, to, isRead } = mail
    const readDisplay = isRead ? 'read' : 'unread'
    return <Fragment>
        <tr className={readDisplay} onClick={() => {
            setIsExpanded(!isExpanded)
            onReadMail()
        }}>
            <td>{from}</td>
            <LongTxt txt={subject} length={length = 50} />
            {/* <td className="fa-solid fa-trash-can"></td> */}
            <td>{sentAt}</td>
        </tr>
        <tr hidden={!isExpanded}>
            <td colSpan="3">
                <Link to={`/mail/${id}`}>Details</Link>
                <p>{sentAt}</p>
                <p>{from}</p>
                <p>{to}</p>
                <p>{body}</p>
            </td>
        </tr>
    </Fragment>
}