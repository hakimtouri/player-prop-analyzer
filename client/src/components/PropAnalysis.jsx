import React, { useState, useEffect, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";
import AltLineSlider from "./AltLineSlider";
import { api } from "../utils/api";

const PropAnalysis = ({ playerId }) => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [altLine, setAltLine] = useState(81.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gamesData, setGamesData] = useState(null);

  const yearOptions = ["L5", "L10", "L15", "H2H", "2025", "2024"];

  // Fetch games data only when playerId or selectedYear changes
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const filter = selectedYear.startsWith('L') ? selectedYear : null;
        // Fetch with a default line, we'll recalculate locally
        const data = await api.getPropAnalysis(playerId, 81, filter);
        
        setGamesData(data.games);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchGames();
    }
  }, [playerId, selectedYear]); // Only refetch when these change, NOT altLine

  // Calculate stats locally based on altLine (no API call)
  const calculateStats = useCallback(() => {
    if (!gamesData) return { overHits: 0, totalGames: 0, overPercentage: "0" };

    const overHits = gamesData.filter((g) => g.yards > altLine).length;
    const totalGames = gamesData.length;
    const overPercentage = totalGames > 0 ? ((overHits / totalGames) * 100).toFixed(1) : "0";

    return { overHits, totalGames, overPercentage };
  }, [gamesData, altLine]);

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading analysis...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!gamesData) return null;

  const chartData = gamesData.map((game, i) => ({
    name: game.opponent,
    value: game.yards,
    id: i + 1,
  }));

  const { overHits, totalGames, overPercentage } = stats;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
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
            at a line of {altLine}
          </p>
        </div>

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
              isAnimationActive={false}
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

      <div className="flex flex-wrap justify-between items-center border-t pt-4 gap-4">
        <div className="text-sm text-gray-700">
          <p className="mb-1">
            <span className="font-semibold">Alt Line:</span> {altLine}
          </p>
          <p>
            <span className="font-semibold">Over Win %:</span>{" "}
            {overHits}/{totalGames} ({overPercentage}%)
          </p>
        </div>

        <AltLineSlider altLine={altLine} setAltLine={setAltLine} />
      </div>
    </div>
  );
};

export default PropAnalysis;