const { useState, useEffect } = React
const { Link } = ReactRouterDOM

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
    const [isModal, setIsModal] = useState(false)

    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy, mails])

    function loadMails() {
        mailService.query(filterBy, sortBy)
            .then(mails => {
                setMails(mails)
                const unreadMails = mails.filter(mail => !mail.isRead)
                setNumOfUnread(unreadMails.length)
            })
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
                const newMails = [mail, ...mails]
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

    function openModal() {
        return <div className="modal">
            <div className="modal-content">
                <Link to="/"><img src="assets/img/home.png" alt="" /></Link>
                <Link to="/about"><img src="assets/img/info.png" alt="" /></Link>
                <Link to="/mail"><img src="assets/img/gmail.png" alt="" /></Link>
                <Link to="/note"><img src="assets/img/keeps.png" alt="" /></Link>
                <Link to="/book"><img src="assets/img/books.png" alt="" /></Link>
            </div>
        </div>
    }

    return <section className="mail-index mail-layout">
        <div className="main-screen"
            onClick={() => document.body.classList.toggle('menu-open')}></div>
        <section className="main-nav">
            <div className="appsus-nav">
                <button className="fa-solid fa-bars menu-toggle-btn"
                    onClick={() => document.body.classList.toggle('menu-open')}></button>
                <div className="mail-logo">SusMail</div>
            </div>
            <MailFilterSearch onSetFilter={onSetFilter} />
            <button onClick={() => setIsModal(!isModal)} className="fa-solid fa-grip-vertical"></button>
            {isModal && openModal()}
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

