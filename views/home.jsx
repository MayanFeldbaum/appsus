import { AppModal } from "../cmps/app-modal.jsx"

const { Fragment } = React
const { Link } = ReactRouterDOM

export function Home() {
    return <Fragment>
        <AppModal />
        <header className="home-header">
            <h1>Your favorite apps in one place!</h1>
        </header>
        <section className="home">
            <div className="home-card home-susmail">
                <Link to="/mail"><img src="assets/img/gmail.png" alt="" /></Link>
                <h2>SusMail</h2>
            </div>
            <div className="home-card home-suskeep">
                <Link to="/note"><img src="assets/img/keeps.png" alt="" /></Link>
                <h2>SusKeep</h2>
            </div>
            <div className="home-card home-missbook">
                <Link to="/book"><img src="assets/img/books.png" alt="" /></Link>
                <h2>MissBook</h2>
            </div>
        </section>
    </Fragment>
}
