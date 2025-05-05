import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())

const API_KEY = process.env.ACCUWEATHER_API_KEY

app.get('/location', async (req, res) => {
  const { q } = req.query
  if (!q) return res.status(400).json({ error: 'Missing query parameter: q' })

  try {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${encodeURIComponent(q)}`
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch location data' })
  }
})

app.get('/pollen', async (req, res) => {
  const { key } = req.query
  if (!key) return res.status(400).json({ error: 'Missing query parameter: key' })

  try {
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${API_KEY}&details=true`
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch pollen data' })
  }
})

app.listen(3001, () => {
  console.log('🌱 Proxy server running on http://localhost:3001')
})