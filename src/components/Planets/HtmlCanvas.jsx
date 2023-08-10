import store from '../../store'
import InfoModal from './InfoModal'

export default function HtmlCanvas() {
    const handleClick = () => {
        store.resetPositionEventFired = true
        store.individualView = false
    }

    return (
        <div id="htmlCanvas">
            <button id="backBtn" className="btn btn-back invisible" onClick={handleClick}>Voltar</button>

            <InfoModal className="invisible" />
        </div>
    )
}