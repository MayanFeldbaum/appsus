const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailFilterSearch({ onSetFilter }) {
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

    return <section className="mail-filter-search">
        <form>
            <input type="text"
                id="title"
                name="txt"
                placeholder="Search"
                onChange={handleChange}
            />
        </form>
    </section>
}