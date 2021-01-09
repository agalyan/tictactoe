
let scores = {
    X: 10,
    O: -10,
    tie: 0
};
const equals3 = (a, b, c) => a == b && b == c && a != '';

export function checkWinner(board) {
    let winner = null;
    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }
    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }
    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                openSpots++;
            }
        }
    }
    if (winner == null && openSpots == 0) {
        return 'tie';
    } else {
        return winner;
    }
}

export function getBestMove(board, ai, human) {
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (board[i][j] == '') {
                board[i][j] = ai;
                let score = minimax(board, 0, false, ai, human);
                console.log(`getBestMove: score for [${i}][${j}]: ${score}`);

                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { row: i, col: j };
                }
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing, ai, human) {
    let result = checkWinner(board);
    if (result !== null) {
        // console.log('minimax: return: ', scores[result]);
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false, ai, human);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        // console.log('minimax: isMaximizing: bestScore: ', bestScore);
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == '') {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true, ai, human);
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        // console.log('minimax: !isMaximizing: bestScore: ', bestScore);
        return bestScore;
    }
}