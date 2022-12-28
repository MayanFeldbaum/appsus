const { useState, useEffect } = React

export function MailFilter({ onSetFilter }) {
    // Filter emails: by search, by read/unread
    const [filterBy, setFilterBy] = useState('')

    useEffect(() => {
        onSetFilter(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterBy((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    return <section className="mail-filter">
        <form>
            <input type="text"
                id="title"
                name="txt"
                placeholder="Search"
                onChange={handleChange}
            />
        </form>
    </section>
}

// The emailService query function should get a criteria object, here is an idea:
// const criteria = {
// status: 'inbox/sent/trash/draft',
// txt: 'puki', // no need to support complex text search isRead: true, // (optional property, if missing: show all)
// isStared: true, // (optional property, if missing: show all)
// lables: ['important', 'romantic'] // has any of the labels }