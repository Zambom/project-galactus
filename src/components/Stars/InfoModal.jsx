import { useContext } from "react"
import StarContext from "../../contexts/Star"

export default function InfoModal({ className }) {
    const { starInfo } = useContext(StarContext)

    const classes = `modal ${className}`
    return (
        <div id="infoModal" className={classes}>
            <header>
                <h4>{starInfo.title}</h4>
            </header>
            <main className="content" dangerouslySetInnerHTML={{ __html: starInfo.content }}>
            </main>
            <footer>
                <button id="exploreBtn" className="btn btn-explore">Explorar</button>
            </footer>
        </div>
    )
}