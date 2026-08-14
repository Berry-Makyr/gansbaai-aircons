import { BarChartIcon } from "@sanity/icons/BarChart";
import type { Tool } from "sanity";
import { AnalyticsTool } from "./AnalyticsTool";

export const analyticsTool = (): Tool => ({
  title: "Analytics",
  name: "analytics",
  icon: BarChartIcon,
  component: AnalyticsTool,
});
