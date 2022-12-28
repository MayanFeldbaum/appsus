
import { MailList } from '../cmps/mail-list.jsx'
import { MailDetails } from './mail-details.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'

import { mailService } from '../services/mail.service.js'

export function MailIndex() {
    return <div>
        mail app
        
        <MailList />
        <MailDetails /> {/* ????? */}
        <MailFilter />
        <MailFolderList />
        <MailCompose />
    </div>
}

