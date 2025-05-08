import fetch from 'node-fetch';
export default async function handler(req, res) {
  const response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Shanghai");
  const data = await response.json();
  res.status(200).json(data);
}
