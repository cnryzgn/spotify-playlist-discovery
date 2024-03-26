import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { PlaylistDetailsContainer } from './components/PlaylistDetailContainer/PlaylistDetailContainer'
import { CategoryPlaylistMenu } from './components/CategoryPlaylistMenu/CategoryPlaylistMenu'
import { Toast } from './components/partials/Toast/Toast'
import { generateAccessToken } from './helpers/accessTokenGenerate'
import { categoriesService, categoryService } from './services/categoryService'
import { playlistService } from './services/playlistService'
import { LoadingIcon } from './components/partials/Loading/LoadingIcon'


function App() {
  // Main Loading add here
  const [mainLoading, setMainLoading] = useState<boolean>(false)
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false)
  const [menuLoading, setMenuLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>({
    show: false,
    content: '',
    isError: false
  })
  const [categories, setCategories] = useState<any>([])
  const [playlists, setPlaylists] = useState<any>([])
  const [currentPlaylist, setCurrentPlaylist] = useState<any>({
    name: '',
    id: '',
    href: '',
    url: '',
    external_urls: '',
    icons: [],
    images: [],
    description: ''
  })
  const [currentTracks, setCurrentTracks] = useState<any>([])
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string>('')
  const [category, setCategory] = useState<any>({
    name: '',
    id: '',
    href: '',
    url: '',
    external_urls: '',
    icons: [],
    images: [],
    description: ''
  }) // Right side


  useEffect(() => {
    if (detailsLoading) {
      setMenuLoading(false)
    } else if (menuLoading) {
      setDetailsLoading(false)
    }
  }, [menuLoading, detailsLoading])

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')

    // Handle Token
    if (!accessToken) {
      generateAccessToken().then(data => {
        Cookies.set('accessToken', data.access_token, { expires: new Date(new Date().getTime() + (data.expires_in * 1000)) })
        window.location.reload()
      })
    }


    // Fecth Categories
    categoriesService().then(result => {
      if (!mainLoading) { setMainLoading(true) }
      (result.error !== null) ? setError(result.error) : setCategories(result.categories)
      setMainLoading(false)
    })

    // Last Picked Category
    const categoryIdCookie = Cookies.get('category')
    if (!mainLoading) { setMainLoading(true) }
    if (categoryIdCookie && accessToken) {
      categoryService(categoryIdCookie).then(result => {
        if (result.error !== null) {
          setError(result.error)
          setMainLoading(false)
        } else {
          setCategory({ name: result.categoryTitle })
          setPlaylists({
            title: result.playlists.title,
            data: result.playlists.data
          })
        }
      })
    }
  }, [])


  // Set categoryTitle and fetch actual selected playlist data
  useEffect(() => {
    const accessToken = Cookies.get('accessToken')

    if (category.id !== '' && category.id !== undefined && accessToken) {
      setMenuLoading(true)
      categoryService(category.id).then(result => {
        if (result.error !== null) {
          setError(result.error)
        } else {
          setCategory({ name: result.categoryTitle })
          setPlaylists({
            title: result.playlists.title,
            data: result.playlists.data
          })
          setMenuLoading(false)
        }
      })
    }
  }, [category])


  // Tracks by current playlist
  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    const currentPlayListIdCookie = Cookies.get('currentPlaylist')

    if (currentPlayListIdCookie && accessToken) {
      setDetailsLoading(true)
      playlistService(currentPlayListIdCookie).then((result) => {
        if (result.error !== null) {
          setError(result.error)
        } else {
          setCurrentPlaylist(result?.playlist)
          setCurrentTracks(result?.tracks.items)
        }
        setDetailsLoading(false)
      })

    }
  }, [currentPlaylistId])

  return (
    <div className='container'>
      {mainLoading && <LoadingIcon />}
      <CategoryPlaylistMenu
        category={category} setCategory={setCategory}
        categories={categories}
        playlists={playlists} setPlaylists={setPlaylists}
        currentPlaylist={currentPlaylist} setCurrentPlaylist={setCurrentPlaylist}
        currentPlaylistId={currentPlaylistId} setCurrentPlaylistId={setCurrentPlaylistId}
        loading={menuLoading}
      />
      <PlaylistDetailsContainer currentPlaylist={currentPlaylist} currentTracks={currentTracks} loading={detailsLoading} />
      {
        error.show &&
        <Toast content={error.content} isError={error.isError} />
      }
    </div>
  )
}

export default App

/**
 * Everlasting indie hits, ft Dijon. This month, we’re celebrating the essence of Black culture across the world. Discover more Black artists and their contributions
 */