class Food{
  constructor(){
this.image=loadImage('images/Milk.png');
 


 


  }   

  washroom(){
    background(washroomImg,600,600)
  }

  display(){

   image(this.image,740,180,70,70)



    fill("red")
   
    var button=createButton("Feed the Dog");
    button.position(500,125);

    if(button.mousePressed(function(){
       foodS=foodS-1; 
       gameState=1;
       database.ref('/').update({'gameState':gameState});
    }));
    
    var addFood=createButton("Add Food");
    addFood.position(599,125);

    if(addFood.mousePressed(function(){
      foodS=foodS+1;
      gameState=2;
      database.ref('/').update({'gameState':gameState});
    }));
  }
}