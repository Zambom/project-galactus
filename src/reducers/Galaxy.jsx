export default function GalaxyReducer(state, item) {
    return {
        id: item.id,
        title: item.title,
        content: item.content
    }
}