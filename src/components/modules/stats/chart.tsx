"use client";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [{ donated: 2, requested: 1 }];

const chartConfig = {
  donated: {
    label: "Donated",
    color: "var(--chart-1)",
  },
  requested: {
    label: "Requested",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartComponent() {
  return (
    <div className="my-6">
      <div className="flex justify-center items-center gap-x-12">
        <div className="flex flex-col max-sm:hidden justify-center items-end flex-1">
          <div className="flex flex-col justify-center items-center gap-y-2">
            <p className="text-lg text-neutral-500">2 Units</p>
            <div className="flex justify-center items-center gap-x-2">
              <p className="text-sm font-light text-neutral-400">Donated</p>
              <div className="h-3 w-3 rounded bg-[var(--chart-1)]" />
            </div>
          </div>
        </div>
        <ChartContainer
          config={chartConfig}
          className="aspect-square h-[200px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />

            {/* Radial bars for each data key */}
            <RadialBar
              dataKey="donated"
              stackId="a"
              cornerRadius={10}
              fill="var(--chart-1)"
            />
            <RadialBar
              dataKey="requested"
              stackId="a"
              cornerRadius={10}
              fill="var(--chart-2)"
            />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-4xl font-normal fill-neutral-600"
                        >
                          2
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-neutral-500 font-light"
                        >
                          Lives Affected
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        <div className="flex flex-col max-sm:hidden justify-center items-start flex-1">
          <div className="flex flex-col justify-center items-center gap-y-2">
            <p className="text-lg text-neutral-500">1 Unit</p>
            <div className="flex justify-center items-center gap-x-2">
              <div className="h-3 w-3 rounded bg-[var(--chart-2)]" />
              <p className="text-sm font-light text-neutral-400">Requested</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden my-6 flex justify-center items-center gap-x-16">
        <div className="flex flex-col justify-center items-end flex-1">
          <div className="flex flex-col justify-center items-center gap-y-2">
            <p className="text-lg text-neutral-500">2 Units</p>
            <div className="flex justify-center items-center gap-x-2">
              <p className="text-sm font-light text-neutral-400">Donated</p>
              <div className="h-3 w-3 rounded bg-[var(--chart-1)]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start flex-1">
          <div className="flex flex-col justify-center items-center gap-y-2">
            <p className="text-lg text-neutral-500">1 Unit</p>
            <div className="flex justify-center items-center gap-x-2">
              <div className="h-3 w-3 rounded bg-[var(--chart-2)]" />
              <p className="text-sm font-light text-neutral-400">Requested</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
