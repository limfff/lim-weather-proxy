# Lim酱专属天气 & 时间中转服务

这是你专属的中转服务器，包含以下功能：

- `/api/time` → 获取北京时间
- `/api/weather-now` → 实况天气
- `/api/minutely-rain` → 分钟降水趋势
- `/api/warning` → 天气预警
- `/api/indices` → 穿衣/紫外线建议（默认 type=3,8）

## 使用方式
将 `.env.example` 改名为 `.env`，填入你的和风天气 API key。

## 默认查询城市
前端请求需带上 `?location=101281601`（东莞）或使用经纬度转为 ID。

部署到 Vercel 后，即可用于 GPT 调用。