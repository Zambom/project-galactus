import api from "../services/api"

export const loader = async (galaxy_id) => {
    try {
        const results = await api.get('/star-systems', { params: { galaxy_id } })

        const { data: response } = results

        return response.data
    } catch (error) {
        console.log(error)

        return 'Error loading'
    }
}

export const updateParameters = async (data) => {
    try {
        const results = await api.put('/star-systems/add-parameters', { data })

        const { data: response } = results

        return response.data
    } catch (error) {
        console.log(error)

        return 'Error updating'
    }
}