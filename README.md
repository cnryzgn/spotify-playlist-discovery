# Spotify Playlist Discovery

This website uses Spotify API, so users can choose a category and find suggested playlists. Users can easily explore and listen to songs in these playlists, making music discovery simple.

## Screenshot

![ScreenShot](https://raw.githubusercontent.com/cnryzgn/spotify-playlist-discovery/main/screenshots/screenshot-1.png)
![ScreenShot](https://raw.githubusercontent.com/cnryzgn/spotify-playlist-discovery/main/screenshots/screenshot-2.png)

## Setup

Make sure you have Node and GIT

```bash
git clone https://github.com/cnryzgn/spotify-playlist-discovery.git
```
Open dir server

```bash
cd spotify-playlist-discovery/server
```

Fill CLIENT_ID and CLIENT_SECRET

.env
```bash
CLIENT_ID = 
CLIENT_SECRET = 
```
And then start server

```bash
npm install && npm build && npm start
```

For Client Side open new cmd tab and open project folder

```bash
cd spotify-playlist-discovery
```

Installations, build and start
```bash
npm install && npm build && npm run dev
```