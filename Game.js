class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(1050,displayHeight-100);
    car1.addImage("car1",car1Image);
    car2 = createSprite(850,displayHeight-100);
    car2.addImage("car2",car2Image);
    car3 = createSprite(600,displayHeight-100);
    car3.addImage("car3",car3Image);
    car4 = createSprite(380,displayHeight-100);
    car4.addImage("car4",car4Image);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 250;
      var y;
      

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        

        //position the cars a little away from each other in x direction
        x = x + 200;
        console.log(car1.x);
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        car1.x = x;
        car1.y = y;

        if (index === player.index){
          fill("purple");
          ellipse(x,y,50,50);
          console.log("jkdbvf");
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>4000)
{
  gameState=2;
}
    drawSprites();
  }
  end(){
    console.log("game end");
  }
}
