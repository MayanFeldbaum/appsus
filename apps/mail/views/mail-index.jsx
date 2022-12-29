const { useState, useEffect } = React

import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'
import { MailSort } from '../cmps/mail-sort.jsx'

import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(mailService.getDefaultSort())
    const [mails, setMails] = useState([])
    const [numOfUnread, setNumOfUnread] = useState('')

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

    function onSetSort() {
        setSortBy(sortBy)
    }

    function onAddMail(newMail) {
        mailService.save(newMail)
            .then(mail => {
                showSuccessMsg('email sent!')
                const newMails = [...mails, mail]
                setMails(newMails)
            })
    }

    function onUpdateMail(mailId, updateMail) {
        mailService.get(mailId)
            .then(() => {
                mailService.save(updateMail)
                    .then(updateMail => {
                        const updateMails = mails.map(mail => {
                            if (mail.id === mailId) return updateMail
                            return mail
                        })
                        setMails(updateMails)
                    })
            })
    }

    function numOfUnreadMail() {
        const unreadMails = mails.filter(mail => !mail.isRead)
        setNumOfUnread(unreadMails.length)
    }

    return <section className="mail-index mail-layout">
        <MailFilter onSetFilter={onSetFilter} />
        <MailSort onSetSort={onSetSort}/>
        <section className="mail-main">
            <div>
                <MailCompose onAddMail={onAddMail} />
                <MailFolderList onSetFilter={onSetFilter} numOfUnread={numOfUnread}/>
            </div>
            <MailList mails={mails} onUpdateMail={onUpdateMail} />
        </section>
    </section>
}

