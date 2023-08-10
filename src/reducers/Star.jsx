export default function StarReducer(state, item) {
    return {
        scale: item.scale,
        colorFactors: item.colorFactors,
        title: item.information.title,
        content: item.information.content,
    }
}