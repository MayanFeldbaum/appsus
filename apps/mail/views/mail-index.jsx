const { useState, useEffect } = React

import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'

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

    console.log('mails:', mails)
    return <section className="mail-index mail-layout">

        <MailFilter onSetFilter={onSetFilter} />
        <MailList mails={mails} />
        {/* <MailFolderList />  */}
        {/* navbar */}
        {/* <MailCompose /> */}
    </section>
}

