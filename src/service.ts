import { Board, GameHistory, GameStatus, Move, Player} from "./model.js";

export default class Service {

    private player1: Player;
    private player2: Player;
    private gameStatus: GameStatus;
    private history: GameHistory;

    constructor() {
        this.player1 = {
            id: 1,
            color: "turquoise",
            icon: "fa-solid fa-x",
        };

        this.player2 = {
            id: 2,
            color: "yellow",
            icon: "fa-solid fa-o",
        };

        var table: Board = {
            rows: [[0,0], [0,0], [0,0]],
            cols: [[0,0], [0,0], [0, 0]],
            diags: [[0,0], [0,0]]
        };

        this.gameStatus = {
            isComplete: false,
            winner: -1,
            board: table,
            turn: 1,
            moveNumber: 0
        };

        this.history = {
            score_1: 0,
            score_2: 0,
            tie: 0,
        };

    }




    reset() {

        var table: Board = {
            rows: [[0,0], [0,0], [0,0]],
            cols: [[0,0], [0,0], [0, 0]],
            diags: [[0,0], [0,0]]
        };

        this.gameStatus = {
            isComplete: false,
            winner: -1,
            board: table,
            turn: 1,
            moveNumber: 0
        };

        this.history = {
            score_1: 0,
            score_2: 0,
            tie: 0,
        };

    }




    playAgain() {
        
        var table: Board = {
            rows: [[0,0], [0,0], [0,0]],
            cols: [[0,0], [0,0], [0, 0]],
            diags: [[0,0], [0,0]]
        };

        this.gameStatus = {
            isComplete: false,
            winner: -1,
            board: table,
            turn: 1,
            moveNumber: 0
        }

    }


    updateScore() {
        if (this.gameStatus.isComplete && this.gameStatus.winner === 1)
            this.history.score_1 += 1;

        else if (this.gameStatus.isComplete && this.gameStatus.winner === 2)
            this.history.score_2 += 1;

        else if (this.gameStatus.isComplete && this.gameStatus.winner === 0)
            this.history.tie += 1;
    }



    makeMove(move: Move): [number, number] {
        let playerIndex = this.gameStatus.turn - 1;
        
        this.gameStatus.board.rows[move.row][playerIndex] += 1;
        this.gameStatus.board.cols[move.col][playerIndex] += 1;

        if (move.row === 0 && move.col == 0) 
            this.gameStatus.board.diags[0][playerIndex] += 1;
        
        else if (move.row === 0 && move.col === 2)
            this.gameStatus.board.diags[1][playerIndex] += 1;

        else if (move.row === 2 && move.col === 0)
            this.gameStatus.board.diags[1][playerIndex] += 1;

        else if (move.row === 2 && move.col === 2)
            this.gameStatus.board.diags[0][playerIndex] += 1;

        else if (move.row === 1 && move.col === 1) {
            this.gameStatus.board.diags[0][playerIndex] += 1;
            this.gameStatus.board.diags[1][playerIndex] += 1;
        }

        this.gameStatus.moveNumber += 1;
        var turn = this.gameStatus.turn;

        if (this.isCompleteByWin(move)) {
            this.gameStatus.isComplete = true;
            this.gameStatus.winner = this.gameStatus.turn === 1 ? 1 : 2;
            this.updateScore();
        }

        else if (this.gameStatus.moveNumber === 9) {
            this.gameStatus.isComplete = true;
            this.gameStatus.winner = 0;      // it's a draw
            this.updateScore();
        }   

        else    
            this.gameStatus.turn = this.gameStatus.turn === 1 ? 2 : 1;

        return [turn, this.gameStatus.winner]
           
    }


    isCompleteByWin(move: Move): boolean {
        let playerIndex = this.gameStatus.turn - 1;

        if (this.gameStatus.board.rows[move.row][playerIndex] === 3)
            return true;

        if (this.gameStatus.board.cols[move.col][playerIndex] === 3)
            return true;

        
        if (this.gameStatus.board.diags[0][playerIndex] === 3)
            return true;

        if (this.gameStatus.board.diags[1][playerIndex] === 3)
            return true;

        return false;
    }
}