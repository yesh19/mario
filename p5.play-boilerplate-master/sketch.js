var PLAY=1
var END=0
var gameState=PLAY
var score=0
var mario,mario_running,mario_collided
var ground,invisibleGround,groundImage
var obiGroup,obi1,obi2
var over,restart1

function preload(){
  mario_running= loadAnimation("mario.jpg","mario2.jpg","mario3.jpg")
  mario_collided=loadAnimation("mario4.png")

  groundImage=loadImage("path.png")

  restart1=loadImage("restart.png")
  over=loadImage("gameOver.jpg")

  obi1=loadAnimation("Goomba.jpg")
  obi2=loadAnimation("plant.jpg")

}



function setup(){
  createCanvas(800,400);
  mario=createSprite(50,180,20,50)
  mario.addAnimation("running",mario_running)
  mario.scale=0.5

  ground=createSprite(0,200,1200,20)
  ground.x=ground.width/2
  ground.velocityX=-(6+3*score/100)

 gameOver=createSprite(300,100)
 gameOver.addImage(over)

 restart=createSprite(300,140)
 restart.addImage(restart1)
 obiGroup=new Group()
 score=0
}

function draw() {
  background(255,255,255); 
  text("code score:"+score,500,40)
  drawSprites(); 
  if(gameState===PLAY){
    score=score+Math.round(getFrameRate()/60)
    if (score>=0){
      ground.velocityX=-6
    }
    else{
      ground.velocityX=-(6+3*score/100)
    }
    if (keyDown("space") && mario.y>=130){
      mario.velocityY=-10
    }
    mario.velocityY=mario.velocityY+0.8
    if(ground.x<0){
      ground.x=ground.width/2
    }
   mario.collide(ground)
   spawnObstacles()
  if(obiGroup.isTouching(mario)){
    gameState=END
  }
  }
  else if(gameState===END){
   // mario.visible=false
   // obiGroup.visible=false
    restart1.visible=true
    gameOver.visible=true
    mario.addAnimation("collided",mario_collided)
    ground.velocityX=0
    mario.velocityY=0
    obiGroup.setVelocityXEach(0)
    obiGroup.setLifetimeEach(-1)
   //mario.changeAnimation("collided",mario_collided)
if (mousePressedOver(restart1)){
  reset()
}
  }

}
function spawnObstacles(){
if(frameCount%60===0){
  var obs=createSprite(600,165,10,40)
  var r=Math.round(random(1,2))

switch(r){
  case 1:obs.addImage(obi1);
  break;
  case 2:obs.addImage(obi2);
  break;
  default:break
}
obs.scale=0.2
obs.lifetime=300
obiGroup.add(obs)
}
}

function reset(){
gameState=PLAY

    restart1.visible=false
    gameOver.visible=false
    obiGroup.destroyEach()
    mario.changeAnimation("running",mario_running)
    mario.scale=0.5
}

