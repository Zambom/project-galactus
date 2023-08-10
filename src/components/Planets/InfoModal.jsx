import { useContext } from "react"
import PlanetContext from "../../contexts/Planet"
import StarContext from "../../contexts/Star"

export default function InfoModal({ className }) {
    const { planetInfo } = useContext(PlanetContext)
    const { starInfo } = useContext(StarContext)

    const classes = `modal ${className}`
    return (
        <div id="infoModal" className={classes}>
            <header>
                <h4>{planetInfo.title ?? starInfo.title}</h4>
            </header>
            <main className="content" dangerouslySetInnerHTML={{ __html: planetInfo.content ?? starInfo.content }}>
            </main>
            <footer>
            </footer>
        </div>
    )
}