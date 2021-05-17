import Game from "./engine/game.js";
import View from "./engine/view.js";
import Controller from "./engine/view.js";

let model = null;
let controller = null;
let view = null;

$(document).ready(() => {
    model = new Game(4);
    view = new View(model);
    controller = new Controller(model,view);

    $("#game").append(view.div);

    // $(`.button`).on(`click`, view.handleNewGame);

});