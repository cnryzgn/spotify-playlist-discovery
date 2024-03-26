import { useEffect, useState } from 'react'
import './PlaylistDetailContainer.css'
import moment from 'moment'
import axios from 'axios'
import Cookies from 'js-cookie'
import { TrackModal } from '../partials/TrackModal/TrackModal'
import millisToMinutesAndSeconds from '../../helpers/millisToMinutesAndSeconds'
import { generateAccessToken } from '../../helpers/accessTokenGenerate'

import { LoadingIcon } from '../partials/Loading/LoadingIcon'
import { ImageModal } from '../partials/ImageModal/ImageModal'

import { tagParser } from '../../helpers/aTagParser'

export const PlaylistDetailsContainer = ({ currentPlaylist, currentTracks, loading }: any) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [showImage, setShowImage] = useState<boolean>(false)
    const [showResponsive, setShowResponsive] = useState<boolean>(false)
    const [track, setTrack] = useState()
    const [showTrackModal, setShowTrackModal] = useState<boolean>(false)
    const [trackModalLoading, setTrackModalLoading] = useState<boolean>(false)

    useEffect(() => {
        if (currentPlaylist && currentTracks.length > 0) {
            setIsSelected(true)
        }

        if (window.innerWidth <= 1020) {
            setShowResponsive(true)
        }
    }, [currentPlaylist, currentTracks])

    const handleResponsiveOpen = () => {
        const screenWidth = window.innerWidth

        if (screenWidth <= 1020) {
            setShowResponsive(!showResponsive)
        }
    }

    function fetchTrack(data: any) {
        setTrackModalLoading(true)
        const token = Cookies.get('accessToken')

        if (token && data) {

            axios.get(`https://api.spotify.com/v1/tracks/${data.track.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.data)
                .then(data => { setTrack(data); setShowTrackModal(true); setTimeout(() =>setTrackModalLoading(false), 175) })
                .catch(err => {
                    if (err.response?.status === 401) {
                        generateAccessToken().then(result => Cookies.set('accessToken', result.access_token))
                    }
                    setTimeout(() =>setTrackModalLoading(false), 175)
                    console.log(err)
                })
        }
    }

    function imageModalHandler() {
        setShowImage(!showImage)
    }

    return (
        <>

            {
                !isSelected
                    ? (
                        <div className={`playlist-details__container static`}>

                            <div className="playlist-details__header static">
                                <h1 id='static-title'>Pick a Playlist</h1>
                                <h1 className='skeleton-static skeleton-text'></h1>
                                <div id='playlist-img' className='skeleton-static skeleton-image'></div>
                            </div>
                            <div className="playlist-details__body static">
                                {/* Details (total number, author name...) */}
                                {/* Song lists */}
                                <ul className="song-list skeleton-static skeleton-box static">
                                    <li>
                                        <span id="left">
                                            <span id='id'></span>
                                            <span id='name'></span>
                                        </span>
                                        <span id="right">
                                            <span id='total-time'></span>
                                            <span> . </span>
                                            <span id='date'></span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="playlist-details__bottom static">
                                <button className="skeleton-static skeleton-button" id='app-button' ><i className="fa-brands fa-spotify"></i></button>
                                <button className="skeleton-static skeleton-button" id='web-button'><i className="fa-brands fa-spotify"></i></button>
                            </div>
                        </div>)

                    : (
                        <div className={`playlist-details__container ${showResponsive ? 'open' : ''}`}>

                            {
                                showImage && <ImageModal image={currentPlaylist?.images[0]?.url} imageModalHandler={imageModalHandler} />
                            }
                            {
                                loading &&
                                <LoadingIcon />
                            }
                            <div className='playlist-details__header'>
                                <div onClick={handleResponsiveOpen} className='arrow-wrapper'>
                                    {
                                        showResponsive
                                            ? <i id='arrow-icon' className="fa-solid fa-chevron-down"></i>
                                            : <i id='arrow-icon' className="fa-solid fa-chevron-up"></i>
                                    }
                                </div>
                                <div className='header__content'>
                                    <img onClick={imageModalHandler} src={currentPlaylist?.images[0]?.url} alt="playlist-img" id='playlist-img' />
                                    <div className="header__details">
                                        <h1>{currentPlaylist.name}</h1>
                                        <p>{tagParser(currentPlaylist?.description)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="playlist-details__body">
                                <ul className="song-list">
                                    {
                                        currentTracks.length > 0 &&
                                        currentTracks.map((track: any, i: number) => (
                                            <li key={i} onClick={() => fetchTrack(track)}>
                                                <span id="left">
                                                    <span id='id'>{i + 1}</span>
                                                    <span id='name'>{track?.track?.album?.artists[0]?.name} - {track?.track?.album?.name}</span>
                                                </span>
                                                <span id="right">
                                                    <span id='total-time'>{millisToMinutesAndSeconds(track?.track?.duration_ms)}</span>
                                                    <span> . </span>
                                                    <span id='date'>{moment(track?.added_at).format('DD.MM.YYYY, hh:mm')}</span>
                                                </span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="playlist-details__bottom">
                                <button onClick={() => window.location.href = currentPlaylist?.uri} id='app-button'>Open with Spotify <i className="fa-brands fa-spotify"></i></button>
                                <button onClick={() => window.open(currentPlaylist?.external_urls?.spotify)} id='web-button'>Open with Spotify (Web) <i className="fa-brands fa-spotify"></i></button>
                            </div>
                        </div>)
            }

            {
                (track && showTrackModal) &&
                <TrackModal track={track} setShowTrackModal={setShowTrackModal} trackModalLoading={trackModalLoading} />
            }
        </>
    )
}