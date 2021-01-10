export function getBestMove(board, player) {
    // AI to make its turn
    let bestScore = -Infinity;
    let bestMove;
    const availableMoves = getEmptyCells(board);
    for (let move of availableMoves) {
        board[move[0]][move[1]] = player;
        let score = minimax(board, getOpponent(player), false);
        console.log(`getBestMove: score for [${move[0]}][${move[1]}]: ${score}`);
        board[move[0]][move[1]] = "";
        if (score > bestScore) {
            bestScore = score;
            bestMove = { row: move[0], col: move[1] };
        }
    }
    return bestMove;
}
function minimax(board, player, isMax) {
    let result = checkWinner(board);
    if (result !== null) {
        return getScore(result, isMax ? player : getOpponent(player));
    }
    const availableMoves = getEmptyCells(board);
    let bestScore;
    bestScore = isMax ? -Infinity : Infinity;
    for (let move of availableMoves) {
        board[move[0]][move[1]] = player;
        let score = minimax(board, getOpponent(player), !isMax);
        board[move[0]][move[1]] = "";
        bestScore = isMax ? Math.max(score, bestScore) : Math.min(score, bestScore);
    }
    return bestScore;
}

const getScore = (winner, player) => {
    if (winner === player) {
        return 10;
    } else if (winner === getOpponent(player)) {
        return -10;
    }
    return 0;
};

const equals3 = (a, b, c) => a == b && b == c && a != '';

const getOpponent = player => player == 'X' ? 'O' : 'X';

export function checkWinner(board) {
    let winner = null;
    // horizontal
    for (let rowIndex in board) {
        if (equals3(board[rowIndex][0], board[rowIndex][1], board[rowIndex][2])) {
            winner = board[rowIndex][0];
        }
    }
    // Vertical
    for (let colIndex in board[0]) {
        if (equals3(board[0][colIndex], board[1][colIndex], board[2][colIndex])) {
            winner = board[0][colIndex];
        }
    }
    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }
    let emptyCells = getEmptyCells(board);
    if (winner == null && emptyCells.length == 0) {
        return 'tie';
    } else {
        return winner;
    }
}

const getEmptyCells = (board) => {
    const moves = [];
    for (let r in board) {
        for (let c in board[r]) {
            if (board[r][c] == '') {
                moves.push([parseInt(r), parseInt(c)]);
            }
        }
    }
    return moves;
}