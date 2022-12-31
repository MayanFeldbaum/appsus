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
        mails.unshift(_createMail('Miss you!', 'Would love to catch up sometimes', false, 1641043830000, 'github@github.com', 'user@appsus.com')) 
        mails.unshift(_createMail('Everyone can change backgrounds with Photoshop', 'Remove and replace your backgrounds. With Photoshop, you can easily change the scenery or completely remove backgrounds in just a few clicks. You can use Stock images from our free collection and try changing backgrounds now.', true, 1644082087390, 'mail@mail.adobe.com', 'user@appsus.com')) 
        mails.unshift(_createMail('Welcome to GitHub', 'You`re the newest member in this community of over 94 million people who use GitHub to host and review code, manage projects, and build software', true, 1646687347896, 'user@appsus.com', 'momo@momo.com'))
        mails.unshift(_createMail('Work in Slack with people outside your company', 'Slack Connect is a secure way to communicate with the external people and partners you invite to your Slack instance, and it works just like regular Slack.', true, 1648134962348, 'momo@momo.com', 'user@appsus.com'))
        mails.unshift(_createMail('I just listened to your podcast', 'Hi Sus, I recently discovered your work when I listened to the podcast Susli. You shared so many useful insights there. I wanted to let you know I run a podcast too. It`s called tayler, and I was wondering if you`d like to come on the air. The podcast has mention number of subscribers, downloads, etc. Prominent people like you have already taken part. Would you be interested? I will be happy to interview you at a date and time that is convenient for you. Thank you, Emil', true, 1649045083000, 'julia45345@mail.com', 'user@appsus.com')) // 4 Apr
        mails.unshift(_createMail('Font Awesome 2022 Year in Review', 'The best way to spread icon cheer is by singing loud for all to hear!',false, 1653983940548, 'user@appsus.com', 'feedback@fontawesome.com')) 
        mails.unshift(_createMail('Work in Slack with people outside your company', 'Slack Connect is a secure way to communicate with the external people and partners you invite to your Slack instance, and it works just like regular Slack.', true, 1659732506000, 'momo@momo.com', 'user@appsus.com')) 
        mails.unshift(_createMail('123 others made changes in your shared folders', 'Follow specific folders and get focused updates', false, 1667328203000, 'user@appsus.com', 'julia45345@mail.com')) 
        mails.unshift(_createMail('Welcome to GitHub', 'You`re the newest member in this community of over 94 million people who use GitHub to host and review code, manage projects, and build software', true, 1669729703000, 'user@appsus.com', 'momo@momo.com')) 
        mails.unshift(_createMail('Don`t Miss 2022`s Most Popular Classes', 'Don`t Miss 2022`s Most Popular Classes From branching out into new hobbies to launching new endeavors, Skillshare members expanded their horizons with the help of our top classes this year. Start your membership today to access some of this year`s most popular classes.', false, 1671129345365, 'user@appsus.com', 'feedback@fontawesome.com'))
        mails.unshift(_createMail('Photography Studio Grand Opening!', 'Hi everyone, I have expciting for you! This saturday will the grand opening of my new studio! It will be from 10:00 to 4:00. There will be entertaimment and lots of food, so come ouut and enjoy the festivites! Hope to see tio there!', true, 1671139365365, 'user@appsus.com', 'julia45345@mail.com'))
        mails.unshift(_createMail('123 others made changes in your shared folders', 'Follow specific folders and get focused updates', false, 1671139395865, 'user@appsus.com', 'julia45345@mail.com')) 
        mails.unshift(_createMail('I just listened to your podcast', 'Hi Sus, I recently discovered your work when I listened to the podcast Susli. You shared so many useful insights there. I wanted to let you know I run a podcast too. It`s called tayler, and I was wondering if you`d like to come on the air. The podcast has mention number of subscribers, downloads, etc. Prominent people like you have already taken part. Would you be interested? I will be happy to interview you at a date and time that is convenient for you. Thank you, Emil', false, 1671139395865, 'user@appsus.com', 'julia45345@mail.com'))
        mails.unshift(_createMail('Everyone can change backgrounds with Photoshop', 'Remove and replace your backgrounds. With Photoshop, you can easily change the scenery or completely remove backgrounds in just a few clicks. You can use Stock images from our free collection and try changing backgrounds now.', true, 1672308480000, 'user@appsus.com', 'mail@mail.adobe.com')) //yesterday
        mails.unshift(_createMail('Font Awesome 2022 Year in Review', 'The best way to spread icon cheer is by singing loud for all to hear!',false, 1672308480000, 'user@appsus.com', 'feedback@fontawesome.com'))
        mails.unshift(_createMail('Don`t Miss 2022`s Most Popular Classes', 'Don`t Miss 2022`s Most Popular Classes From branching out into new hobbies to launching new endeavors, Skillshare members expanded their horizons with the help of our top classes this year. Start your membership today to access some of this year`s most popular classes.', false, 1672414783000, 'maiEkds@mail.com', 'user@appsus.com'))
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


