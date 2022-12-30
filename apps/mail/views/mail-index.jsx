const { useState, useEffect } = React

import { MailList } from '../cmps/mail-list.jsx'
import { MailFilterRead } from '../cmps/mail-filter-read.jsx'
import { MailFilterSearch } from '../cmps/mail-filter-search.jsx'
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
    }, [filterBy, sortBy])

    function loadMails() {
        mailService.query(filterBy, sortBy)
            .then(mails => setMails(mails))
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
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
        <section className="main-nav">
            <div className="appsus-nav">
                <button className="fa-solid fa-bars"></button>
                <div className="mail-logo">Susmail</div>
            </div>
            <MailFilterSearch onSetFilter={onSetFilter} />
        </section>
        <section className="mail-main">
            <div>
                <MailCompose onAddMail={onAddMail} />
                <MailFolderList onSetFilter={onSetFilter} numOfUnread={numOfUnread} />
            </div>
            <div className="mail-container">
                <header className="mail-list-header">
                    <MailFilterRead onSetFilter={onSetFilter} />
                    <MailSort onSetSort={onSetSort} />
                </header>
                <MailList mails={mails} onUpdateMail={onUpdateMail} />
            </div>
        </section>
    </section>
}

