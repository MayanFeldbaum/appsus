const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"

export function MailFolderList({ onSetFilter, numOfUnread }) {
    const [filterByFolder, setFilterByFolder] = useState(mailService.getDefaultFilter())
    const [activeFolder, setActiveFolder] = useState('inbox')

    useEffect(() => {
        onSetFilter(filterByFolder)
    }, [filterByFolder])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByFolder((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
        setActiveFolder(value)
    }

    return <section className="mail-folder-list">
        <button className={`inbox ${activeFolder === 'inbox' && 'active'}`} name="status" value="inbox"
            onClick={handleChange}>
            <span className="fa-solid fa-inbox"></span>
            <span>inbox</span>
            <span className="num-unread">{activeFolder === 'inbox' && numOfUnread}</span>
        </button>
        <button className={`sent ${activeFolder === 'sent' && 'active'}`} name="status" value="sent"
            onClick={handleChange}>
            <span className="fa-regular fa-envelope"></span>
            <span>sent</span>
            <span className="num-unread">{activeFolder === 'sent' && numOfUnread}</span>
        </button>
    </section>
    // Allow viewing the sent emails
    // In the inbox show all the emails that were sent to the current user, the other
    // emails are sent emails and should be displayed at the sent folder
}