import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { generateAccessToken } from "../helpers/accessTokenGenerate"

interface IFetch {
    data: any,
    error: Error | null
}

export function useFetchData(url: string, method: string, config: any = { headers: {}, body: {} }): IFetch {
    const [data, setData] = useState<any[]>([])
    const [error, setError] = useState<Error | null>(null)

    const customConfig = method.toUpperCase() === 'GET'
        ? { method: method.toUpperCase(), headers: config.headers }
        : { method: method.toUpperCase(), headers: config.headers, body: config.body }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await fetch(url, customConfig)
                const data = await response.json() // maybe data replace with json
                if (data?.error && data?.err.status === 401) {
                    generateAccessToken().then(result => Cookies.set('accessToken', result.access_token))
                    fetchData()
                }
                setData(data)
            } catch (err: any) {
                if (err.response?.status === 401) {
                    setError(err)
                    generateAccessToken().then(result => Cookies.set('accessToken', result.access_token))
                }
            }
        };

        fetchData();
    }, [])

    return { data, error }
}