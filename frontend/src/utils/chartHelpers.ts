import type { Blog } from "../types";

export interface LineChartPoint {
  date: string;
  count: number;
}

export interface CategoryChartPoint {
  name: string;
  count: number;
}

export interface EngagementPoint {
  name: string;
  value: number;
}

export function processDataForLineChart(
  data: { [key: string]: unknown }[],
  key = "createdAt",
  limit = 30
): LineChartPoint[] {
  if (!Array.isArray(data) || data.length === 0) return generateDummyData(limit);
  const groupedByDate: Record<string, number> = {};
  for (const item of data) {
    const date = new Date((item[key] as string) || "").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    groupedByDate[date] = (groupedByDate[date] || 0) + 1;
  }
  return Object.entries(groupedByDate)
    .slice(-limit)
    .map(([date, count]) => ({ date, count }));
}

export function processCategoryData(blogs: Blog[]): CategoryChartPoint[] {
  if (!Array.isArray(blogs) || blogs.length === 0) return [];
  const categoryCount: Record<string, number> = {};
  for (const blog of blogs) {
    const category =
      typeof blog.cetagory === "object" && blog.cetagory && "name" in blog.cetagory
        ? (blog.cetagory as { name: string }).name
        : (blog.cetagory as string) || "Uncategorized";
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  }
  return Object.entries(categoryCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export function processEngagementData(blogs: Blog[]): EngagementPoint[] {
  if (!Array.isArray(blogs) || blogs.length === 0)
    return [
      { name: "Likes", value: 0 },
      { name: "Comments", value: 0 },
    ];
  const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0);
  const totalComments = blogs.reduce((sum, blog) => sum + (blog.comments?.length || 0), 0);
  return [
    { name: "Likes", value: totalLikes },
    { name: "Comments", value: totalComments },
  ];
}

export function processUserGrowthData(
  users: { createdAt?: string }[],
  limit = 30
): LineChartPoint[] {
  if (!Array.isArray(users) || users.length === 0) return generateDummyData(limit);
  const groupedByDate: Record<string, number> = {};
  for (const user of users) {
    const date = new Date(user.createdAt || "").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    groupedByDate[date] = (groupedByDate[date] || 0) + 1;
  }
  let cumulative = 0;
  return Object.entries(groupedByDate)
    .slice(-limit)
    .map(([date, count]) => {
      cumulative += count;
      return { date, count: cumulative };
    });
}

export function calculateTrend(
  current: number,
  previous: number
): { trend: "up" | "down"; value: string } {
  if (!previous || previous === 0) return { trend: "up", value: "100%" };
  const change = ((current - previous) / previous) * 100;
  return {
    trend: change >= 0 ? "up" : "down",
    value: `${Math.abs(change).toFixed(1)}%`,
  };
}

export function getTopPerformingBlogs(
  blogs: Blog[],
  metric: "likes" | "comments" = "likes",
  limit = 5
): Blog[] {
  if (!Array.isArray(blogs) || blogs.length === 0) return [];
  return [...blogs]
    .sort((a, b) => {
      const aVal = (a[metric] as unknown[] | undefined)?.length || 0;
      const bVal = (b[metric] as unknown[] | undefined)?.length || 0;
      return bVal - aVal;
    })
    .slice(0, limit);
}

function generateDummyData(days = 30): LineChartPoint[] {
  const data: LineChartPoint[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      count: Math.floor(Math.random() * 10) + 1,
    });
  }
  return data;
}

export const chartColors = {
  primary: "#0f172a",
  accent: "#0d9488",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  muted: "#64748b",
};

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: "bottom" as const },
    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#ffffff",
      bodyColor: "#ffffff",
      padding: 12,
      borderRadius: 8,
    },
  },
};
