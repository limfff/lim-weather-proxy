import https from 'https';

export default function handler(req, res) {
  const { location } = req.query;
  const key = process.env.WEATHER_KEY;
  if (!location) {
    return res.status(400).json({ error: { status: 400, type: "MISSING PARAMETER", detail: "location 参数必填" } });
  }

  const url = `https://geoapi.qweather.com/v2/city/lookup?location=${encodeURIComponent(location)}&key=${key}`;

  https.get(url, (apiRes) => {
    let raw = "";
    apiRes.on("data", chunk => raw += chunk);
    apiRes.on("end", () => {
      // 透传 QWeather 的 HTTP status 和 body
      res.status(apiRes.statusCode || 200).json(JSON.parse(raw));
    });
  }).on("error", err => {
    res.status(500).json({ error: { status: 500, type: "UNKNOWN ERROR", detail: err.message } });
  });
}
