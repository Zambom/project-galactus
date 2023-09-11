export default function StarReducer(state, item) {
    return {
        scale: item.scale,
        colorFactors: item.colorFactors,
        id: item.information.id,
        title: item.information.title,
        content: item.information.content,
    }
}