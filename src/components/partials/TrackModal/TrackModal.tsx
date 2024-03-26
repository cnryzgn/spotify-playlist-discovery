import { useEffect, useRef } from "react"
import moment from "moment"
import './TrackModal.css'
import millisToMinutesAndSeconds from '../../../helpers/millisToMinutesAndSeconds'

import { LoadingIcon } from "../Loading/LoadingIcon"

export const TrackModal = ({ track, setShowTrackModal, trackModalLoading }: any): JSX.Element => {
    const trackModalRef = useRef<any>()

    useEffect(() => {
        const clickHandler = (e: any) => {
            e.stopPropagation()

            if (!trackModalRef.current.contains(e.target)) {
                setShowTrackModal(false)
            }
        }

        window.addEventListener('click', clickHandler)
        return () => {
            window.removeEventListener('click', clickHandler)
        }
    }, [])
    
    function closeBtnHandler(): void {
        setShowTrackModal(false)
    }

    return (
        <div ref={trackModalRef} className={`track-modal ${!setShowTrackModal ? 'track-modal__hidden' : ''}`}>
            { trackModalLoading && <LoadingIcon /> }
            <div className="track-modal__head">
                {/* <img src="playlist.png" alt="track.png" /> */}
                <img src={track.album.images[0].url} width={track.album.images[0].width} height={track.album.images[0].height} alt="track.png" />
                <div className="artist-details">
                    <h2>{track.album.artists[0].name}</h2>
                    <h4 id="track-name">{track.name}</h4>
                    <button id="artist-external-button" onClick={() => window.open(track.album.artists[0].external_urls.spotify)}>Artist Spotify Page</button>
                </div>
            </div>
            <div className="track-modal__body">
                <div className="col">
                    <h5><span>Artist:</span><span>{track.album.artists[0].name}</span></h5>
                    <p><span>Type:</span> <span id="album-name">{track.album.album_type}</span></p>
                    <p><span>Popularity:</span> <span>{track.popularity}</span></p>
                    <p><span>Duration Time:</span> <span>{millisToMinutesAndSeconds(track.duration_ms)}</span></p>
                    <p>
                        <span id="track-name">{track.name}</span>
                        released on {moment(track.album.release_date).format('MMMM D, YYYY')}
                    </p>
                </div>
            </div>
            <div className="track-modal__bottom">
                {/* uri */}
                <button id='app-button' onClick={() => window.location.href = track?.uri}>Open with Spotify <i className="fa-brands fa-spotify"></i></button>
                {/* external_urls[0] */}
                <button id='web-button' onClick={() => window.open(track?.external_urls.spotify)} >Open with Spotify (Web) <i className="fa-brands fa-spotify"></i></button>
            </div>

            <button id="close-button" onClick={closeBtnHandler}><i className="fa-solid fa-xmark"></i></button>
        </div>
    )
}