import https from "https";

export default function handler(req, res) {
  const { location } = req.query;
  const key = process.env.WEATHER_KEY;
  if (!location) {
    return res.status(400).json({ error: { status: 400, type: "MISSING_PARAMETER", detail: "location 参数必填" } });
  }

  // 首先尝试用专属 v7 Host 调 geo（不确定是否支持）
  const v7Host = "mr487qncjq.re.qweatherapi.com";
  const geoHost = "geoapi.qweather.com";
  const pathV7 = `/v2/city/lookup?location=${encodeURIComponent(location)}&key=${key}`;
  const pathGeo = `/v2/city/lookup?location=${encodeURIComponent(location)}&key=${key}`;

  const tryFetch = (host, path, cb) => {
    https.get({ hostname: host, path, protocol: "https:" }, apiRes => {
      let raw = "";
      apiRes.on("data", d => raw += d);
      apiRes.on("end", () => cb(apiRes.statusCode, raw));
    }).on("error", err => {
      console.error("Request error to", host, err);
      cb(500, JSON.stringify({ error:{status:500,type:"UNKNOWN_ERROR",detail:err.message} }));
    });
  };

  // 先试 v7 专属域名
  tryFetch(v7Host, pathV7, (status, raw) => {
    let ok = status === 200 && raw.trim().startsWith("{");
    if (!ok) {
      console.warn(`v7-host geo failed (${status}), fallback to geoapi.qweather.com`);
      // 回退用官方 geoapi 域名
      return tryFetch(geoHost, pathGeo, (st2, raw2) => {
        if (st2 !== 200) {
          console.error("GeoAPI real host error:", st2, raw2);
          try {
            return res.status(st2).json(JSON.parse(raw2));
          } catch {
            return res.status(st2).json({ error:{status:st2,type:"UNKNOWN_ERROR",detail:"Non-JSON response"} });
          }
        }
        // 最终成功
        try {
          return res.status(200).json(JSON.parse(raw2));
        } catch (e) {
          console.error("GeoAPI fallback parse error:", raw2);
          return res.status(500).json({ error:{status:500,type:"INVALID_JSON",detail:e.message} });
        }
      });
    }
    // v7-host 成功
    try {
      return res.status(200).json(JSON.parse(raw));
    } catch (e) {
      console.error("v7-host parse error:", raw);
      return res.status(500).json({ error:{status:500,type:"INVALID_JSON",detail:e.message} });
    }
  });
}
