import { AppModal } from "../cmps/app-modal.jsx"

const { Fragment } = React

export function About() {
    return <Fragment>
        <AppModal />
        <section className="about">
            <section className="mayan">
                <div className="img-about">
                    <img src="assets/img/mayan.jpeg" alt="" />
                </div>
                <div className="about-mayan-content">
                    <h2>Mayan Feldbaum</h2>
                    <p>Hello! My name is Mayan Feldbaum, and I am 30 years old. I live in Haifa Israel,
                        and I am currently a Coding Academy student.  In my free time, I enjoy watching movies.
                        I am excited to see what the future holds. Thank you for taking the time to get to know me!</p>
                </div>
            </section>
            <section className="linoy">
                <div className="about-linoy-content">
                    <h2>Linoy Alkalay</h2>
                    <p>Hello! My name is Linoy Alkalay, and I am 28 years old.
                        I live in Rosh Haayin, and I am currently a Coding Academy student.
                        In my free time, I enjoy coffee. I am also interested in css design.
                        I am excited to see what the future holds.
                        Thank you for taking the time to get to know me!</p>
                </div>
                <div className="img-about">
                    <img src="assets/img/linoy.jpeg" alt="" />
                </div>
            </section>
        </section>
    </Fragment>
}
