const API_BASE_URL = 'http://localhost:5001/api';

export const api = {
  async getPlayer(playerId) {
    const response = await fetch(`${API_BASE_URL}/players/${playerId}`);
    if (!response.ok) throw new Error('Failed to fetch player');
    return response.json();
  },

  async getPlayerStats(playerId) {
    const response = await fetch(`${API_BASE_URL}/players/${playerId}/stats`);
    if (!response.ok) throw new Error('Failed to fetch player stats');
    return response.json();
  },

  async getPropAnalysis(playerId, line, filter = null) {
    const params = new URLSearchParams({ line: line.toString() });
    if (filter) params.append('filter', filter);
    
    const response = await fetch(
      `${API_BASE_URL}/props/${playerId}/analysis?${params}`
    );
    if (!response.ok) throw new Error('Failed to fetch prop analysis');
    return response.json();
  }
};