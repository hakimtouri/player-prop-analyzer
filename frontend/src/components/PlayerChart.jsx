import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export default function PlayerChart({ data, altLine }) {
  return (
    <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Bijan Robinson — Rush + Rec Yards
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="game" tick={{ fill: "#ddd" }} />
          <YAxis tick={{ fill: "#ddd" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#111", border: "none", color: "#fff" }}
          />
          <Bar dataKey="yards" fill="#60A5FA" radius={[6, 6, 0, 0]} />
          <ReferenceLine y={altLine} stroke="#F87171" strokeDasharray="3 3" label={`Alt: ${altLine}`} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
