const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"
import { MailCompose } from "./apps/mail/cmps/mail-compose.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="/mail/compose/:txt" element={<MailCompose />} />
                </Route>
                <Route path="/mail/:mailId" element={<MailDetails />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/:body" element={<NoteIndex />} />
            </Routes>
        </section>
        <UserMsg />
    </Router>
}
