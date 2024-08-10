import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import colors from "tailwindcss/colors";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const RevenueChart: React.FC = () => {
  const data = [
    { date: "10/12", revenue: 1000 },
    { date: "11/12", revenue: 1000 },
    { date: "12/12", revenue: 1000 },
    { date: "13/12", revenue: 1000 },
    { date: "14/12", revenue: 1000 },
    { date: "15/12", revenue: 1000 },
    { date: "16/12", revenue: 1000 },
  ];
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle>Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={248}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey={"date"} axisLine={false} tickLine={false} dy={6} />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={89}
              tickFormatter={(value: number) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey={"revenue"}
              stroke={colors.violet["500"]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};