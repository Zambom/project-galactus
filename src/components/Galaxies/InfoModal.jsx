import { useContext } from "react"
import GalaxyContext from "../../contexts/Galaxy"
import { useNavigate } from "react-router-dom"

export default function InfoModal({ className }) {
    const { galaxyInfo } = useContext(GalaxyContext)
    const navigate = useNavigate()

    const classes = `modal ${className}`

    const handleExplore = () => {
        navigate('/star-systems')
    }

    return (
        <div id="infoModal" className={classes}>
            <header>
                <h4>{galaxyInfo.title}</h4>
            </header>
            <main className="content" dangerouslySetInnerHTML={{ __html: galaxyInfo.content }}>
            </main>
            <footer>
                <button id="exploreBtn" className="btn btn-explore" onClick={handleExplore}>Explorar</button>
            </footer>
        </div>
    )
}