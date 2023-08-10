import store from '../../store'
import ControlsInfoModal from '../General/ControlsInfoModal'
import InfoModal from './InfoModal'

export default function HtmlCanvas() {
    const handleClick = () => {
        store.resetPositionEventFired = true
    }

    return (
        <div id="htmlCanvas">
            <button id="backBtn" className="btn btn-back invisible" onClick={handleClick}>Voltar</button>

            <InfoModal className="invisible" />

            <ControlsInfoModal className="invisible" />
        </div>
    )
}