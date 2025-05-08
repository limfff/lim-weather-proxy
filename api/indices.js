export default async function handler(req, res) {
  const { location, type } = req.query;
  const key = process.env.WEATHER_KEY;
  const url = `https://devapi.qweather.com/v7/indices/1d?location=${location}&type=${type || "3,8"}&key=${key}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}