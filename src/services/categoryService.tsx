import Cookies from 'js-cookie'
import axios from 'axios'
import { generateAccessToken } from '../helpers/accessTokenGenerate'

export async function categoryService(categoryId: string) {
    const accessToken: string | undefined = Cookies.get('accessToken')
    const result: any = { error: null, loading: false }

    try {
        result.loading = true
        const response = await axios.get(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?offset=0&limit=20`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const data = response.data
        result.categoryTitle = data.message
        result.playlists = {
            title: data.message,
            data: data.playlists
        }
        result.loading = false
    } catch (err: any) {
        console.log(err)
        if (err?.response?.status === 401) {
            result.error = {
                show: true,
                content: 'Unauthorized. Reload the page.',
                isError: true
            }
            generateAccessToken().then(result => Cookies.set('accessToken', result.access_token))
        } else {
            result.error = {
                show: true,
                content: err?.message,
                isError: true
            }
            result.loading = false
        }
    }

    return result
}


export async function categoriesService() {
    const accessToken = Cookies.get('accessToken')
    const result: any = {
        categories: [],
        error: null
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/browse/categories?limit=50', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const data = response.data
        result.categories = data.categories.items
    } catch (err: any) {
        if (err?.response?.status === 401) {
            result.error = {
                show: true,
                content: 'Unauthorized',
                isError: true
            }
            generateAccessToken().then(result => Cookies.set('accessToken', result.access_token))
        } else {
            result.error = {
                show: true,
                content: err?.message,
                isError: true
            }
        }
    }

    return result
}