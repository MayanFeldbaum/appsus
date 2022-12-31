const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { BookIndex } from "./apps/book/views/book-index.jsx"
import { BookDetails } from "./apps/book/views/book-details.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"
import { MailCompose } from "./apps/mail/cmps/mail-compose.jsx"

export function App() {
    return <Router>
        <section className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="/mail/compose/:txt" element={<MailCompose />} />
                </Route>
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/:body" element={<NoteIndex />} />
                <Route path="/book" element={<BookIndex />} />
                <Route path="/book/:bookId" element={<BookDetails />} />
            </Routes>
        </section>
        <UserMsg />
    </Router>
}
