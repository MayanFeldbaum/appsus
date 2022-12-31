import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onUpdateMail }) {
    return <section className="mail-list">
        <table border="1" className="mail-table">
            <tbody>
                {mails.map(mail => <MailPreview key={mail.id} mail={mail} onUpdateMail={onUpdateMail} />)}
            </tbody>
        </table>
    </section>
}
