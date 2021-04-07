/*




*/
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var treePos_y;
var collectables;
var canyon;
var clouds;
var mountains;
var game_score;
var flagpole;
var lives;
var lifetokens;

var platforms;
var jumpSound;
var collectSound;
var dieSound;
var breakSound;
var levelSound;

var cherrywormpic;
var lemonpic;
var grapepic;
var lemonadestand;
var fruitbasket;


function preload() {
  soundFormats("mp3", "wav");

  /* This sound extension adds sound to my game making it more fun to interact with and a lot more enagaging than it would
    have been were it a quiet game. The bits I found difficult while implementing the sound extension is to get my sound to stop
    looping once the code has been activated or triggered. While trying to solve this issue and iron out the bugs, I aquired more 
    skills on implementing and manipulating the sound function in p5.js. I learnt how to use soundbreak(), how to adjust the volume
    of each sound using sound.getVolvume, how to use playMode(), how to play two different sounds simultaneously and much more. I am grateful for the 
    opportunity to have been apart of this course. 
     */

  //load your sounds here
  jumpSound = loadSound("assets/jump.wav");
  jumpSound.setVolume(0.1);

  collectSound = loadSound("assets/fruit.wav");
  collectSound.setVolume(0.5);

  dieSound = loadSound("assets/mandie.wav");
  dieSound.setVolume(0.1);
  dieSound.playMode("restart");

  breakSound = loadSound("assets/break.wav");
  breakSound.setVolume(0.1);
  breakSound.playMode("restart");

  levelSound = loadSound("assets/levelup.wav");
  levelSound.setVolume(0.1);
  levelSound.playMode("restart");

  // loaded images here
  cherrywormpic = loadImage("assets/cherryworm.png");
  lemonpic = loadImage("assets/lemon.png");
  grapepic = loadImage("assets/grapes.png");
  lemonadestand = loadImage("assets/lemonadestand.png");
  fruitbasket = loadImage("assets/fruitbasket.png");
}

function setup() {
  createCanvas(1024, 576);
  lives = 3;
  startGame();
}

