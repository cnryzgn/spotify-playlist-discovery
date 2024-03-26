import Cookies from "js-cookie"
import axios from "axios"
import { generateAccessToken } from "../helpers/accessTokenGenerate"

export async function playlistService(currentPlaylistId: string) {
    const accessToken = Cookies.get('accessToken')
    const result: any = {
        playlist: {},
        tracks: [],
        error: null
    }

    try {
        const [playlistData, trackData] = await Promise.all([
            // for Playlist
            axios.get(`https://api.spotify.com/v1/playlists/${currentPlaylistId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }),
            // for Tracks by playlist
            axios.get(`https://api.spotify.com/v1/playlists/${currentPlaylistId}/tracks`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
        ])

        if (playlistData && trackData?.data?.items) {
            result.playlist = await playlistData.data
            result.tracks = await trackData.data
        }

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
                content: err?.response?.data?.error?.message,
                isError: true
            }
        }
    }

    return result
}