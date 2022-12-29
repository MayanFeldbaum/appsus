import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onUpdateMail }) {
    // Display the unread emails count
    // Allow sorting the emails by date and by title
    // Allow viewing the sent emails

    return <section className="mail-list">
        <header className="mail-list-header">
            list of Emails!
        </header>
        <table border="1" className="mail-table">
            <tbody>
                {mails.map(mail => <MailPreview key={mail.id} mail={mail} onUpdateMail={onUpdateMail} />)}
            </tbody>
        </table>
    </section>
}
