import { toggleVisibility } from "../../utils/html"

export default function ControlsInfoModal({ className }) {
    const classes = `modal ${className}`

    const handleHelp = () => {
        toggleVisibility(document.getElementById('controlsModal'))
    }

    return (
        <div className="container">
            <button className="btn btn-help" onClick={handleHelp}>?</button>
            <div id="controlsModal" className={classes}>
                <header>
                    <h4>Controles</h4>
                    <button className="btn btn-close" onClick={handleHelp}>X</button>
                </header>
                <main className="content">
                    Para navegar na tela utilize o mouse com as seguintes ações:

                    <ul>
                        <li><strong>Botão esquero (clicar e segurar):</strong> rotacionar camera</li>
                        <li><strong>Botão direito (clicar e segurar):</strong> mover camera</li>
                        <li><strong>Scroll:</strong> zoom da camera</li>
                    </ul>
                </main>
                <footer>
                </footer>
            </div>
        </div>
    )
}