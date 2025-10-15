export function calculateOverPercentage(games, line, statType = 'receivingYards') {
    if (!games || games.length === 0) return 0;
  
    const hits = games.filter((game) => {
      const value = game.stats?.[statType] || 0;
      return value > line;
    });
  
    return (hits.length / games.length) * 100;
  }
  
  export function getStatValue(game, propType) {
    const statMap = {
      receiving_yards: game.stats?.receivingYards || 0,
      receptions: game.stats?.receptions || 0,
      rushing_yards: game.stats?.rushingYards || 0,
    };
  
    return statMap[propType] || 0;
  }