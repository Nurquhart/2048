/*
Add your code for Game here
 */



export default class Game {
    
    constructor(size) {
        this.size = size;
        this.gamestate = {
            board: [],
            score: 0,
            won: false,
            over: false
        }
        this.setupNewGame();
        this.gameBoard = this.gamestate.board;
        this.score = this.gamestate.score;
        this.won = this.gamestate.won;
        this.over = this.gamestate.won;
        this.moveListeners =  [];
        this.wonListeners = [];
        this.loseListeners = [];
    }

    setupNewGame() {
        let game = []
        for(let i = 0; i < this.size*this.size; i++) {
            if(i < 2) {
                let num = randomTile();
                game.push(num);
            } else {
                game.push(0);
            }
        }
        game = shuffle(game);
        this.gamestate.board = game;
        this.gamestate.score = 0;
        this.gamestate.won = false;
        this.gamestate.over = false;
        // return {
        //     board: this.gameBoard,
        //     score: 0,
        //     won: false,
        //     over: false
        // }
    }

    loadGame(gameState) {
        this.gamestate.board = gameState.board;
        this.gamestate.score = gameState.score;
        this.gamestate.won = gameState.won;
        this.gamestate.over = gameState.over;
        return this.gamestate;
    }

    move(direction) {
        let changes = 0;

        let chan = shift(this.gamestate.board, direction, this.size);
        this.gamestate.board = chan.board;
        changes += chan.change;

        let addition = add(this.gamestate.board, direction, this.size);
        this.gamestate.board = addition.board;
        this.gamestate.score += addition.score;
        this.gamestate.won = addition.won;
        changes += addition.changes;

        let chan1 = shift(this.gamestate.board, direction, this.size);
        this.gamestate.board = chan1.board;
        changes += chan1.change;

        //possible moves added to changes
        let possibleChanges = 0;
        let newBoard = [...chan1.board];
        let try1 = shift(newBoard, "right", this.size);
        possibleChanges += try1.change;
        let try2 = add(newBoard, "right", this.size);
        possibleChanges += try2.changes;
        let try3 = shift(newBoard, "right", this.size);
        possibleChanges += try3.change;

        let try4 = shift(newBoard, "left", this.size);
        possibleChanges += try4.change;
        let try5 = add(newBoard, "left", this.size);
        possibleChanges += try5.changes;
        let try6 = shift(newBoard, "left", this.size);
        possibleChanges += try6.change;

        let try7 = shift(newBoard, "up", this.size);
        possibleChanges += try7.change;
        let try8 = add(newBoard, "up", this.size);
        possibleChanges += try8.changes;
        let try9 = shift(newBoard, "up", this.size);
        possibleChanges += try9.change;

        let try10 = shift(newBoard, "down", this.size);
        possibleChanges += try10.change;
        let try11 = add(newBoard, "down", this.size);
        possibleChanges += try11.changes;
        let try12 = shift(newBoard, "down", this.size);
        possibleChanges += try12.change;

        

        //seeing if game is over/ adding new tile
       
        let count = 0;
        for(let i = 0; i < this.size*this.size; i++) {
            if(this.gamestate.board[i] == 0) {
                count++;
            }
            if(this.gamestate.board[i] == 2048) {
                this.gamestate.won = true;
            }
        }

            
        let addNew = false;
        if(count < 1 && possibleChanges <= 0 && changes <= 0) {
            addNew = true;
            this.gamestate.over = true;
        } else if(count < 1 && changes <= 0) {
            addNew = true;
        } else {
            addNew = false;
        }

        if(changes > 0) {     
            while(!addNew) {
                let rand = Math.floor(Math.random() * (this.size*this.size)); 
                if(this.gamestate.board[rand] == 0) {
                    let num = randomTile();
                    this.gamestate.board[rand] = num;
                    break;
                }
            }
        }

        
         //Listeners
        for(let i = 0; i < this.moveListeners.length; i++) {
            this.moveListeners[i](this.gamestate);
        }

        //possible moves added to changes
        possibleChanges = 0;
        newBoard = [...chan1.board];
        try1 = shift(newBoard, "right", this.size);
        possibleChanges += try1.change;
         try2 = add(newBoard, "right", this.size);
        possibleChanges += try2.changes;
         try3 = shift(newBoard, "right", this.size);
        possibleChanges += try3.change;

         try4 = shift(newBoard, "left", this.size);
        possibleChanges += try4.change;
         try5 = add(newBoard, "left", this.size);
        possibleChanges += try5.changes;
         try6 = shift(newBoard, "left", this.size);
        possibleChanges += try6.change;

         try7 = shift(newBoard, "up", this.size);
        possibleChanges += try7.change;
         try8 = add(newBoard, "up", this.size);
        possibleChanges += try8.changes;
         try9 = shift(newBoard, "up", this.size);
        possibleChanges += try9.change;

         try10 = shift(newBoard, "down", this.size);
        possibleChanges += try10.change;
         try11 = add(newBoard, "down", this.size);
        possibleChanges += try11.changes;
         try12 = shift(newBoard, "down", this.size);
        possibleChanges += try12.change;


        if(possibleChanges <= 0) {
            this.gamestate.over = true;
        }




        if(this.gamestate.won == true) {
            for(let i = 0; i < this.wonListeners.length; i++) {
            this.wonListeners[i](this.gamestate);
            }
        }

        if(this.gamestate.over == true) {
            for(let i = 0; i < this.loseListeners.length; i++) {
                this.loseListeners[i](this.gamestate);
            }
        }
    

    }

