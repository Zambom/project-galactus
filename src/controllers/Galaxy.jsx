import api from "../services/api"

export const loader = async () => {
    try {
        const results = await api.get('/galaxies')

        const { data: response } = results

        return response.data
    } catch (error) {
        console.log(error)

        return 'Error loading'
    }
}

export const updateParameters = async (data) => {
    try {
        const results = await api.put('/galaxies/add-parameters', { data })

        const { data: response } = results

        return response.data
    } catch (error) {
        console.log(error)

        return 'Error updating'
    }
}