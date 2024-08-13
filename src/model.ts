export type Player = {
    id: number;
    color: string;
    icon: string;
};

export type Board = {
    rows: number[][];
    cols: number[][];
    diags: number[][];
};

export type GameStatus = {
    isComplete: boolean;
    winner: number;
    board: Board;
    turn: number;
    moveNumber: number;
};


export type Move = {
    row: number;
    col: number
};

export type GameHistory = {
    score_1: number;
    score_2: number;
    tie: number;
}