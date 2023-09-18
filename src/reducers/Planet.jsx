export default function PlanetReducer(state, item) {
    return {
        title: item.title,
        content: item.content,
        article: item.article,
        page: item.page
    }
}