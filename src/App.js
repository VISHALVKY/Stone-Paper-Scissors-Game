import React, { useState } from 'react';
import './App.css';

const Game = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [winner, setWinner] = useState('');
  const [roundResults, setRoundResults] = useState([]);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);

  const handlePlayerNameChange = (e, player) => {
    const name = e.target.value;
    if (player === 1) {
      setPlayer1Name(name);
    } else {
      setPlayer2Name(name);
    }
  };

  const handlePlayerChoice = (player, choice) => {
    if (player === 1) {
      setPlayer1Choice(choice);
    } else {
      setPlayer2Choice(choice);
    }
  };

  const determineWinner = () => {
    if (player1Name === '' || player2Name === '') {
      alert('Please enter player details');
      return;
    }

    let roundWinner;
    if (player1Choice === player2Choice) {
      roundWinner = 'Tie';
    } else if (
      (player1Choice === 'stone' && player2Choice === 'scissors') ||
      (player1Choice === 'scissors' && player2Choice === 'paper') ||
      (player1Choice === 'paper' && player2Choice === 'stone')
    ) {
      roundWinner = player1Name;
      setScore(prevScore => ({ ...prevScore, player1: prevScore.player1 + 1 }));
    } else {
      roundWinner = player2Name;
      setScore(prevScore => ({ ...prevScore, player2: prevScore.player2 + 1 }));
    }

    setWinner(roundWinner);
    setRoundResults(prevResults => [...prevResults, { round: currentRound, player1Name, player1Choice, player2Name, player2Choice, roundWinner }]);
    if (roundResults.length === 5) {
      setGameOver(true);
    }
  };

  const handleRoundEnd = () => {
    if (player1Name === '' || player2Name === '') {
      alert('Please enter player details');
      return;
    }

    const totalRounds = roundResults.length + 1;
    if (totalRounds >= 6) {
      setGameOver(true);
      if (score.player1 >= 3) {
        setWinner(player1Name);
      } else if (score.player2 >= 3) {
        setWinner(player2Name);
      }
    } else {
      setCurrentRound(currentRound + 1);
      setPlayer1Choice('');
      setPlayer2Choice('');
      setWinner('');
    }
  };

  const handleNewGame = () => {
    setPlayer1Name('');
    setPlayer2Name('');
    setPlayer1Choice('');
    setPlayer2Choice('');
    setWinner('');
    setRoundResults([]);
    setScore({ player1: 0, player2: 0 });
    setGameOver(false);
    setCurrentRound(1);
  };

  return (
    <div className="container">
      <h2>Stone Paper Scissors</h2>
      {!gameOver && (
        <>
          <label>Player 1 Name:</label>
          <input type="text" value={player1Name} onChange={(e) => handlePlayerNameChange(e, 1)} /><br />
          <label>Player 2 Name:</label>
          <input type="text" value={player2Name} onChange={(e) => handlePlayerNameChange(e, 2)} /><br />
          <h3>Round {currentRound}</h3>
          <label>{player1Name}:</label>
          <select value={player1Choice} onChange={(e) => handlePlayerChoice(1, e.target.value)}>
            <option value="">Choose...</option>
            <option value="stone">Stone</option>
            <option value="paper">Paper</option>
            <option value="scissors">Scissors</option>
          </select><br />
          <label>{player2Name}:</label>
          <select value={player2Choice} onChange={(e) => handlePlayerChoice(2, e.target.value)}>
            <option value="">Choose...</option>
            <option value="stone">Stone</option>
            <option value="paper">Paper</option>
            <option value="scissors">Scissors</option>
          </select><br />
          <button onClick={determineWinner}>Play</button>
        </>
      )}
      {winner && (
        <div>
          <h4>Winner: {winner === 'Tie' ? 'Tie' : winner + ' wins'}</h4>
          {gameOver ? (
            <div>
              <p>Game Over</p>
              <button onClick={handleNewGame}>New Game</button>
            </div>
          ) : <button onClick={handleRoundEnd}>Next Round</button>}
        </div>
      )}
      <h3>Score</h3>
      <p>{player1Name}: {score.player1}</p>
      <p>{player2Name}: {score.player2}</p>
      <h3>Round Results</h3>
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>{player1Name}</th>
            <th>{player2Name}</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {roundResults.map((result, index) => (
            <tr key={index}>
              <td>{result.round}</td>
              <td>{result.player1Choice}</td>
              <td>{result.player2Choice}</td>
              <td>{result.roundWinner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Game;
