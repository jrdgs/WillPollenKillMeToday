// App.jsx
import { useState } from 'react'

const App = () => {
  const [location, setLocation] = useState('')
  const [result, setResult] = useState('')

  const getPollenInfo = async (loc) => {
    try {
      // Get location key from backend proxy (AccuWeather)
      const locRes = await fetch(`http://localhost:3001/location?q=${encodeURIComponent(loc)}`)
      const locData = await locRes.json()
      const locationKey = locData[0]?.Key
      console.log(locationKey)

      if (!locationKey) {
        setResult("Location not found.")
        return
      }

      // Get pollen data from backend proxy
      const pollenRes = await fetch(`http://localhost:3001/pollen?key=${locationKey}`)
      const pollenData = await pollenRes.json()
      console.log(pollenData)

      const pollenLevel = pollenData?.DailyForecasts?.[0]?.AirAndPollen?.find(i => i.Name === "Tree")?.Category

      if (!pollenLevel) {
        setResult("Pollen data not available.")
      } else if (pollenLevel.toLowerCase() === 'low') {
        setResult("You'll be fine (low pollen count)")
      } else if (pollenLevel.toLowerCase() === 'moderate' || pollenLevel.toLowerCase() === 'medium') {
        setResult("Take your Zyrtec (moderate pollen count)")
      } else if (pollenLevel.toLowerCase() === 'high' || pollenLevel.toLowerCase() === 'very high') {
        setResult("You're gonna die if you step outside (high pollen count)")
      } else {
        setResult(`Pollen level: ${pollenLevel}`)
      }
    } catch (err) {
      console.error(err)
      setResult("Something went wrong. Try again.")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (location.trim()) getPollenInfo(location.trim())
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-center">
      <h1 className="text-3xl font-bold mb-6">Will Pollen Kill Me Today</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
          className="w-full px-4 py-2 rounded border border-gray-300"
        />
        <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Check</button>
      </form>
      {result && <p className="mt-6 text-xl font-semibold">{result}</p>}
    </div>
  )
}

export default App