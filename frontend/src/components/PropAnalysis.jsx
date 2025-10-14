import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import AltLineSlider from "./AltLineSlider";

const PropAnalysis = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [altLine, setAltLine] = useState(81.0);

  const chartData = data.games.map((game, i) => ({
    name: game.opponent,
    value: game.yards,
    id: i + 1,
  }));

  const overHits = chartData.filter((g) => g.value > altLine).length;
  const totalGames = chartData.length;

  const yearOptions = ["L5", "L10", "L15", "H2H", "2025", "2024"];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Prop Analysis
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            The Over hit{" "}
            <span className="font-semibold text-green-600">
              {overHits}/{totalGames}
            </span>{" "}
            this season at a line of {altLine}
          </p>
        </div>

        {/* Year selector */}
        <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
          {yearOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedYear(opt)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                selectedYear === opt
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-72 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 12 }} />
            <YAxis tick={{ fill: "#555", fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <ReferenceLine 
              y={altLine} 
              stroke="#000" 
              strokeWidth={2}
              strokeDasharray="3 3"
            />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              isAnimationActive={true}
            >
              {chartData.map((entry, index) => {
                const isOver = entry.value > altLine;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isOver ? "#22c55e" : "#ef4444"}
                    opacity={isOver ? 1 : 0.6}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats + Slider */}
      <div className="flex flex-wrap justify-between items-center border-t pt-4 gap-4">
        <div className="text-sm text-gray-700">
          <p className="mb-1">
            <span className="font-semibold">Consensus Line:</span>{" "}
            {data.consensusLine}
          </p>
          <p>
            <span className="font-semibold">Over Win %:</span>{" "}
            {overHits}/{totalGames} (
            {((overHits / totalGames) * 100).toFixed(1)}%)
          </p>
        </div>

        <AltLineSlider altLine={altLine} setAltLine={setAltLine} />
      </div>
    </div>
  );
};

export default PropAnalysis;