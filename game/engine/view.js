import Game from "./game.js";

const setUpTable = function(boardArray, score) {
    return $(`<div text-align:"center"> 
    <table class="center"> 
            <tr>  
                <td>${boardArray[0]}</td>  
                <td>${boardArray[1]}</td>  
                <td>${boardArray[2]}</td>  
                <td>${boardArray[3]}</td>  
            </tr>         
            <tr>  
                <td>${boardArray[4]}</td>  
                <td>${boardArray[5]}</td>  
                <td>${boardArray[6]}</td>  
                <td>${boardArray[7]}</td>  
            </tr>         
            <tr>  
                <td>${boardArray[8]}</td>  
                <td>${boardArray[9]}</td>  
                <td>${boardArray[10]}</td>  
                <td>${boardArray[11]}</td>  
            </tr>  
            <tr>       
                <td>${boardArray[12]}</td>  
                <td>${boardArray[13]}</td>  
                <td>${boardArray[14]}</td>  
                <td>${boardArray[15]}</td>  
            </tr>    
    </table>
    <p><strong>Score</strong>: ${score}</p>
    <button class="restart"; name="button"; type="button">Restart</button>
    </div>`);
}


export const handleRestartButtonPress = function() {

    const $root = $('#root');
    $root.empty();
    startGame();
   
}

export const handleKeyPress = function(game, direction) {

    game.move(direction);
    let boardArray = [];
    for(let i = 0; i < game.getGameState().board.length; i++) {
        if(game.getGameState().board[i] == 0) {
            boardArray.push("  ");
        } else {
            boardArray.push(game.getGameState().board[i]);
        }
    }
    let newBoard = setUpTable(boardArray, game.getGameState().score);
    const $root = $('#root');
    $root.empty();
    if(game.getGameState().over == true && game.getGameState().won == true) {
        $root.append(`<h1 class="win">You Win!</h1>`);
        $root.append(`<h1 class="over">No More Moves Can Be Made</h1>`);
        $root.append(`<h1>Final Score: ${game.getGameState().score}</h1>`);
        $root.append(newBoard);
    } else if(game.getGameState().over == true && game.getGameState().won == false){
        $root.append(`<h1 class="over">No More Moves Can Be Made</h1>`);
        $root.append(`<h1>Final Score: ${game.getGameState().score}</h1>`);
        $root.append(newBoard);
    }else if(game.getGameState().won == true) {
        $root.append(`<h1 class="win">You Win!</h1>`);
        $root.append(newBoard);
    } else {
        $root.append(newBoard);
    }
    
}


export const startGame = function() {
   
    const $root = $('#root');

    let game = new Game(4);

    // game.loadGame({
    // board: [8,2,8,2,2,8,2,8,8,2,8,2,2,8,2,8],
    // board:[1024,1024,8,2,2,8,2,8,8,2,8,2,2,8,2,8],
    // score: 0,
    // won: false,
    // over: false
    // })
    let boardArray = [];
    for(let i = 0; i < game.getGameState().board.length; i++) {
        if(game.getGameState().board[i] == 0) {
            boardArray.push("  ");
        } else {
            boardArray.push(game.getGameState().board[i]);
        }
    }

    let board = setUpTable(boardArray, game.getGameState().score);
    $root.append(board);

    $("#root").on('click', ".restart", handleRestartButtonPress);

    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                handleKeyPress(game, 'left');
                break;
            case 38:
                handleKeyPress(game, 'up');
                break;
            case 39:
                handleKeyPress(game, 'right');
                break;
            case 40:
                handleKeyPress(game, 'down');
                break;
        }
    };

};


$(function() {
    startGame();
});