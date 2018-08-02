
var arrayDivs = document.querySelectorAll('#board div');
var points = document.getElementById('points');

function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {
    this.board = arrayDivs;
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x,y) {
        return x + (y * 10);
    };
    this.showFurry = function() {
        this.board[this.index(this.furry.x,this.furry.y)].classList.add('furry');

    };
    this.hideVisibleFurry = function () {
        var previousFurry = document.querySelector('.furry');
        previousFurry.classList.remove('furry');
    };
    this.showCoin = function () {
        this.board[this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    };
    var self = this;
    this.startGame = function(){ this.idSetInterval = setInterval(function () {self.moveFurry()}, 250);};
    this.moveFurry = function(){
        if(this.furry.direction === "right") {
            this.furry.x += 1;
            console.log(this.furry.x);
        } else if ( this.furry.direction === "left" ) {
            this.furry.x -= 1;
            console.log(this.furry.x);
        } else if ( this.furry.direction === "up") {
            this.furry.y -= 1;
            console.log(this.furry.y);
        } else if ( this.furry.direction === "down") {
            this.furry.y += 1;
            console.log(this.furry.y);
        }
        this.hideVisibleFurry();
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    };

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    };
    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board[this.index(this.coin.x,this.coin.y) ].classList.remove('coin')
            this.score += 1;
            points.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };
    this.gameOver = function(){
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            alert("Koniec Gry");
            this.hideVisibleFurry();
        }

    }
}


var newgame = new Game();

newgame.showFurry();
newgame.showCoin();
newgame.startGame();

document.addEventListener('keydown', function(event){
    newgame.turnFurry(event);
});

