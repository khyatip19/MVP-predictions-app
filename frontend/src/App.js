import React, { useState, useEffect } from 'react';
import Podium from './Podium';
import './App.css'; // Make sure you have a corresponding CSS file for styles

function App() {
  const [top3MVP, setTop3MVP] = useState([]);
  const [top10MVP, setTop10MVP] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Store the clicked player

  // Fetching MVP data
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/mvp')
      .then((response) => response.json())
      .then((data) => {
        setTop3MVP(data.top_3_mvp); // Set MVP data for the top 3 players
        setTop10MVP(data.top_10_mvp); // Set MVP data for the next 7 players
      })
      .catch((error) => console.log('Error fetching MVP data:', error));
  }, []);

  // Handle player image click to display their image and stats
  const handlePlayerClick = (playerId) => {
    // Find the player from the MVP data by playerId
    const selected = [...top3MVP, ...top10MVP].find(player => player.player_id === playerId);
    setSelectedPlayer(selected); // Update the selected player state
  };

  return (
    <div className="App">
      <h1>NBA MVP Predictions</h1>

      <h2>Top 3 MVP Candidates</h2>
      <Podium winners={top3MVP} onPlayerClick={handlePlayerClick} selectedPlayer={selectedPlayer} />

      <h2>Next 7 MVP Candidates</h2>
      <div className="top10-container">
        {top10MVP.map((player) => (
          <div
            key={player.player_id}
            className="player-card"
            onClick={() => handlePlayerClick(player.player_id)} // Handle player name click
          >
            <h3>{player.player_name}</h3>
            {/* Display stats below player name when clicked */}
            {selectedPlayer && selectedPlayer.player_id === player.player_id && (
              <div className="player-stats">
                <img
                  src={player.image_url}
                  alt={player.player_name}
                  className="player-image"
                />
                <p>Points: {player.points}</p>
                <p>Assists: {player.assists}</p>
                <p>Steals: {player.steals}</p>
                <p>Blocks: {player.blocks}</p>
                <p>Rebounds: {player.rebounds}</p>
                <p>Minutes Played: {player.minutes_played}</p>
                <p>Win/Loss Percentage: {player.win_loss_percentage}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* If a player from the podium is selected, show their stats right below the image */}
      {selectedPlayer && top3MVP.some(player => player.player_id === selectedPlayer.player_id) && (
        <div className="player-stats">
          {/* <img
            src={selectedPlayer.image_url}
            alt={selectedPlayer.player_name}
            className="player-image"
          /> */}
          {/* <p>Points: {selectedPlayer.points}</p>
          <p>Assists: {selectedPlayer.assists}</p>
          <p>Steals: {selectedPlayer.steals}</p>
          <p>Blocks: {selectedPlayer.blocks}</p>
          <p>Rebounds: {selectedPlayer.rebounds}</p>
          <p>Minutes Played: {selectedPlayer.minutes_played}</p>
          <p>Win/Loss Percentage: {selectedPlayer.win_loss_percentage}</p> */}
        </div>
      )}
    </div>
  );
}

export default App;
