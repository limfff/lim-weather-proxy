export default async function handler(req, res) {
  const { location } = req.query;
  const key = process.env.WEATHER_KEY;
  const url = `https://devapi.qweather.com/v7/warning/now?location=${location}&key=${key}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}