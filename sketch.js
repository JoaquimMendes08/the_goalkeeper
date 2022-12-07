var goalkeeperImg;
var ballImg;
var goalImg;
var backgroundImg;
var ballG;
var ball;
var gameOverImg;
var saved = 0;
var missed = 0;  

var END = 0
var PLAY = 1
var gameState = END 
var gameState = PLAY

function preload(){

    goalkeeperImg = loadImage("goalkeeper.png");
    goalImg = loadImage("goal.png");
    backgroundImg = loadImage("background.jpg");
    ballImg = loadImage("ball.png");
    gameOverImg = loadImage("gameOver.png");
   
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    

    goalkeeper = createSprite(270, height/1.85, 50,50);
    goalkeeper.addImage(goalkeeperImg);
    goalkeeper.scale = 0.3;

    goal = createSprite(100, height/1.85, 50,50);
    goal.addImage(goalImg);
    goal.scale = 0.8;
    goal.setCollider("rectangle", -80, 10, 20, 350);
    goal.depth = 99
    //goal.debug = true

    gameOver = createSprite(800, height/2, 50, 50);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 1;
    gameOver.visible = false

    ballGroup = createGroup();

}
function draw() {
    background(backgroundImg);

    if(keyIsDown('SPACE')){
        gameState === PLAY
    }

    if(gameState === PLAY){
    
        goalkeeper.y = mouseY
    
        if(frameCount % 30 === 0){
            kickBall();
        }
    
    } 

    if(ballGroup.collide(goalkeeper)){
        ballGroup.setVelocityXEach(5);
        ballGroup.setVelocityYEach(-30);
        saved += 1
    }

    if(ballGroup.collide(goal)){
        missed += 1
    }

    if(missed == 3){
        gameOver.visible = true
        ballGroup.destroyEach();
        ballGroup.setLifetimeEach(-1);
        
    }
    
    drawSprites();

    fill("black");
    textSize(40);
    text("saved kicks: " +saved, 1200, height/6);

    fill("black");
    textSize(40);
    text("goals: " +missed, 1200, height/4.5)
}

function kickBall(){
    ball = createSprite(2000,random(200, 500),40,40);
    ball.addImage(ballImg);
    ball.scale = 0.2;
    ball.velocityX= -50;
    ball.depth = 1
    ball.lifetime = 50;
    ballGroup.add(ball);
    ball.setCollider("rectangle", 10, 10, 0, 0);
    //ball.debug = true;
}



