import { FibonacciPoint } from "@/types";

export const FIBONACCI_POINTS: FibonacciPoint[] = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 5, label: "5" },
  { value: 8, label: "8" },
  { value: 13, label: "13" },
  { value: 21, label: "21" },
  { value: 34, label: "34" },
  { value: 55, label: "55" },
];

export const PRIORITY_COLORS: Record<string, string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-warning bg-opacity-20 text-warning",
  critical: "bg-error bg-opacity-20 text-error",
};

export const ROLE_LABELS: Record<string, string> = {
  product_owner: "Product Owner",
  team_member: "Team Member",
};

export const STORY_STATUS: Record<string, string> = {
  backlog: "Backlog",
  "in-planning": "Planning",
  planned: "Planned",
  "in-progress": "In Progress",
  done: "Done",
};

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
};
