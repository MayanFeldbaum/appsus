export function NoteImg({txt,onAddNote,setNewNoteFalse}) {

    const newImgTxt = {
        type: "note-img",
        isPinned: false,
        info: {
            url:txt,
        },
        style: {
            backgroundColor: 'yellow',
            fontFamily: "Arial"
        }
    }
    onAddNote(newImgTxt)
    setNewNoteFalse()
}