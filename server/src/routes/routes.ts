import { Request, Response, Router, response } from 'express'
import axios from 'axios'

const route: Router = Router()


route.post('/generateToken', (req: Request, res: Response) => {
    const { CLIENT_ID, CLIENT_SECRET } = process.env
    const tokenURI = 'https://accounts.spotify.com/api/token'
    const body: string = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

    axios.post(tokenURI, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    })
    .then((res: any) => res.data)
    .then(data => res.json(data).status(200))
    .catch((err: any) => res.json({ info: 'Somethings went wrong!' }).status(500))
})

export default route