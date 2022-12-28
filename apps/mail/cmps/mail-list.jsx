import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails }) {
    // Display the unread emails count
    // Allow sorting the emails by date and by title
    // Allow viewing the sent emails

    return <section className="mail-list">
        Mail table!
        <table border="1">
            <thead>
                <tr>
                    <th>I'm thead!</th>
                </tr>
            </thead>
            <tbody>
                {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
            </tbody>
        </table>
    </section>

}