    toString() {
        let visualBoard = "";
        for(let i = 0; i < this.size*this.size; i++) {
            if(i % this.size == 0) {
                visualBoard += '\n';
            }

            if(this.gamestate.board[i] == 0) {
                visualBoard += "[ ] "
            } else {
                visualBoard += `[${this.gamestate.board[i]}] `
            }
        }
        return visualBoard;
        
    }

    onMove(callback) {
        this.moveListeners.push(callback);
    }

    onWin(callback) {
        this.wonListeners.push(callback);
    }

    onLose(callback) {
        this.loseListeners.push(callback);
    }

    getGameState() {
        return this.gamestate;
    }
}



  let randomTile = function() {
    let notRandomNumbers = [2,2,2,2,2,2,2,2,2,4];
    let idx = Math.floor(Math.random() * notRandomNumbers.length);
    return notRandomNumbers[idx];
  }

  let shuffle = function (array) {

    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};

let shift = function (board, direction, len) {
    let madeChanges = 0;
    let countChanges = 1;
    while(countChanges > 0) {
        countChanges = 0;
        if(direction == "right") {
            for(let i = 1; i <= len; i++ ) {
                for(let j = 1; j < len; j++) {
                    if(board[len*i-j] == 0 && board[len*i-j-1] != 0) {
                        board[len*i-j] = board[len*i-j-1];
                        board[len*i-j-1] = 0;
                        countChanges++;
                        madeChanges++;
                    } else {
                        
                    }
                }
            }
        }
    
        if(direction == "left") {
            for(let i = 0; i < len; i++) {
                for(let j = 0; j < len - 1; j++) {
                    if(board[len*i+j] == 0 && board[len*i+j+1] != 0) {
                        board[len*i+j] = board[len*i+j+1];
                        board[len*i+j+1] = 0;
                        countChanges++;
                        madeChanges++;
                    } else {
                       
                    }
                }
            }
        }

        if(direction == "up") {
            for(let i = 0; i < len; i++) {
                for(let j = 0; j < len - 1; j++) {
                    if(board[i+(j*4)] == 0 && board[i+(j*4)+4] != 0) {
                        board[i+(j*4)] = board[i+(j*4)+4];
                        board[i+(j*4)+4] = 0;
                        countChanges++;
                        madeChanges++;
                    } else {
                      
                    }
                }
            }
        }

        if(direction == "down") {
            for(let i = len*len - 1; i >= len*len - 4; i--) {
                for(let j = 0; j < len - 1; j++) {
                    if(board[i-(j*4)] == 0 && board[i-4-(j*4)] != 0) {
                        board[i-(j*4)] = board[i-4-(j*4)];
                        board[i-4-(j*4)] = 0;
                        countChanges++;
                        madeChanges++;
                    } else {
                        
                    }
                }
            }
        }
    }   
    return {
        board: board,
        change: madeChanges
    }
    
}

let add = function(board, direction, len) {
    let score = 0;
    let madeChanges = 0;
    let won = false;
    if(direction == "right") {
        for(let i = 1; i <= len; i++ ) {
            for(let j = 1; j < len; j++) {
                if(board[len*i-j] == 0) {
                    
                } else if(board[len*i-j] == board[len*i-j-1]) {
                    board[len*i-j] = board[len*i-j] * 2;
                    board[len*i-j-1] = 0;
                    score += board[len*i-j];
                    madeChanges++;
                    if(board[len*i-j] == 2048) {
                        won = true;
                    }
                } else {
                    
                }
            }
        }
    }

    if(direction == "left") {
        for(let i = 0; i < len; i++) {
            for(let j = 0; j < len -1 ; j++) {
                if(board[len*i+j] == 0) {
                   
                } else if(board[len*i+j] == board[len*i+j+1]) {
                    board[len*i+j] = board[len*i+j] * 2;
                    board[len*i+j+1] = 0;
                    score += board[len*i+j];
                    madeChanges++;
                    if(board[len*i+j] == 2048) {
                        won = true;
                    }
                }else {
                   
                }
            }
        }
    }

    if(direction == "up") {
        for(let i = 0; i < len; i++) {
            for(let j = 0; j < len - 1; j++) {
                if(board[i+(j*4)] == 0) {
                   
                } else if(board[i+(j*4)] == board[i+(j*4)+4]) {
                    board[i+(j*4)] = board[i+(j*4)] * 2;
                    board[i+(j*4)+4] = 0;
                    score += board[i+(j*4)];
                    madeChanges++;
                    if(board[i+(j*4)] == 2048) {
                        won = true;
                    }
                }else {
                  
                }
            }
        }
    }

    if(direction == "down") {
        for(let i = len*len - 1; i >= len*len - 4; i--) {
            for(let j = 0; j < len; j++) {
                if(board[i-(j*4)] == 0) {
                  
                } else if(board[i-(j*4)] == board[i-4-(j*4)]) {
                    board[i-(j*4)] = board[i-(j*4)] * 2;
                    board[i-4-(j*4)] = 0;
                    score += board[i-(j*4)];
                    madeChanges++;
                    if(board[i-(j*4)] == 2048) {
                        won = true;
                    }
                } else {
                    
                }
            }
        }
    }


return {
    board: board,
    score: score,
    changes: madeChanges,
    won: won
};

}