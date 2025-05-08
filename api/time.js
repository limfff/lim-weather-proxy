export default function handler(req, res) {
  // 1. 获取当前 UTC 时间
  const now = new Date();
  // 2. 转换到上海时区字符串
  const shanghai = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Shanghai" })
  );
  // 3. 格式化成 ISO 并替换尾部 Z 为 +08:00
  const datetime = shanghai.toISOString().replace("Z", "+08:00");

  res.status(200).json({
    datetime,
    timezone: "Asia/Shanghai",
    utc_offset: "+08:00"
  });
}
