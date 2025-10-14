export function calculateWinPercentage(data, altLine) {
    const totalGames = data.length;
    const hits = data.filter(game => game.yards >= altLine).length;
    return ((hits / totalGames) * 100).toFixed(1);
  }