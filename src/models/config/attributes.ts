import { z } from "zod";

export const attributesSchema = z.object({
  title: z.string().default("BoardKit"),

  // defaults added
  style: z.object({
    textColor: z.string().default("#000000"), // black text
    textSize: z.string().default("8px"), // 8px text size
    backgroundColor: z.string().default("#ffffff"), // white background
  }).default({
    textColor: "#000000",
    textSize: "8px",
    backgroundColor: "#ffffff",
  }),

  // defaults added
  chart: z.object({
    type: z.string().default("bar"), // bar chart
    xAxis: z.object({
      field: z.string().default("x-series"),
    }),
    yAxis: z.object({
      field: z.string().default("y-series"),
    }),
  }).default({
    type: "bar",
    xAxis: {
      field: "x-series",
    },
    yAxis: {
      field: "y-series",
    },
  }),
});

export type Attributes = z.infer<typeof attributesSchema>;