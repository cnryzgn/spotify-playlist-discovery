import axios from "axios"
import Cookies from "js-cookie"
import { generateAccessToken } from "../helpers/accessTokenGenerate"

export async function trackService() {
    const result = {
        error: null,
        data: null
    }

    try {
        const response = await axios.get('')
        const data =  await response.data
    } catch(err: any) {
        console.log(err)
        if (err.response?.status === 401) {
            generateAccessToken().then(result => Cookies.set('accessToken', result.access_token))
        }
    }
    

    return result
}