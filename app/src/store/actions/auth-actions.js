import axios from "axios"

export const loginUser = async (url, data) => {
    try {
        const result = await axios.post(url, data)

        if (result.status === 200) {
            return result.data
        } else {
            return null
        }
    } catch (error) {
        return false
    }
}