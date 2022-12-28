export function MailFilter() {
    // Filter emails: by search, by read/unread
    console.log('mail filter')
}

// The emailService query function should get a criteria object, here is an idea:
// const criteria = {
// status: 'inbox/sent/trash/draft',
// txt: 'puki', // no need to support complex text search isRead: true, // (optional property, if missing: show all)
// isStared: true, // (optional property, if missing: show all)
// lables: ['important', 'romantic'] // has any of the labels }