function startGame() {
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  // Variable to control the background scrolling.
  scrollPos = 0;

  // Variable to store the real position of the gameChar in the game
  // world. Needed for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;

  // Boolean variables to control the movement of the game character.
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

  // Initialise arrays of scenery objects.
  treePos_y = height / 2.53;

  trees_x = [
    -150,
    300,
    600,
    1000,
    2150,
    3500,
    3200,
    4500,
    4700,
    4900,
    5100,
    5300,
  ];

  collectables = [
    { x_pos: -600, y_pos: floorPos_y - 200, size: 40, isFound: false },
    { x_pos: -550, y_pos: floorPos_y - 150, size: 50, isFound: false },
    { x_pos: -500, y_pos: floorPos_y - 20, size: 50, isFound: false },
    { x_pos: -150, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: -150, y_pos: floorPos_y - 200, size: 40, isFound: false },
    { x_pos: -100, y_pos: floorPos_y - 150, size: 40, isFound: false },
    { x_pos: -10, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: 170, y_pos: floorPos_y - 150, size: 50, isFound: false },
    { x_pos: 190, y_pos: floorPos_y - 220, size: 50, isFound: false },
    { x_pos: 650, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: 700, y_pos: floorPos_y - 80, size: 50, isFound: false },
    { x_pos: 1050, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: 2500, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: 3000, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: 3700, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: 3800, y_pos: floorPos_y - 90, size: 50, isFound: false },
    { x_pos: 3850, y_pos: floorPos_y - 90, size: 50, isFound: false },
    { x_pos: 3900, y_pos: floorPos_y - 90, size: 50, isFound: false },
    { x_pos: 4000, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: 4200, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: 5100, y_pos: floorPos_y - 100, size: 50, isFound: false },
  ];

  canyon = [
    { x_pos: 140, width: 100 },
    { x_pos: 700, width: 100 },
    { x_pos: 1700, width: 100 },
    { x_pos: 2600, width: 100 },
  ];

  clouds = [
    { x_pos: -120, y_pos: 100, size: 25 },
    { x_pos: 300, y_pos: 70, size: 50 },
    { x_pos: 480, y_pos: 120, size: 30 },
    { x_pos: 1080, y_pos: 110, size: 30 },
    { x_pos: 1550, y_pos: 70, size: 50 },
    { x_pos: 2250, y_pos: 110, size: 30 },
    { x_pos: 2850, y_pos: 70, size: 50 },
    { x_pos: 3200, y_pos: 70, size: 50 },
    { x_pos: 3700, y_pos: 140, size: 30 },
  ];

  mountains = [
    { x_pos: 1135, y_pos: 100 },
    { x_pos: 1385, y_pos: 100 },
    { x_pos: 2285, y_pos: 100 },
    { x_pos: 3885, y_pos: 100 },
  ];

  /* The platform extension added platforms of various lengths and  sizes to my game that the game character can  jump on
     and collect the collectable items  that supposedly fell from the tree during cherry picking and landed on the platform instead
     of on the ground. This was implemented using the  rect function to draw the platform, as well as collision detection so we 
     could detect when the game character made contact with the platform. I aquired more skills on collision detection as well as 
     cementing my existing knowledge of for loops and condtional statements. 
     */
  platforms = [];

  platforms.push(createPlatforms(100, floorPos_y - 100, 100));
  platforms.push(createPlatforms(700, floorPos_y - 80, 150));
  platforms.push(createPlatforms(1850, floorPos_y - 100, 70));
  platforms.push(createPlatforms(3100, floorPos_y - 70, 70));
  platforms.push(createPlatforms(3600, floorPos_y - 70, 70));
  platforms.push(createPlatforms(4200, floorPos_y - 70, 200));
  platforms.push(createPlatforms(5500, floorPos_y - 70, 100));

  game_score = 0;

  flagpole = { isReached: false, x_pos: 5950 };

  lifetokens = { x_pos: 80, y_pos: 35, size: 20, count: lives };
}

function draw() {
  background(100, 155, 255); // fill the sky blue

  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height / 4); // draw some green ground

  push();
  translate(scrollPos, 0);

  // Draw clouds.
  drawClouds();

  // Draw mountains.
  drawMountains();

  // Draw trees.
  drawTrees();

  // Draw cherry worm
  image(cherrywormpic, 1850, floorPos_y - 150, 50, 50);

  // Draw Grapes
  image(grapepic, 3100, floorPos_y - 120, 50, 50);

  // Draw Lemons
  image(lemonpic, 3520, floorPos_y - 200, 30, 30);
  image(lemonpic, 3480, floorPos_y - 250, 30, 30);
  image(lemonpic, 3490, floorPos_y - 150, 40, 40);
  image(lemonpic, 3600, floorPos_y - 120, 50, 50);

  // Draw lemonade stand
  image(lemonadestand, 3650, floorPos_y - 200, 200, 200);

  // Draw fruit basket
  image(fruitbasket, 6010, floorPos_y - 90, 150, 150);

  // Draw Platforms
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }

  // check if player dies
  checkPlayerDie();

  // Draw canyons.
  for (var i = 0; i < canyon.length; i++) {
    checkCanyon(canyon[i]);
    drawCanyon(canyon[i]);
  }

  // Draw collectable items.
  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      drawCollectable(collectables[i]);
      checkCollectable(collectables[i]);
    }
  }

  renderFlagpole();

  pop();
  // Draw game character.

  drawGameChar();

  fill(255);
  noStroke();
  textSize(12);
  text("score:" + game_score, 20, 20);

  //Draw lifetokens.
  drawLifeTokens();

  // game over
  if (lives < 1) {
    fill(0);
    textSize(20);
    text("Game over. Press space to continue", 450, 300);
    return;
  }

  if (flagpole.isReached == true) {
    fill(0, 255, 0);
    textSize(30);
    text("Level complete. Press space to continue", 300, 300);
    noLoop();
    levelSound.play();
    return;
  }

  // Logic to make the game character move or the background scroll.
  if (isLeft) {
    if (gameChar_x > width * 0.2) {
      gameChar_x -= 5;
    } else {
      scrollPos += 5;
    }
  }

  if (isRight) {
    if (gameChar_x < width * 0.8) {
      gameChar_x += 5;
    } else {
      scrollPos -= 5; // negative for moving against the background
    }
  }

  // Logic to make the game character rise and fall.
  if (gameChar_y < floorPos_y) {
    var isContact = false;
    for (var i = 0; i < platforms.length; i++) {
      if (platforms[i].checkContact(gameChar_world_x, gameChar_y) == true) {
        isContact = true;
        break;
      }
    }
    if (isContact == false) {
      gameChar_y += 5;
      isFalling = true;
    }
  } else {
    isFalling = false;
  }

  if (flagpole.isReached == false) {
    checkFlagpole();
  }

  // Update real position of gameChar for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
  if (keyCode == 37) {
    console.log("left arrow");
    isLeft = true;
  } else if (keyCode == 39) {
    console.log("right arrow");
    isRight = true;
  } else if (keyCode == 32 && gameChar_y == floorPos_y) {
    console.log("space bar");
    gameChar_y = gameChar_y - 200;
    jumpSound.play();
  }
}

