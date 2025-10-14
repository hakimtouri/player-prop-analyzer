import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import AltLineSlider from "./AltLineSlider";

const PropAnalysis = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [altLine, setAltLine] = useState(93.5);

  // Mock data (replace with your own JSON later)
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
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Prop Analysis <span className="text-gray-400 text-sm">ℹ️</span>
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
      <div className="w-full h-72 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={altLine} stroke="#000" strokeWidth={1.5} />
            <Bar
              dataKey="value"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats + Slider */}
      <div className="flex flex-wrap justify-between items-center border-t pt-4 text-sm text-gray-700">
        <div>
          <p>
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
