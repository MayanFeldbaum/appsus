const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function MailPreview({mail}) {
    // Click on an email-preview – opens the email for reading
    // Show a read/unread state per email

    const {id, subject, body, sentAt, to} = mail
    const [isExpanded, setIsExpanded] = useState(false)

    return <Fragment>
        <tr onClick={() => {
            setIsExpanded(!isExpanded)
        }}>
            <td>{subject}</td>
            <td>{sentAt}</td>
            <td>
                <Link to={`/mail/${id}`}>Details</Link> |
            </td>
        </tr>
        <tr hidden={!isExpanded}>
            <td colSpan="3">
                <p>{to}</p>
                <p>{body}</p>
            </td>
        </tr>
    </Fragment>
}