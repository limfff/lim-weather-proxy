import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.DATABASE_ID;

export default async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: "缺少 date 参数" });

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: "日期",
      date: { equals: date }
    }
  });

  if (!response.results.length)
    return res.status(404).json({ error: "没有找到该日期的摘要" });

  const page = response.results[0];
  const content = page.properties["正文文本"].rich_text
    .map(rt => rt.plain_text)
    .join("");

  res.status(200).json({
    date,
    content,
    title: page.properties["标题"].title[0]?.plain_text ?? ""
  });
};
