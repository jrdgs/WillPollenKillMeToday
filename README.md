# WillPollenKillMeToday.com

A minimalist web app that tells you if pollen levels are safe based on your location with a touch of drama. Enter your city and find out if you can breathe easy, need to grab your Zyrtec, or should just stay inside.

## What It Does

1. You enter a location (e.g. Boston).
2. The app looks up the city using AccuWeather's Locations API.
3. It then fetches pollen level data for that location.
4. Based on the pollen severity, you'll see one of the following messages:
   - `"You'll be fine"` (Low)
   - `"Take your zyrtec"` (Moderate)
   - `"You're gonna die if you step outside"` (High)

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **API**: [AccuWeather](https://developer.accuweather.com/) (City Search & Forecast APIs)

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/willpollenkillmetoday.git
cd willpollenkillmetoday
```

### 2. Set up the backend proxy

```bash
cd proxy-server
npm install
```

Create a `.env` file inside `proxy-server/`:

```env
ACCUWEATHER_API_KEY=your_real_key_here
```

Run the proxy server:

```bash
node index.js
```

### 3. Start the frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open in browser: [http://localhost:5173](http://localhost:5173)

## Project Structure

```
project-root/
├── proxy-server/
│   ├── index.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── vite.config.js
```

## Why?

Because sometimes you just want to know if it's safe to breathe with no fluff.

## License

MIT - do what you want, just don’t sue me if you go outside and sneeze.
