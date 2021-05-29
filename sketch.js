 
var  dog,dogImg,happyDog,database,foodS,foodStock
var fedTime,lastFed;
var feed,addFood;
var foodObj;
 var bedroomImg
 var washroomImg
 var gardenImg
 var livingroomImg
 var gameState
 var bedroom,washroom,garden,livingroom
 var milkImg,milk;
function preload()
{
  //load images here

  dogImg=loadImage("images/dogImg.png")
  happyDog=loadImage("images/happydog.png")
  bedroomImg=loadImage("images/Bed Room.png")
  washroomImg=loadImage("images/Wash Room.png")
  gardenImg=loadImage("images/Garden.png")
   milkImg=loadImage("images/Milk.png")
livingroomImg=loadImage("images/Living Room.png")
  
}

function setup() {
  
  createCanvas(600,600);

  database = firebase.database();

dog=createSprite(390,390,20,20)
dog.addImage(dogImg)
dog.scale=0.25

  foodStock=database.ref('Food');
 foodStock.on("value",readStock);
 
 readState=database.ref('gameState');
readState.on("value",function(data){
  gameState=data.val();
})

 
// feed=createButton("Feed the dog");
 // feed.position(500,95);
  //feed.mousePressed(feedDog);
  

  //addFood=createButton("Add Food");
  //addFood.position(600,95);
 // addFood.mousePressed(addFoods);

foodObj = new Food();

milk=createSprite(100,32)
milk.addImage(milkImg)
milk.scale=0.1


}


function draw() { 
  background(46,139,87) 
  foodObj.display()
 // writeStock(foodS)

  if(foodS == 0){
    dog.addImage(happyDog);
    milk.visible=false
  }
  else{
    dog.addImage(dogImg);
    milk.visible=true
  }
 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
  })
  
  if(gameState===1) {
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250
  }
   if(gameState===2){
     dog.addImage(dogImg);
     dog.scale=0.175;
     milk.visible=false;
     dog.y=250;
   }

   var Bath=createButton("I want to take bath");
   Bath.position(680,125);
   if(Bath.mousePressed(function(){
     gameState=3;
     database.ref('/').update({'gameState':gameState});
 }));
 if(gameState===3){
   dog.addImage(washroomImg);
   dog.scale=1;
   milk.visible=false;
    
 }
  
 var Sleep=createButton("I am very sleepy");
 Sleep.position(810,125);
 if(Sleep.mousePressed(function(){
   gameState=4;
   database.ref('/').update({'gameState':gameState});
 }));
if(gameState===4){
  dog.addImage(bedroomImg);
  dog.scale=1;
  milk.visible=false;
  
}

var Play=createButton("Lets play !")
Play.position(700,160);
if(Play.mousePressed(function(){
  gameState=5;
  database.ref('/').update({'gameState':gameState});
}));
if(gameState===5){
  dog.addImage(livingroomImg);
  dog.scale=1;
  milk.visible=false;
   
}

var PlayInGarden=createButton("Lets play in park");
PlayInGarden.position(585,160);
if(PlayInGarden.mousePressed(function(){
gameState=6;
database.ref('/').update({'gameState':gameState});
}));
if(gameState===6){
  dog.y=175;
  dog.addImage(gardenImg);
  dog.scale=1;
  milk.visible=false;
   
}

 


   
fill(255,255,254);
textSize(15);
if (lastFed>=12) {
  text("Last Feed :"+ lastFed%12 + "PM",350,30);
}
else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}
else{
  text("Last Feed :"+ lastFed + "AM",350,30)
}
  
if(gameState!="Hungry"){
 // button .hide();
  // button.hide();
   //dog.remove();
 }
 else{
  // button.show()
   //button.show();
   dog.addImage(dogImg);
 }

  
  
 
  drawSprites();
  //add styles here
  textSize(18)
  fill("black")
  text("food Remaining = " + foodS,200,20)

  textSize(23)
  fill("black")
  text("I am your puppy bruno ",200,50) 
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

 

//function to update food stock and last fed time
//function feedDog(){
  //dog.addImage(happyDog);
  
 // if(foodObj.getFoodStock()<= 0){
   // foodObj.updateFoodStock(foodObj.getFoodStock()*0);
 // }else{
   // foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 // }
  
  //database.ref('/').update({
   // Food:foodObj.getFoodStock(),
   // FeedTime:hour()
  //})
//}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  
})

}
 
 function update(state){
   database.ref('/').update({
     gameState:state
   })
 }

 function writeStock(x){
  database.ref('/').update({
    Food:x

   })
}
 
