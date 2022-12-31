const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'

import { bookService } from '../../book/services/book.service.js'
import { showSuccessMsg } from "../../../services/event-bus.service.js"

export function BookIndex() {
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [books, setBooks] = useState([])
    const [isModal, setIsModal] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(booksToUpdate => {
            setBooks(booksToUpdate)
            setIsLoading(false)
        })
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            showSuccessMsg('Book removed')
        })
            .catch((err) => {
                showErrorMsg('Could not remove book, try again please!')
            })
    }

    function openModal() {
        return <div className="modal">
            <div className="modal-content">
                <Link to="/"><img src="assets/img/home.png" alt="" /></Link>
                <Link to="/about"><img src="assets/img/info.png" alt="" /></Link>
                <Link to="/mail"><img src="assets/img/gmail.png" alt="" /></Link>
                <Link to="/note"><img src="assets/img/keeps.png" alt="" /></Link>
                <Link to="/book"><img src="assets/img/books.png" alt="" /></Link>
            </div>
        </div>
    }

    return <Fragment>
        <section className="main-nav">
            <div className="appsus-nav">
                <button className="fa-solid fa-bars menu-toggle-btn"
                    onClick={() => document.body.classList.toggle('menu-open')}></button>
                <h1 className="mail-logo">BookSus</h1>
            </div>
            <button onClick={() => setIsModal(!isModal)} className="fa-solid fa-grip-vertical"></button>
            {isModal && openModal()}
        </section>
        <section className="book-index">
            <div className="main-layout">
                <BookFilter onSetFilter={onSetFilter} />
                <div className="book-container main-layout full">
                    {!isLoading && <BookList books={books} onRemoveBook={onRemoveBook} />}
                    {isLoading && <div>Loading...</div>}
                    {!books.length && <div>No items to show...</div>}
                </div>
            </div>
        </section>
    </Fragment>
}