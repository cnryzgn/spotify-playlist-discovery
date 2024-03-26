import './CategoryPlaylistMenu.css'

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Cookies from 'js-cookie'
import { LoadingIcon } from '../partials/Loading/LoadingIcon'

export const CategoryPlaylistMenu = ({ category, categories, setCategory, playlists, currentPlaylist, setCurrentPlaylistId, setCurrentPlaylist, loading }: any) => {


    const selectHandler = (category: any) => {
        Cookies.set('category', category.id)
        setCategory({
            name: category.name,
            id: category.id,
            href: category.href,
            icons: category.icons,
        })
    }

    const playlistHandler = (playlist: any) => {
        Cookies.set('currentPlaylist', playlist.id)
        setCurrentPlaylist(playlist)
        setCurrentPlaylistId(playlist.id)
    }

    return (
        <div className="category-playlist__menu">
            <div className="category-playlist__header">
                <div className='title'>
                    <h1>Select Category</h1>
                    {category.name !== '' && <p># {category.name}</p>}
                </div>

                { loading && <LoadingIcon /> }

                {
                    categories &&
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="selection"
                            label="category"
                            defaultValue={category.name}
                            value={category.name}
                            onChange={(e) => {
                                const selectedCategory = categories.find((categoryItem: any) => categoryItem.name === e.target.value);
                                if (selectedCategory) {
                                    selectHandler(selectedCategory);
                                }
                            }}
                        >

                            {
                                categories &&
                                categories?.map((categoryItem: any, i: number) => (
                                    <MenuItem
                                        key={categoryItem.id}
                                        value={categoryItem.name}
                                    >
                                        {categoryItem.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                }




            </div>

            {/* List of Playlists */}

            <div className="playlist__container">
                {
                    playlists &&
                    <>
                        <h1 id='playlist-title'>{playlists.title}</h1>

                        <ul>
                            {
                                playlists?.data?.items?.map((playlist: any, i: number) => (
                                    <li key={i} onClick={() => playlistHandler(playlist)} className={`playlist__item ${currentPlaylist.name === playlist.name ? 'selected-item' : ''}`}>
                                        <div className="left">
                                            <img className='playlist-thumbnail' src={playlist.images[0].url} alt="playlist-thumbnail.jpg" />
                                            <p>{playlist.name}</p>
                                        </div>
                                        <div className="right">
                                            <i className="fa-solid fa-circle-right"></i>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                }
            </div>

            <div className="category-playlist__header">
            </div>

        </div>
    )
}