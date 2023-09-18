import { useContext } from "react"
import PlanetContext from "../../contexts/Planet"
import StarContext from "../../contexts/Star"

export default function InfoModal({ className }) {
    const { planetInfo } = useContext(PlanetContext)
    const { starInfo } = useContext(StarContext)

    const classes = `modal ${className}`

    const showLinks = () => {
        let list = "<ul>"

        if (planetInfo.article && planetInfo.article !== '') {
            list = `${list} <li><a href="${planetInfo.article}" target="_blank">Artigo</a></li>`
        }

        if (planetInfo.article && planetInfo.article !== '') {
            list = `${list} <li><a href="${planetInfo.page}" target="_blank">Página do modelo</a></li>`
        }

        list = `${list}</ul>`

        return list
    }

    return (
        <div id="infoModal" className={classes}>
            <header>
                <h4>{planetInfo.title ?? starInfo.title}</h4>
            </header>
            <main className="content">
                <div dangerouslySetInnerHTML={{ __html: planetInfo.content ?? starInfo.content }}></div>
                { planetInfo.article || planetInfo.page ? <div>
                        <br />
                        <b>Para mais informações, acesse:</b>
                        <div dangerouslySetInnerHTML={{ __html: showLinks() }}></div>
                    </div> : <></>}
            </main>
            <footer>
            </footer>
        </div>
    )
}