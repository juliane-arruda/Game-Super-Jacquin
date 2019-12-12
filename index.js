/* eslint-disable */
const myFreezer = [];
let score = 0;

const myGameArea = {
  intro: document.getElementById('intro'),
  finish: document.getElementById('finish'),
  canvas: document.getElementById('canvas'),
  score: document.getElementById('score-real'),
  frames: 0,
  start() {
    this.canvas.width = 1000;
    this.canvas.height = 650;
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
    let jacquinImg = new Image();
    jacquinImg.src = './imagem/hero.png';
    ctx.drawImage(jacquinImg, this.x, this.y, this.width, this.height);
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

const player = new Hero(80, 80, "purple", 0, 0);

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
    let enemyImg = new Image();
    enemyImg.src = './imagem/enemy.png';
    ctx.drawImage(enemyImg, this.x, this.y, this.width, this.height);
  }

  collision() {
    if (this.x <= (player.width + player.x) && (this.x + this.width) >= player.x && this.y <= (player.height + player.y) && (this.y + this.height) >= player.y) {
      return true;
    }
    return false;
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

const enemy = new Enemy(80, 80, 'red', 800, 800);

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
    let freezerImg = new Image();
    freezerImg.src = './imagem/freezer.png';
    ctx.drawImage(freezerImg, this.x, this.y, this.width, this.height);
  }

  collision() {
    if (this.x <= (player.width + player.x) && (this.x + this.width) >= player.x && this.y <= (player.height + player.y) && (this.y + this.height) >= player.y) {
      return true;
    }

    return false;
  }

  newPosition() {
    this.x = Math.floor(Math.random() * 900);
    this.y = Math.floor(Math.random() * 550);
  }
};

const freezer = new Freezer(50, 80, 'black', 100, 100);

function gameOver() {
  myGameArea.canvas.style.display = "none";
  myGameArea.finish.style.display = "flex";
  clearInterval(myGameArea.interval);
  document.getElementById('score').innerText=score;
}

function updateGameArea() {
  myGameArea.clear();
  player.newMove();
  player.update();
  enemy.infiniteMotion();
  if (enemy.collision()) {
    gameOver();
  };
  enemy.update();
  if (freezer.collision()) {
    score += 1;
    myGameArea.score.innerText = `score ${score}`;
    freezer.newPosition();
    obstacle = false;
  }
  freezer.update();

}

// myGameArea.start();
myGameArea.intro.style.display = "flex";
document.getElementById('start-intro').addEventListener("click", () => {
  myGameArea.intro.style.display = "none";
  myGameArea.canvas.style.display = "block";
  myGameArea.start();
});

document.getElementById('retry-finish').addEventListener("click", () => {
  myGameArea.finish.style.display = "none";
  myGameArea.canvas.style.display = "block";
  player.x = 0;
  player.y = 0;
  freezer.x = 100;
  freezer.y = 100;
  enemy.x = 800;
  enemy.y = 800;
  score = 0;
  myGameArea.start();
});