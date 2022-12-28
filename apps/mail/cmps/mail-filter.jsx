const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailFilter({ onSetFilter }) {
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

    return <section className="mail-filter">
        <form>
            <input type="text"
                id="title"
                name="txt"
                placeholder="Search"
                onChange={handleChange}
            />

            <select name="isRead" onChange={handleChange}>
                <option value="all">All</option>
                <option value="read">Read emails</option>
                <option value="unread">Unread emails</option>
            </select>
        </form>
    </section>
}