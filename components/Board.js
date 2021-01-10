import React, { useEffect, useState } from 'react';
import { checkWinner, getBestMove } from '../src/Logics';

let boardInitial = [['', '', ''], ['', '', ''], ['', '', '']];

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
    if (!!winner || board[row][col] !== '') return;
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
    // setHumanSign('');
    // setAiSign('');
    setCurrentPlayer('X');
  }

  const selectSide = (sign) => {
    setHumanSign(sign);
    setAiSign(sign == 'X' ? 'O' : 'X');
  }


  return (
    <div className='p-3 md:p-10'>
      <div className='my-5 border-b-2 p-3'>
        <span>{`Please select side: `}</span>
        {['X', 'O'].map(sign => <span key={sign} 
          className={`mx-2 p-3 border cursor-pointer ${humanSign==sign ? 'bg-yellow-300' : ''} `} 
          onClick={() => selectSide(sign)}>
          {sign}
          </span>)}
      </div>
      <div className=''>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className='flex justify-center'>
            {
              row.map((cell, colIndex) => (
                <span
                  key={colIndex}
                  className='border bg-yellow-500 hover:bg-yellow-400 rounded-lg text-white m-2 py-5 text-center text-3xl font-semibold w-20 h-20 cursor-pointer'
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
