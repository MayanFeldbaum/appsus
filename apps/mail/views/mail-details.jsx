const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    console.log('mailId:', mailId)

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        console.log('loading...')
        // mailService.get(mailId)
        //     .then(setMail)
        //     .catch((err) => {
        //         showErrorMsg('Had issues in book details')
        //         navigate('/book')
        //     })
    }

    return <section className="mail-details">
        mail details
    </section>
}