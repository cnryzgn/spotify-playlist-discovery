import axios from "axios"

export const generateAccessToken = async () => {
    const tokenURI = 'http://localhost:8000/api/generateToken'

    try {
        const response: any = await axios.post(tokenURI)
        const data = await response.data
        return data
    } catch (e) {
        console.log(e)
        return false
    }
}
