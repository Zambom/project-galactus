import store from '../store'

export default function HtmlCanvas() {
    const handleClick = () => {
        store.resetPositionEventFired = true
        console.log('log')
    }

    return (
        <div id="htmlCanvas">
            <button id="backBtn" className="btn btn-back invisible" onClick={handleClick}>Voltar</button>
        </div>
    )
}