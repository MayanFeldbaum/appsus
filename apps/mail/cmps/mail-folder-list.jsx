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
            <span className="num-unread">{numOfUnread}</span>
        </button>
        <button className={`sent ${activeFolder === 'sent' && 'active'}`} name="status" value="sent"
            onClick={handleChange}>
            <span className="fa-regular fa-envelope"></span>
            sent
        </button>
        {/* <button name="status" value="trash"
            onClick={handleChange}>
            <span className="fa-regular fa-trash-can"></span>
            trash
        </button>
        <button name="status" value="draft"
            onClick={handleChange}>
            <span className="fa-regular fa-file"></span>
            draft
        </button> */}
    </section>
    // Allow viewing the sent emails
    // In the inbox show all the emails that were sent to the current user, the other
    // emails are sent emails and should be displayed at the sent folder
}