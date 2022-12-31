import { AppModal } from "../cmps/app-modal.jsx"

const { Fragment } = React

export function About() {
    return <Fragment>
        <AppModal />
        <section className="about">
            <section className="mayan">
                <div className="img-about">
                    <img src="assets/img/1.jpg" alt="" />
                </div>
                <div className="about-mayan-content">
                    <h2>Mayan Feldbaum</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt sapiente provident, ex officiis asperiores dolore iusto aut rem! Esse, quidem officia aspernatur veniam minima, dignissimos, eveniet totam maiores illum officiis voluptates cum cupiditate aut quisquam. Velit fuga veritatis iusto debitis assumenda atque, provident quia itaque commodi natus ab incidunt tempore!</p>
                </div>
            </section>
            <section className="linoy">
                <div className="about-linoy-content">
                    <h2>Linoy Alkalay</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt sapiente provident, ex officiis asperiores dolore iusto aut rem! Esse, quidem officia aspernatur veniam minima, dignissimos, eveniet totam maiores illum officiis voluptates cum cupiditate aut quisquam. Velit fuga veritatis iusto debitis assumenda atque, provident quia itaque commodi natus ab incidunt tempore!</p>
                </div>
                <div className="img-about">
                    <img src="assets/img/linoy.jpeg" alt="" />
                </div>
            </section>
        </section>
    </Fragment>
}
