var backImg,groundImg,ground;
var bird,birdImg;
var pipeImg;
var PLAY=1,END=0,START=-1;
var gameMode=START;
var pipeGroup;
var JUMP_SPACE=20;
var backgroundStart,bgStartImg;

var score=0;
var gameover,gameoverImg;
var soundDie;
var start,startImg;
function preload()
{
  backImg=loadImage("background.png");
  groundImg=loadImage("groundImage.png");
  birdImg=loadImage("flappy-bird.png");
  pipeImg=loadImage("flappybird-pipe.png");
  bgStartImg=loadImage("FlappyStartImage.jpg");
  gameoverImg=loadImage("gameoverImage.png");
  soundDie=loadSound("die.mp3");
}

function setup()
{
  createCanvas(600,400);
  pipeGroup=new Group();
  //////////////////////
  ground=createSprite(300,490,5,5);
  ground.addImage(groundImg);
  ground.scale=1.6;
  //ground.velocityX=-4;
  //ground.debug=true;
  //////////////////////
  
  /////////////////////
  
  bird=createSprite(100,150,5,5);
  bird.addImage(birdImg);
  bird.scale=0.7;
  //bird.debug=true;
  bird.setCollider("circle",0,0,20);
  
  /////////////////////
  backgroundStart=createSprite(300,200,5,5);
  backgroundStart.addImage(bgStartImg);
  backgroundStart.scale=0.5;
  backgroundStart.visible=true;
  ////////////////////
  gameover=createSprite(300,200,5,5);
  gameover.addImage(gameoverImg);
  gameover.visible=false;
  alert("Click Anywhere To Start! If you Lose, Click on the Game Over Image");
}

function draw()
{
  background(backImg);
  gameover.depth++;
  if(gameMode===START && mousePressedOver(backgroundStart))
    {
      gameMode=PLAY;
      backgroundStart.visible=false;      
    }
  
  
  if(gameMode===PLAY)
    {
      score=score+round(getFrameRate()/60);
      ground.velocityX=-4;
      gameover.visible=false;
      if(ground.x<200)
        {
          ground.x=width/2;
        }
      ////////////////////////////
      if(keyWentDown("UP_ARROW"))
        {
          bird.rotation=-20;
          bird.velocityY=-5;
        }
      bird.rotation=bird.rotation+2;
      bird.rotation=constrain(bird.rotation,-40,90);
      bird.velocityY+=0.5;
      ////////////////////////////
      if(bird.isTouching(ground) || pipeGroup.isTouching(bird) || bird.y<0)
        {
          gameMode=END;
          soundDie.play();
        }
      pipeSpawn();
    }
    else if(gameMode===END)
      {    
          gameover.visible=true;
          ground.velocityX=0;
          bird.velocityY=0;
          pipeGroup.setLifetimeEach(-1);
          pipeGroup.setVelocityXEach(0); 
          if(mousePressedOver(gameover))
            {
              reset();
            }
      }
    drawSprites();
    fill("Cyan");
    textSize(20);
    text("Score: "+score,300,50);
}

function reset()
{
  gameMode=PLAY;
  gameover.visible=false;
  pipeGroup.destroyEach();
  score=0;
  bird.y=150;
}

function pipeSpawn()
{ 
  var randValue=round(random(-100,100));
  if(frameCount%60==0)
    {
          var pipe=createSprite(600,randValue,5,5);
          var pipe2=createSprite(600,randValue+round(random(360,380)),5,5);
          pipe2.addImage(pipeImg);
          pipe2.rotation=360;
          pipe2.lifetime=200;
          pipe2.velocityX=-4;
          pipe.addImage(pipeImg);
          pipe.velocityX=-4;
          pipe.lifetime=200;
          pipe.rotation=180;
          pipeGroup.add(pipe);
          pipeGroup.add(pipe2);
    }
}