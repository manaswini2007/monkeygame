var survivalTime = 0;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

monkey = createSprite(80,315,20,20);
  monkey.addAnimation("runing",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
}


function draw() {
  background(255);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
       
    }
  
   monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  
  if(obstacleGroup.isTouching(monkey)){
     ground.velocityX = 0;
       obstacleGroup.setLifetimeEach(2);
    FoodGroup.setLifetimeEach(2);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
    survivalTime = 0;
  }
  
  stroke("black");     
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survivalTime :"+survivalTime, 100,50);
  
   
  stroke("white");
  textSize(20);
  fill("white");
  text("score :"+score,500,50);
  
  drawSprites();
  
  obstacle();
  food();
}
function obstacle(){
 if (frameCount % 300 === 0){
   
var obstacle = createSprite(600,330,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   var rand = Math.round(random(10,50))
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
      monkey.collide(obstacle);
    obstacleGroup.add(obstacle);
   
  
 }

}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
  
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

     FoodGroup.add(banana);
  }
}




