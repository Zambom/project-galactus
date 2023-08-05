import { useContext } from "react"
import GalaxyContext from "../contexts/Galaxy"

export default function InfoModal({ className }) {
    const { galaxyInfo } = useContext(GalaxyContext)

    const classes = `modal ${className}`
    return (
        <div id="infoModal" className={classes}>
            <header>
                <h4>{galaxyInfo.title}</h4>
            </header>
            <main className="content" dangerouslySetInnerHTML={{ __html: galaxyInfo.content }}>
            </main>
            <footer>
                <button id="exploreBtn" className="btn btn-explore">Explorar</button>
            </footer>
        </div>
    )
}