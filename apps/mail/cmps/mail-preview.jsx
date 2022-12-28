import { LongTxt } from "../../../cmps/long-txt.jsx"

const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function MailPreview({mail}) {
    // Click on an email-preview – opens the email for reading
    // Show a read/unread state per email

    const {id, subject, body, sentAt, from, to, isRead} = mail
    const [isExpanded, setIsExpanded] = useState(false)

    const readDisplay = isRead ? 'read' : 'unread'
    return <Fragment>
        <tr className={readDisplay} onClick={() => {
            setIsExpanded(!isExpanded)
        }}>
            <td>{from}</td>
            <LongTxt txt={subject} length={length = 50} />
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