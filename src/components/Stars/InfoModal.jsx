import { useContext } from "react"
import StarContext from "../../contexts/Star"
import { useNavigate } from "react-router-dom"

export default function InfoModal({ className }) {
    const { starInfo } = useContext(StarContext)
    const navigate = useNavigate()

    const classes = `modal ${className}`

    const handleExplore = () => {
        navigate('/star-system-details')
    }

    return (
        <div id="infoModal" className={classes}>
            <header>
                <h4>{starInfo.title}</h4>
            </header>
            <main className="content" dangerouslySetInnerHTML={{ __html: starInfo.content }}>
            </main>
            <footer>
                <button id="exploreBtn" className="btn btn-explore" onClick={handleExplore}>Explorar</button>
            </footer>
        </div>
    )
}