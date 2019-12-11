/* eslint-disable */
console.log('salve o tompero');
const myFreezer = [];
let obstacle = false;


const myGameArea = {
  canvas: document.getElementById('canvas'),
  frames: 0,
  start() {
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

};

// heroi
class Hero {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
  }

  update() {
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  newMove() {
    this.x += this.speedX;
    if (this.x < 0) {
      this.x = 0;
    } else if ((this.x + this.width) > myGameArea.canvas.width) {
      this.x = myGameArea.canvas.width - this.width;
    }
    this.y += this.speedY;
    if (this.y < 0) {
      this.y = 0;
    } else if ((this.y + this.height) > myGameArea.canvas.height) {
      this.y = myGameArea.canvas.height - this.height;
    }
  }

};

document.onkeydown = function (move) {
  switch (move.keyCode) {
    case 38: // up arrow
      player.speedY -= 1;
      break;
    case 40: // down arrow
      player.speedY += 1;
      break;
    case 37: // left arrow
      player.speedX -= 1;
      break;
    case 39: // right arrow
      player.speedX += 1;
      break;
  }
};

document.onkeyup = function (e) {
  player.speedX = 0;
  player.speedY = 0;
};

const player = new Hero(50, 50, "purple", 0, 0);

// inimigo
class Enemy {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 4;
    this.speedY = -4;
  }

  update() {
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  collision() {
    if (this.x <= (player.width + player.x) && (this.x + this.width) >= player.x && this.y <= (player.height + player.y) && (this.y + this.height) >= player.y) {
      console.log('RIP');
      //alert('VOCÊ É UMA VERGONHA PARA A PROFISSÃO');
      //document.location.reload();
      //clearInterval(this.interval);
    }
  }

  infiniteMotion() {

    this.x += this.speedX;
    if (this.x < 0) {
      this.x = 0;
      this.speedX *= -1;
    } else if ((this.x + this.width) > myGameArea.canvas.width) {
      this.x = myGameArea.canvas.width - this.width;
      this.speedX *= -1;
    }
    this.y += this.speedY;
    if (this.y < 0) {
      this.y = 0;
      this.speedY *= -1;
    } else if ((this.y + this.height) > myGameArea.canvas.height) {
      this.y = myGameArea.canvas.height - this.height;
      this.speedY *= -1;
    }
  }

};

const enemy = new Enemy(50, 50, 'red', 400, 300);

//freezer que vai ser coletado
class Freezer {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  update() {
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  collision(){
    if (this.x <= (player.width + player.x) && (this.x + this.width) >= player.x && this.y <= (player.height + player.y) && (this.y + this.height) >= player.y) {
      console.log('bateu');
      obstacle = true;
    }
  }

  newPosition(){
    this.x = Math.floor(Math.random()*750);
    this.y = Math.floor(Math.random()*550);
  }

  //pushCollision()
}

const freezer = new Freezer(50, 50, 'black', 100, 100);



function updateGameArea() {
  myGameArea.clear();
  player.newMove();
  player.update();
  enemy.infiniteMotion();
  enemy.collision();
  enemy.update();
  freezer.collision();
  if(obstacle === true){
    freezer.newPosition();
    obstacle = false;
  }
  freezer.update();
}

myGameArea.start();