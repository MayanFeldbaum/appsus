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

}

function query() {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            // TODO: filterby
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

function getEmptyMail(subject = '', body = '', sentAt = '', to = '') {
    return {
        id: '',
        subject,
        body,
        isRead: utilService.getRandomIntInclusive(0, 1) > 0.4 ? true : false,
        sentAt,
        to
    }
}

function getDefaultFilter() {
    return { subject: '', body: '', isRead: false }
}

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Miss you!', 'Would love to catch up sometimes', 1551133930594, 'momo@momo.com'))
        mails.push(_createMail('Welcome to GitHub', 'You`re the newest member in this community of over 94 million people who use GitHub to host and review code, manage projects, and build software', 1672217852, 'github@github.com'))
        mails.push(_createMail('Work in Slack with people outside your company', 'Slack Connect is a secure way to communicate with the external people and partners you invite to your Slack instance, and it works just like regular Slack.', 1671651252, 'slackhq@mail.com'))
        console.log('mails:', mails)
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, sentAt, to) {
    const mail = getEmptyMail(subject, body, sentAt, to)
    mail.id = utilService.makeId()
    return mail
}

// const email = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt: 1551133930594,
//     to: 'momo@momo.com'
// }

const loggedinUser = {
    email: 'user@appsus.com', fullname: 'Mahatma Appsus'
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search 
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels 
}