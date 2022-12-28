export function MailCompose() {
    console.log('mail compose')
    // Compose – create a new email and send it

    return <section className="mail-compose">
        <header className="mail-compose-header">
            <span>new message</span>
            <button>X</button>
        </header>
        <form className="mail-compose-form">
            <input type="email" placeholder="to" />
            <input type="text" placeholder="subject" />
            <textarea rows="5" cols="50" placeholder="body"></textarea>
        </form>
        <footer className="mail-compose-footer">
            <button>send</button>
        </footer>
    </section>
}