function keyReleased() {
  if (keyCode == 37) {
    console.log("left arrow");
    isLeft = false;
  } else if (keyCode == 39) {
    console.log("right arrow");
    isRight = false;
  }
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar() {
  // draw game character
  if (isLeft && isFalling) {
    // add your jumping-left code
    //Head
    noStroke();
    fill(200, 100, 200);
    ellipse(gameChar_x - 6, gameChar_y - 58, 25, 25);
    //Body
    fill(255, 0, 0);
    rect(gameChar_x - 5, gameChar_y - 45, 15, 30);
    // Hands&Feet
    fill(0);
    stroke(100);
    strokeWeight(5);
    //right foot
    beginShape();
    vertex(gameChar_x + 2, gameChar_y - 20);
    vertex(gameChar_x - 9, gameChar_y - 12);
    vertex(gameChar_x, gameChar_y - 4);
    endShape();
    //left foot
    line(gameChar_x + 6, gameChar_y - 14, gameChar_x + 12, gameChar_y - 6);
    // Right Hand
    line(gameChar_x + 2, gameChar_y - 35, gameChar_x + 16, gameChar_y - 43);
    //Left Hand
    line(gameChar_x + 12, gameChar_y - 26, gameChar_x + 17, gameChar_y - 29);
  } else if (isRight && isFalling) {
    // add your jumping-right code
    //Head
    noStroke();
    fill(200, 100, 200);
    ellipse(gameChar_x + 8, gameChar_y - 58, 25, 25);
    //Body
    fill(255, 0, 0);
    rect(gameChar_x - 5, gameChar_y - 45, 15, 30);
    // Hands&Feet
    fill(0);
    stroke(100);
    strokeWeight(5);
    //right foot
    beginShape();
    vertex(gameChar_x + 2, gameChar_y - 20);
    vertex(gameChar_x + 12, gameChar_y - 12);
    vertex(gameChar_x + 6, gameChar_y - 4);
    endShape();
    //left foot
    line(gameChar_x - 2, gameChar_y - 14, gameChar_x - 8, gameChar_y - 6);
    // Right Hand
    line(gameChar_x + 2, gameChar_y - 35, gameChar_x - 14, gameChar_y - 45);
    //Left Hand
    line(gameChar_x - 8, gameChar_y - 26, gameChar_x - 12, gameChar_y - 29);
  } else if (isLeft) {
    // add your walking left code
    noStroke();
    fill(200, 100, 200);
    ellipse(gameChar_x, gameChar_y - 60, 25, 25);
    //Body
    fill(255, 0, 0);
    rect(gameChar_x - 5, gameChar_y - 45, 15, 33);
    // Feet
    fill(0);
    stroke(100);
    strokeWeight(5);
    line(gameChar_x, gameChar_y - 20, gameChar_x - 12, gameChar_y - 4);
    line(gameChar_x + 2, gameChar_y - 35, gameChar_x + 15, gameChar_y - 25);
    line(gameChar_x + 5, gameChar_y - 11, gameChar_x + 14, gameChar_y - 4);
    line(gameChar_x - 6, gameChar_y - 30, gameChar_x - 14, gameChar_y - 20);
  } else if (isRight) {
    // add your walking right code
    noStroke();
    fill(200, 100, 200);
    ellipse(gameChar_x + 4, gameChar_y - 60, 25, 25);
    //Body
    fill(255, 0, 0);
    rect(gameChar_x - 5, gameChar_y - 45, 15, 33);
    // Feet
    fill(0);
    stroke(100);
    strokeWeight(5);
    line(gameChar_x + 2, gameChar_y - 20, gameChar_x + 14, gameChar_y - 4);
    line(gameChar_x + 2, gameChar_y - 35, gameChar_x - 10, gameChar_y - 25);
    line(gameChar_x - 2, gameChar_y - 11, gameChar_x - 10, gameChar_y - 3);
    line(gameChar_x + 10, gameChar_y - 30, gameChar_x + 16, gameChar_y - 22);
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code

    //Head
    noStroke();
    fill(200, 100, 200);
    ellipse(gameChar_x, gameChar_y - 60, 25, 25);
    //Body
    fill(255, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 45, 20, 30);
    // Feet
    fill(0);
    rect(gameChar_x - 15, gameChar_y - 20, 10, 10);
    rect(gameChar_x + 5, gameChar_y - 17, 10, 16);
  } else {
    // add your standing front facing code
    noStroke();
    fill(200, 100, 200);
    ellipse(gameChar_x, gameChar_y - 60, 25, 25);

    fill(255, 0, 0);
    rect(gameChar_x - 10, gameChar_y - 45, 20, 35);

    fill(0);
    rect(gameChar_x - 15, gameChar_y - 10, 10, 10);
    rect(gameChar_x + 5, gameChar_y - 10, 10, 10);
  }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds() {
  for (var i = 0; i < clouds.length; i++) {
    noStroke();
    fill(255);
    ellipse(
      clouds[i].x_pos,
      clouds[i].y_pos,
      clouds[i].size + 50,
      clouds[i].size + 30
    );

    ellipse(
      clouds[i].x_pos + 50,
      clouds[i].y_pos,
      clouds[i].size + 20,
      clouds[i].size
    );
  }
}

// Function to draw mountains objects.
function drawMountains() {
  for (var i = 0; i < mountains.length; i++) {
    fill(107, 142, 35);
    triangle(
      mountains[i].x_pos + 100,
      mountains[i].y_pos + 150,
      mountains[i].x_pos,
      mountains[i].y_pos + 332,
      mountains[i].x_pos + 200,
      mountains[i].y_pos + 332
    );

    triangle(
      mountains[i].x_pos + 200,
      mountains[i].y_pos + 200,
      mountains[i].x_pos + 100,
      mountains[i].y_pos + 332,
      mountains[i].x_pos + 300,
      mountains[i].y_pos + 332
    );
  }
}

// Function to draw trees objects.
function drawTrees() {
  for (var i = 0; i < trees_x.length; i++) {
    //trunk
    fill(100, 50, 0);
    rect(trees_x[i], treePos_y - 30, 40, 235);
    fill(0, 100, 0);

    //branches
    triangle(
      trees_x[i] + 25,
      treePos_y - 70,
      trees_x[i] - 75,
      treePos_y + 80,
      trees_x[i] + 100,
      treePos_y + 80
    );

    triangle(
      trees_x[i] + 25,
      treePos_y - 95,
      trees_x[i] - 55,
      treePos_y + 20,
      trees_x[i] + 90,
      treePos_y + 20
    );
  }
}

// function to draw life tokens
function drawLifeTokens() {
  for (var i = 0; i < lifetokens.count; i++) {
    stroke(218, 165, 32);
    strokeWeight(4);
    fill(255, 215, 0);
    ellipse(
      lifetokens.x_pos + i * 12,
      lifetokens.y_pos,
      lifetokens.size,
      lifetokens.size
    );

    fill(255);
    noStroke();
    text("Lives:" + lives, 20, 40);
  }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon) {
  noStroke();
  fill(139, 69, 19);
  rect(t_canyon.x_pos, 433, t_canyon.width, 150);
  fill(222, 184, 135);
  rect(t_canyon.x_pos + 13, 433, t_canyon.width - 26, 150);
  fill(100, 155, 255);
  rect(t_canyon.x_pos + 20, 400, t_canyon.width - 40, 170);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon) {
  if (
    gameChar_world_x > t_canyon.x_pos + 13 &&
    gameChar_world_x < t_canyon.x_pos - 13 + t_canyon.width &&
    gameChar_y >= floorPos_y
  ) {
    isPlummeting = true;
    gameChar_y += 5;
    dieSound.play();
    breakSound.play();
  }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable) {
  fill(205, 0, 0);
  stroke(150, 0, 0);
  strokeWeight(5);
  ellipse(
    t_collectable.x_pos + 420,
    t_collectable.y_pos,
    t_collectable.size - 10,
    t_collectable.size - 10
  );

  ellipse(
    t_collectable.x_pos + 450,
    t_collectable.y_pos,
    t_collectable.size - 10,
    t_collectable.size - 10
  );
  noFill();
  stroke(0, 255, 0);
  line(
    t_collectable.x_pos + 420,
    t_collectable.y_pos - 10,
    t_collectable.x_pos + 435,
    t_collectable.y_pos - 35
  );

  line(
    t_collectable.x_pos + 450,
    t_collectable.y_pos - 10,
    t_collectable.x_pos + 435,
    t_collectable.y_pos - 35
  );
}

// Function to check character has collected an item.

function checkCollectable(t_collectable) {
  if (
    dist(
      gameChar_world_x,
      gameChar_y,
      t_collectable.x_pos + 420,
      t_collectable.y_pos
    ) < t_collectable.size
  ) {
    t_collectable.isFound = true;
    game_score += 1;
    collectSound.play();
  }
}

function renderFlagpole() {
  push();
  strokeWeight(5);
  stroke(100);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
  fill(255, 0, 150);
  noStroke();

  if (flagpole.isReached) {
    rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
  } else {
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
  }

  pop();
}

function checkFlagpole() {
  var d = abs(gameChar_world_x - flagpole.x_pos);
  if (d < 10) {
    flagpole.isReached = true;
    levelSound.play();
  }
}

function checkPlayerDie() {
  if (gameChar_y > 600) {
    --lives;
    if (lives > 0) {
      startGame();
    }
  }

  if (lives == 0) {
    startGame();
  }
}

function createPlatforms(x, y, length) {
  var p = {
    x: x,
    y: y,
    length: length,
    draw: function () {
      stroke(184, 134, 11);
      fill(222, 184, 135);
      rect(this.x, this.y, this.length, 20);
    },
    checkContact: function (gameChar_x, gameChar_y) {
      if (gameChar_x > this.x && gameChar_x < this.x + this.length) {
        var ds = this.y - gameChar_y;
        if (ds >= 0 && ds < 5) {
          return true;
        }
      }

      return false;
    },
  };

  return p;
}
