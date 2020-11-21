var dog, dogImage, dogImage1
var database
var food,foodStock
function preload(){
dogImage=loadImage("images/dogImg.png")
dogImage1=loadImage("images/dogImg1.png")
}
function setup() { 
  createCanvas(800, 700); 
  database=firebase.database() 
  dog=createSprite(250,300) 
  dog.addImage(dogImage) 
  dog.scale=.15
 foodStock=database.ref('Food') 
 foodStock.on("value",readStock)
}

function draw() { 
  if(keyWentDown(UP_ARROW)){ 
    writeStock(food) 
    dog.addImage(dogImage1)
  } 
  drawSprites(); 
  fill(255)
  stroke("black")
  text("food remaining: "+food,170,200)
  text("Press up arrow to feed",130,10,300,20)
  //add styles here
}

function readStock(data) {
food=data.val()
}

function writeStock(x) {
  if(x<=0) {
    x=0
  }
  else {
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}
