import { Move } from "./model.js";
import Service from "./service.js";
import View from "./view.js";


export default class Controller {
    private service: Service;
    private view: View;

    constructor() {
        this.service = new Service();
        this.view = new View();

        this.view.bindMakeMove(this.handleMakeMove);
        this.view.bindPlayAgain(this.handlePlayAgain);
        this.view.bindNewRound(this.handlePlayAgain);
        this.view.bindReset(this.handleReset);

    }


    handleMakeMove = (move: Move) => {
        return this.service.makeMove(move);
    };

    handlePlayAgain = () => {
        this.service.playAgain();
    };

    handleReset = () => {
        this.service.reset();
    };
    
}