"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";

interface CalorieChartProps {
  data: { date: string; calories: number }[];
}

const chartConfig = {
  calories: { label: "Calorias", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

export const CalorieChart = ({ data }: CalorieChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consumo de Calorias</CardTitle>
        <CardDescription>Calorias consumidas nos últimos dias.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="calories" fill="var(--color-calories)" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};