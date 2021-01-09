import React, { useEffect, useState } from 'react';
import { checkWinner, getBestMove } from '../src/Logics';

let boardInitial = [['', '', ''],['', '', ''],['', '', '']];

const Board = () => {

  const [board, setBoard] = useState(JSON.parse(JSON.stringify(boardInitial)));
  const [winner, setWinner] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [aiSign, setAiSign] = useState('');
  const [humanSign, setHumanSign] = useState('');

  useEffect(() => {
    if (!winner && aiSign && currentPlayer == aiSign) {
      const move = getBestMove(board, aiSign, humanSign);
      board[move.row][move.col] = aiSign;
      setWinner(checkWinner(board));
      setCurrentPlayer(humanSign);
    }
  }, [currentPlayer, aiSign]);

  const selectCell = (row, col) => {
    console.log(`row: ${row}, col: ${col}`);
    const newBoard = [...board];
    newBoard[row][col] = humanSign;
    setBoard(newBoard);
    setWinner(checkWinner(board));
    setCurrentPlayer(aiSign);
  }

  const resetGame = () => {
    console.log('resetting game..');
    setBoard(JSON.parse(JSON.stringify(boardInitial)));
    setWinner(false);
    setHumanSign('');
    setAiSign('');
    setCurrentPlayer('X');
  }

  const selectSide = (sign) => {
    setHumanSign(sign);
    setAiSign(sign == 'X' ? 'O' : 'X');
  }
  

  return (
    <div className='p-3 md:p-10'>
      {!humanSign &&
          <div className='my-5 border-b-2 p-3'>
            <span>{`Please select side: `}</span>
            {['X', 'O'].map(sign => <span key={sign} className='mx-2 p-3 border cursor-pointer' onClick={() => selectSide(sign)}>{sign}</span>)}
          </div>
      }
      <div className='w-1/5'>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className='flex justify-between'>
            {
              row.map((cell, colIndex) => (
                <span
                  key={colIndex}
                  className='border border-yellow-400 p-3 w-10 h-10 cursor-pointer'
                  onClick={() => selectCell(rowIndex, colIndex)}>
                  {cell}
                </span>
              ))}
          </div>
        ))}
      </div>
      {winner && <div className='my-5'>{`Game over, winner: ${winner}`}</div>}
      <div onClick={resetGame} className='cursor-pointer my-5'>Reset Game</div>
    </div>
  )
}

export default Board;
