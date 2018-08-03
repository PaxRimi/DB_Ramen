
var arrayDivs = document.querySelectorAll('#board div');
var points = document.getElementById('points');
var scoreBoard = document.getElementById('over');
var scoreBoardPoints = document.getElementById('playerScore');
var gameOverText = document.getElementById('gameOverText');

function Goku() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Ramen() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {
    this.board = arrayDivs;
    this.goku = new Goku();
    this.ramen = new Ramen();
    this.score = 0;
    this.index = function(x,y) {
        return x + (y * 10);
    };
    this.showGoku = function() {
        this.board[this.index(this.goku.x,this.goku.y)].classList.add('goku');

    };
    this.hideVisibleGoku = function () {
        var previousGoku = document.querySelector('.goku');
        previousGoku.classList.remove('goku');
    };
    this.showRamen = function () {
        this.board[this.index(this.ramen.x,this.ramen.y) ].classList.add('ramen');
    };
    var self = this;
    this.startGame = function(){ this.idSetInterval = setInterval(function () {self.moveGoku()}, 250);};
    this.moveGoku = function(){
        if(this.goku.direction === "right") {
            this.goku.x += 1;
        } else if ( this.goku.direction === "left" ) {
            this.goku.x -= 1;
        } else if ( this.goku.direction === "up") {
            this.goku.y -= 1;
        } else if ( this.goku.direction === "down") {
            this.goku.y += 1;
        }
        this.hideVisibleGoku();
        this.gameOver();
        this.showGoku();
        this.checkRamenCollision();
    };

    this.turnGoku = function (event) {
        switch (event.which) {
            case 37:
                this.goku.direction = "left";
                break;
            case 38:
                this.goku.direction = "up";
                break;
            case 39:
                this.goku.direction = "right";
                break;
            case 40:
                this.goku.direction = "down";
                break;
        }
    };
    this.checkRamenCollision = function () {
        if (this.goku.x === this.ramen.x && this.goku.y === this.ramen.y) {
            this.board[this.index(this.ramen.x,this.ramen.y) ].classList.remove('ramen');
            this.score += 1;
            points.innerText = this.score;
            this.ramen = new Ramen();
            this.showRamen();
        }
    };
    this.gameOver = function(){
        if (this.goku.x < 0 || this.goku.x > 9 || this.goku.y < 0 || this.goku.y > 9) {
            clearInterval(this.idSetInterval);
            this.gameOverBoard();
            this.hideVisibleGoku();
        }

    };
    this.gameOverBoard = function () {
        scoreBoardPoints.innerText = this.score;
        scoreBoard.classList.remove('invisible');
        if (this.score <= 5) {
            gameOverText.innerText = "Goku is still hungry, try better next time!";
        } else if (this.score <= 10) {
            gameOverText.innerText = "Goku is almost full,  but still is not happy from your work...";
        } else if (this.score > 10 ) {
            gameOverText.innerText = "Goku is full and happy, You Work Great!";
        }
    }
}



var newgame = new Game();

newgame.showGoku();
newgame.showRamen();
newgame.startGame();

document.addEventListener('keydown', function(event){
    newgame.turnGoku(event);
});

