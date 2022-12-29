const { useEffect, useState } = React

import { mailService } from "../services/mail.service.js"

export function MailFolderList({ onSetFilter }) {
    const [filterByFolder, setFilterByFolder] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByFolder)
    }, [filterByFolder])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByFolder((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    return <section className="mail-folder-list">
        <button className="active " name="status" value="inbox"
            onClick={handleChange}>
            <span className="fa-solid fa-inbox"></span>
            inbox
        </button>
        <button name="status" value="sent"
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