import React, { useState } from "react";

const PlayerHeader = ({ player }) => {
  const [selectedStat, setSelectedStat] = useState("Rec Yds");

  const statOptions = [
    { label: "Rec Yds" },
    { label: "Recs" },
    { label: "Anytime TD" },
    { label: "Rsh + Rec" },
    { label: "Rush Yds" },
  ];

  return (
    <div className="flex flex-col w-full bg-white rounded-2xl shadow-sm p-6 mb-6">
      {/* Top section: team logos + player info */}
      <div className="flex items-center justify-between">
        {/* Left team logo */}
        <img
          src={player.teamLogoLeft}
          alt={`${player.teamLeft} logo`}
          className="w-20 h-20 object-contain"
        />

        {/* Player info */}
        <div className="text-center flex-1">
          <h2 className="text-sm uppercase text-gray-500 tracking-wide font-semibold">
            Prop Bet Analyzer
          </h2>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            {player.name}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {player.position} • {player.matchup}
          </p>
          <span className="text-green-600 font-semibold text-xs bg-green-100 px-2 py-0.5 rounded-full mt-1 inline-block">
            Active
          </span>
        </div>

        {/* Right team logo */}
        <img
          src={player.teamLogoRight}
          alt={`${player.teamRight} logo`}
          className="w-20 h-20 object-contain"
        />
      </div>

      {/* Stat buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {statOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => setSelectedStat(option.label)}
            className={`px-5 py-2.5 text-sm rounded-full font-medium transition-all ${
              selectedStat === option.label
                ? "bg-blue-50 border border-blue-500 text-blue-600 shadow-sm"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlayerHeader;
