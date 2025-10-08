"use client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";

interface MacroChartProps {
  data: {
    prot: number;
    carb: number;
    fat: number;
  };
}

const chartConfig = {
  prot: { label: "Proteínas", color: "hsl(var(--chart-1))" },
  carb: { label: "Carboidratos", color: "hsl(var(--chart-2))" },
  fat: { label: "Gorduras", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export const MacroChart = ({ data }: MacroChartProps) => {
  const chartData = [
    { name: "prot", value: data.prot, fill: "var(--color-prot)" },
    { name: "carb", value: data.carb, fill: "var(--color-carb)" },
    { name: "fat", value: data.fat, fill: "var(--color-fat)" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Macros</CardTitle>
        <CardDescription>Média diária (em gramas)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
          <ResponsiveContainer>
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};