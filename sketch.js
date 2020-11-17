var PLAY=1;
var END=0;
var monkey , monkey_running
var ground,ground1;
var banana ,bananaImage, obstacle, obstacleImage;
var BananaGroup, obstacleGroup;
var score=0,survivaltime=0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,400)
  monkey=createSprite(200,300,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  
  ground=createSprite(250,350,500,10);
  ground.velocityX=-4;
  ground1=createSprite(750,350,500,10);
  ground1.velocityX=-4;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  background("white");
  text("Score = "+score,300,50);
  
  
  text("Survival Time = "+survivaltime,100,50);
  if(gameState===PLAY){
    if (ground.x < -250){
       ground.x=700;
    }
    if (ground1.x < -250){
       ground1.x=700;
    }
  
  if(keyDown("space")&&monkey.y>=150){
     monkey.velocityY=-12;
     }
  if(bananaGroup.isTouching(monkey)){
     score++;
     bananaGroup.destroyEach();
     }
    if(obstacleGroup.isTouching(monkey)){
     gameState=END;
     }
 survivaltime=Math.ceil(frameCount/frameRate());
  food();
  obstacles(); 
}else if(gameState===END){
         bananaGroup.setVelocityXEach(0);
         obstacleGroup.setVelocityXEach(0);
         bananaGroup.setLifetimeEach(-1);
         obstacleGroup.setLifetimeEach(-1);
         ground.velocityX=0;
         ground1.velocityX=0;
         }
  monkey.velocityY=monkey.velocityY+0.6
  monkey.collide(ground);
  monkey.collide(ground1);
  drawSprites();
}
function food(){
  if(frameCount % 150 === 0){
    banana=createSprite(500,200,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(120,200));
    banana.velocityX=-4;
    banana.lifetime=275;
    bananaGroup.add(banana);
}
}
function obstacles(){
  if(frameCount % 300 === 0){
    obstacle=createSprite(500,320,10,10);
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-4;
    obstacle.lifetime=275;
    obstacleGroup.add(obstacle);
}
}
