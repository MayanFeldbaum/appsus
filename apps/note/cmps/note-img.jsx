export function NoteImg({txt,onAddNote,setNewNoteFalse}) {

    console.log(txt);
    const newImgTxt = {
        type: "note-img",
        isPinned: false,
        info: {
            url:txt,
            title: "image"
        },
        style: {
            backgroundColor: 'yellow',
            fontFamily: "Arial"
        }
    }
    onAddNote(newImgTxt)
    setNewNoteFalse()
}
