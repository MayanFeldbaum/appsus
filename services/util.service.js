export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    formatTime, 
    getFormattedTime,
}

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

function getMonthNameShortFormat(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ]
    return monthNames[date.getMonth()]
}

function formatTime(time) {
    // console.log('time', time)
    const now = Date.now();
    const diff = now - time
    // console.log('diff', diff)

    if (diff < MINUTE) return 'Just now'
    if (diff < MINUTE * 5) return 'A few minutes ago'
    if (diff < HOUR * 24) return 'Today'
    if (diff < HOUR * 24 * 2) return 'Yesterday'

    return getShortFormattedTime(time)
}

function getFormattedTime(time) {
    const d = new Date(time)
    return `At ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} 
    time: ${d.getHours()}:${d.getMinutes()}`
}

function getShortFormattedTime(time) {
    const d = new Date(time)
    if(d.getFullYear() === new Date().getFullYear()) {
        return `${d.getDate()} ${getMonthNameShortFormat(d)}`
    } else {
        return `${d.getDate()} ${getMonthNameShortFormat(d)} ${d.getFullYear()}`
    }
}