var dogHungryImage,dogHappyImage;
var database,foodStock,dogSprite,foodS;
function preload(){
  dogHungryImage=loadImage("images/dogImg1.png");
  dogHappyImage=loadImage("images/dogImg.png");

}
function setup() { 
  createCanvas(500,500);
  database=firebase.database();
  dogSprite=createSprite(250,300);
  dogSprite.addImage("happy image",dogHappyImage);
  dogSprite.addImage("hungry image",dogHungryImage);
  dogSprite.scale = 0.3;
  var foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  
}

function draw() {
  rectMode(CENTER);
  background(0);
  textSize(20);
  fill("white");
  text("Press up arrow key to feed dog",150,50);


   drawSprites();
   text("Stock:"+foodS,250,150);
}

function readStock(data){
foodS=data.val();
}

function writeStock(){
  if(foodS<=0){
    foodS=0;
  }
  else{
    foodS=foodS-1;
  }
database.ref("/").update({
  Food:foodS
})
}

function keyPressed(){
  if(keyCode==UP_ARROW){
    dogSprite.changeImage("hungry image",dogHungryImage);
    writeStock();
   
  }
}