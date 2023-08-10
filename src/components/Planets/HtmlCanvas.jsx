import { useContext } from 'react'
import store from '../../store'
import InfoModal from './InfoModal'
import PlanetContext from '../../contexts/Planet'
import ControlsInfoModal from '../General/ControlsInfoModal'

export default function HtmlCanvas() {
    const { setPlanetInfo } = useContext(PlanetContext)

    const handleClick = () => {
        store.resetPositionEventFired = true
        store.individualView = false

        setPlanetInfo({})
    }

    return (
        <div id="htmlCanvas">
            <button id="backBtn" className="btn btn-back invisible" onClick={handleClick}>Voltar</button>

            <InfoModal className="invisible" />

            <ControlsInfoModal className="invisible" />
        </div>
    )
}