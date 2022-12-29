export function NoteTxt({txt,onAddNote,setNewNoteFalse}) {

    const newNoteTxt = {
        type: "note-txt",
        isPinned: false,
        info: {
            txt:txt,
        },
        style: {
            backgroundColor: 'yellow',
            fontFamily: "Arial"
        }
    }
    onAddNote(newNoteTxt)
    setNewNoteFalse()
}