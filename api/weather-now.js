export default async function handler(req, res) {
  const { location } = req.query;
  const key = process.env.WEATHER_KEY;
  const url = `https://mr487qncjq.re.qweatherapi.com/v7/weather/now?location=${location}&key=${key}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
