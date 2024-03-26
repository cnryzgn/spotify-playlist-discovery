import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import routes from './routes/routes'

dotenv.config()
const app: Express = express()
const PORT: string|number = process.env.PORT || 9000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', routes)


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))