import React from 'react';
import PodiumStep from './PodiumStep';

export default function Podium({ winners, onPlayerClick, selectedPlayer }) {
  // Defensive check if winners data is empty or undefined
  if (!winners || winners.length < 3) {
    console.error('Insufficient winners data');
    return <div>Loading MVP data</div>; // Fallback UI
  }

  const podium = winners.slice(0, 3); // Take top 3 winners from the array

  return (
    <div
      style={{
        display: 'flex',  // Use flexbox to align the players in a row
        justifyContent: 'center',  // Center the players horizontally
        alignItems: 'flex-end',  // Align players to the bottom of the container
        gap: '1rem',  // Add some spacing between players
        marginTop: '2rem',
        height: 300,  // Make sure the height is large enough
      }}
    >
      {/* Render the top 3 winners */}
      {podium.map((winner, index) => (
        <div
          key={winner.player_id}
          onClick={() => onPlayerClick(winner.player_id)} // Handle player image click
        >
          <PodiumStep
            podium={podium}
            winner={winner}
            winnerIndex={index}
          />
          {/* Show stats for the clicked player */}
          {selectedPlayer && winner.player_id === selectedPlayer.player_id && (
            <div className="player-stats">
              <img
                src={winner.image_url}
                alt={winner.player_name}
                className="player-image"
              />
              <p>Points: {winner.points}</p>
              <p>Assists: {winner.assists}</p>
              <p>Steals: {winner.steals}</p>
              <p>Blocks: {winner.blocks}</p>
              <p>Rebounds: {winner.rebounds}</p>
              <p>Minutes Played: {winner.minutes_played}</p>
              <p>Win/Loss Percentage: {winner.win_loss_percentage}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
