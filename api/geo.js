export default async function handler(req, res) {
  const { location } = req.query;                // e.g. "113.771797,22.998003"
  const key = process.env.WEATHER_KEY;
  // 调用 QWeather 的 GeoAPI 获取城市信息
  const url = `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${key}`;
  const response = await fetch(url);
  if (!response.ok) {
    // 直接把 QWeather 的错误透传给前端
    const err = await response.json();
    return res.status(response.status).json(err);
  }
  const data = await response.json();
  res.status(200).json(data);
}
