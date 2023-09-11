import api from "../services/api"

export const loader = async (star_id) => {
    try {
        const results = await api.get('/planets', { params: { star_id } })

        const { data: response } = results

        return response.data
    } catch (error) {
        console.log(error)

        return 'Error loading'
    }
}

export const updateParameters = async (data) => {
    try {
        const results = await api.put('/planets/add-parameters', { data })

        const { data: response } = results

        return response.data
    } catch (error) {
        console.log(error)

        return 'Error updating'
    }
}