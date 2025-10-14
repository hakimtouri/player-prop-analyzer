import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
  } from "recharts";
  import data from "./bijan_robinson.json";
  
  export default function PlayerChart({ lineValue }) {
    return (
      <div className="w-full max-w-3xl h-80 bg-gray-800 rounded-2xl shadow-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="game" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="yards" stroke="#82ca9d" strokeWidth={2} />
            {/* Dynamic reference line for slider */}
            <ReferenceLine
              y={lineValue}
              stroke="#ff4b4b"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{
                value: `Line: ${lineValue}`,
                position: "right",
                fill: "#ff4b4b",
                fontSize: 12,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  