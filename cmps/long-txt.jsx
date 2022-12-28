export function LongTxt({ txt, length }) {

    function getTxtToShow(txt, length) {
        return (txt.length < length) ? txt : txt.substring(0, length + 1) + '...'
    }

    return <td className="long-txt">
        <span>{getTxtToShow(txt, length)}</span>
    </td>
}