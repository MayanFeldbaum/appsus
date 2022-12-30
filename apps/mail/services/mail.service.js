import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyMail,
    getDefaultSort,
    getNextMailId,
    getPrevMailId
}

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.body))
            }

            if (filterBy.isRead) {
                if (filterBy.isRead === 'read') {
                    mails = mails.filter(mail => mail.isRead)
                } else if (filterBy.isRead === 'unread') {
                    mails = mails.filter(mail => !mail.isRead)
                }
            }

            if (filterBy.status === 'sent') {
                mails = mails.filter(mail => mail.from === getLoggedUser().email)
            } else if (filterBy.status === 'trash') {

            } else if (filterBy.status === 'draft') {

            }

            if (sortBy['sort-by'] === 'date') {
                mails.sort((a, b) => b.sentAt - a.sentAt)
            } else if (sortBy['sort-by'] === 'subject') {
                mails.sort((a, b) => a.subject.localeCompare(b.subject))
            }

            return mails
        })
}

function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', body = '', isRead = false, sentAt = Date.now(), from = getLoggedUser().email, to = '') {
    return {
        id: '',
        subject,
        body,
        isRead,
        sentAt,
        removeAt: null,
        from,
        to
    }
}

function getDefaultFilter() {
    return { status: '', txt: '', isRead: false, isStared: true, lables: [] }
}

function getDefaultSort() {
    return { 'sort-by': '' }
}

function getNextMailId(mailId) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            if (idx === mails.length - 1) idx = -1
            return mails[idx + 1].id
        })
}

function getPrevMailId(mailId) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            if (idx === 0) idx = mails.length - 1
            return mails[idx - 1].id
        })
}


function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Miss you!', 'Would love to catch up sometimes', false, 1551133930594, 'momo@momo.com', 'github@github.com'))
        mails.push(_createMail('Welcome to GitHub', 'You`re the newest member in this community of over 94 million people who use GitHub to host and review code, manage projects, and build software', true, 1669729703000, 'github@github.com', 'momo@momo.com'))
        mails.push(_createMail('Work in Slack with people outside your company', 'Slack Connect is a secure way to communicate with the external people and partners you invite to your Slack instance, and it works just like regular Slack.', true, 1659732506000, 'momo@momo.com', 'slackhq@mail.com'))
        console.log('mails:', mails)
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, isRead, sentAt, from, to) {
    const mail = getEmptyMail(subject, body, isRead, sentAt, from, to)
    mail.id = utilService.makeId()
    return mail
}

function getLoggedUser() {
    return {
        email: 'user@appsus.com', fullname: 'Mahatma Appsus'
    }
}


