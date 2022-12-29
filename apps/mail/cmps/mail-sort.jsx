const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailSort({ onSetSort }) {
    const [sortBy, setSortBy] = useState(mailService.getDefaultSort())

    useEffect(() => {
        onSetSort(sortBy)
    }, [sortBy])

    function handleChange({ target }) {
        let { value, name: field } = target
        setSortBy(() => {
            return { [field]: value }
        })
    }

    return <section className="mail-sort">
        <select name="sort-by" onChange={handleChange}>
            <option value="date">Sort by date</option>
            <option value="subject">Sort by subject</option>
        </select>
    </section>

}