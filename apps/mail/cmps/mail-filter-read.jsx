const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailFilterRead({ onSetFilter }) {
    // Filter emails: by search, by read/unread
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterBy((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    return <section className="mail-filter-read">
        <form>
            <select name="isRead" onChange={handleChange}>
                <option value="all">All emails</option>
                <option value="read">Read emails</option>
                <option value="unread">Unread emails</option>
            </select>
        </form>
    </section>
}