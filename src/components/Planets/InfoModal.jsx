import { useContext } from "react"
import PlanetContext from "../../contexts/Planet"

export default function InfoModal({ className }) {
    const { planetInfo } = useContext(PlanetContext)

    const classes = `modal ${className}`
    return (
        <div id="infoModal" className={classes}>
            <header>
                <h4>{planetInfo.title}</h4>
            </header>
            <main className="content" dangerouslySetInnerHTML={{ __html: planetInfo.content }}>
            </main>
            <footer>
            </footer>
        </div>
    )
}