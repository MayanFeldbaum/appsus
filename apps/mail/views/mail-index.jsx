const { useState, useEffect } = React

import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'

import { mailService } from '../services/mail.service.js'

export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(setMails)
    }

    console.log('mails:', mails)
    return <section className="mail-index">
        mail app

        <MailList mails={mails} />
        {/* <MailFilter /> */}
        {/* <MailFolderList />  */}
        {/* navbar */}
        {/* <MailCompose /> */}
    </section>
}

