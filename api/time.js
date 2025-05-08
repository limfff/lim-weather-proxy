export default function handler(req, res) {
  const now = new Date();
  // 转成 UTC 毫秒数
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  // 加上东八区偏移（8 小时）
  const bjMs = utcMs + 8 * 3600000;
  const bj = new Date(bjMs);

  // ISO 8601 +08:00
  const datetime = bj.toISOString().replace('Z', '+08:00');
  // 只要 HH:mm:ss 部分
  const time = datetime.split('T')[1].split('.')[0];

  res.status(200).json({
    datetime,
    time,
    timezone: "Asia/Shanghai",
    utc_offset: "+08:00"
  });
}

