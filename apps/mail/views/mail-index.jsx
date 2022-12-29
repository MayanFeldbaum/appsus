const { useState, useEffect } = React

import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'

import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onAddMail(newMail) {
        mailService.save(newMail)
            .then(mail => {
                showSuccessMsg('email sent!')
                const newMails = [...mails, mail]
                setMails(newMails)
            })
    }

    return <section className="mail-index mail-layout">
        <MailFilter onSetFilter={onSetFilter} />
        <MailCompose onAddMail={onAddMail} />
        <section className="mail-main">
            <MailFolderList onSetFilter={onSetFilter} />
            <MailList mails={mails} />
        </section>
    </section>
}

