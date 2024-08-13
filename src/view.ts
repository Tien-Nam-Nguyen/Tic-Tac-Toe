import { Move } from "./model.js";


export default class View {
    private actionsBtn: HTMLElement;
    private squares: NodeList;
    private player1ScoreEle: HTMLElement;
    private player2ScoreEle: HTMLElement;
    private tieEle: HTMLElement;
    private turnEle: HTMLElement;
    private modal: HTMLElement;
    private resetBtn: HTMLElement;
    private newRoundBtn: HTMLElement;
    private playAgainBtn: HTMLElement;
    private dropDownContent: HTMLElement;


    constructor() {
        this.actionsBtn = this.querySeclector(".actions-btn");
        this.squares = document.querySelectorAll(".square");
        this.player1ScoreEle = this.querySeclector('[data-id="player1"]');
        this.player2ScoreEle = this.querySeclector('[data-id="player2"]');
        this.tieEle = this.querySeclector('[data-id="tie"]');
        this.turnEle = this.querySeclector(".turn");
        this.dropDownContent = this.querySeclector(".dropdown-content")

        this.modal = this.querySeclector(".modal");
        this.resetBtn = this.querySeclector('[data-id="reset-btn"]');
        this.newRoundBtn = this.querySeclector('[data-id="new-btn"]');
        this.playAgainBtn = this.querySeclector('[data-id="again-btn"]');

        this.actionsBtn.addEventListener("click", (event) => {
            this.toggleHidden(this.dropDownContent);
        });

    }

    
    switchTurn(previousTurn: number) {
        const firstChild: Element = document.createElement("i");
        const secondChild: Element = document.createElement("p");
        
        if (previousTurn === 1) {
            firstChild.classList.add("fa-solid", "fa-o", "yellow");
            secondChild.textContent = "Player 2, you're up!"; 
            secondChild.classList.add("turquoise");
        }

        else {
            firstChild.classList.add("fa-solid", "fa-x", "turquoise");
            secondChild.textContent = "Player 1, you're up!";
            secondChild.classList.add("yellow");
        }

        this.turnEle.replaceChildren(firstChild, secondChild);
    }



    bindMakeMove(handler: Function) {
        this.squares.forEach((square) => {
            square.addEventListener("click", (event) => {

                if (!square.hasChildNodes()) {
                    let ele: Element = square as Element;


                    let move: Move = {
                        row: Math.floor(+ele.id / 3),
                        col: +ele.id % 3
                    };

                    let tuple: [number, number] = handler(move);
                    const x = document.createElement("i");

                    if (tuple[0] === 1) 
                        x.classList.add("fa-solid", "fa-x", "turquoise");    
                    else    
                        x.classList.add("fa-solid", "fa-o", "yellow");

                    square.appendChild(x);

                    if (tuple[1] === 1 || tuple[1] === 2) {
                        this.updateScore(tuple[1]);
                        let p = this.modal.querySelector("p");
                        if (p instanceof HTMLElement)
                            p.innerText = `Player ${tuple[1]} wins!`;
                        
                        this.toggleHidden(this.modal);
                    }

                    else if (tuple[1] === 0) {
                        this.updateScore(0);
                        let p = this.modal.querySelector("p");
                        if (p instanceof HTMLElement)
                            p.innerText = `It's a tie!`
                        
                        this.toggleHidden(this.modal);
                    }
                    
                    else
                        this.switchTurn(tuple[0]);
                }
            });
        });
    }





    
    updateScore(winner: number) {
        if (winner === 1) {
            const arr:string[] = this.player1ScoreEle.innerText.split(" ");
            let newScore: number = +arr[0] + 1;
            let newText: string =  `${newScore} Wins`;
            this.player1ScoreEle.innerText = newText;
        }

        else if (winner === 2) {
            const arr:string[] = this.player2ScoreEle.innerText.split(" ");
            let newScore: number = +arr[0] + 1;
            let newText: string =  `${newScore} Wins`;
            this.player2ScoreEle.innerText = newText;
        }

        else {
            let newScore: number = +this.tieEle.innerText + 1;
            let newText: string =  `${newScore}`;
            this.tieEle.innerText = newText;
        }
    }



    resetSquares() {
        this.squares.forEach((square) => {
            if (square.hasChildNodes() && square instanceof HTMLElement)
                square.replaceChildren();
        });
    }


    bindReset(handler: Function) {
        this.resetBtn.addEventListener("click", (event) => {

            this.resetSquares();

            this.player1ScoreEle.innerText = "0 Wins";
            this.player2ScoreEle.innerText = "0 Wins";
            this.tieEle.innerText = "0";

            this.toggleHidden(this.dropDownContent);
            this.switchTurn(2);

            handler();

        });
    } 


    bindNewRound(handler: Function) {
        this.newRoundBtn.addEventListener("click", (event) => {
            this.resetSquares();
            this.toggleHidden(this.dropDownContent);
            this.switchTurn(2);
            handler();
        });
    }


    bindPlayAgain(handler: Function) {
        this.playAgainBtn.addEventListener("click", (event) => {
            this.resetSquares();
            this.toggleHidden(this.modal);
            this.switchTurn(2);
            handler();
        });
    }



    toggleHidden(element: HTMLElement) {
        element.classList.toggle("hidden");
    }


    querySeclector(selector: string): HTMLElement {
        const ele: HTMLElement | null = document.querySelector(selector);
        
        if (!ele) 
            throw new Error("Could not find element!")

        return ele;
    }

}