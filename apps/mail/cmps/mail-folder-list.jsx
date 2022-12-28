export function MailFolderList() {
    console.log('mail folder list')


    return <section className="mail-folder-list">
        <div>inbox</div>
        <div>sent</div>
        <div>trash</div>
        <div>draft</div>
    </section>
    // Allow viewing the sent emails
    // In the inbox show all the emails that were sent to the current user, the other
    // emails are sent emails and should be displayed at the sent folder
}