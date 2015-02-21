//***************************************
//
// Fugishige_shooting
// http://team-dominion.com/
//
//***************************************

/* player */
const MOVE = 5;

/* bullet */
var bullet_flag = false;  
var bulett_number = 5;
var nextbullet = 0;

/* canvas */
var playGround = $('#play-ground').get(0);
var ctxCanvas = playGround.getContext('2d');

/* fps-parameter */
const FPS = 30;
const MSPF = 1000 / FPS;
var set_time;
var end_time;
var count = 0;

var start_time;
var delta_time;
var interval;

/* input_key_flag */
var up_flag   = false;
var down_flag   = false;
var right_flag   = false;
var left_flag   = false;

/* definition */
player = function(posx, posy) {
    this.posx = posx;
    this.posy = posy;
}
bullet = function(posx, posy) {
  this.posx = posx;
  this.posy = posy;
}

/*=============================================================================================*/
$(function(){
  var player1 = new player(250, 250);
  var player2 = new player(750, 250);

  for(i=0;i<bulett_number;i++){
    bullet[i] = new bullet(0, 0,false);
  }

  Connect();
  mainloop();
  Controler();
});

/*=============================================================================================*/
var mainloop = function() {

  /* frame_config */
  if (count == 0) {
    set_time = new Date(); 
  }

  start_time = new Date();

  /* frame_start */
  update();
  draw();
  sendPosition();
  /* frame_end */

  delta_time = (new Date()) - start_time;
  interval = MSPF - delta_time;


  // 1フレームの時間が残っていたら
  if(interval > 0) {
    setTimeout(mainloop, interval);
  } else {
    setTimeout(mainloop, MSPF + interval);
  }

};

/*=============================================================================================*/
function draw() {
  /* reset */
  ctxCanvas.clearRect(0,0,playGround.width,playGround.height);

  /* draw player */
  drawPlayer(player1.posx, player1.posy);
  drawPlayer(player2.posx, player2.posy);

  /* bullet */
  if (bullet_flag) {
    drawBullet(_bullet.posx, _bullet.posy);
  }

  end_time = new Date();
};

function drawBullet(posx, posy) {
  if(!playGround || !playGround.getContext){
    console.log("drawBullet_false");
    return false;
  };

  ctxCanvas.beginPath();
  ctxCanvas.arc(posx, posy, 10, 0, Math.PI * 2, false);
  ctxCanvas.stroke();
};

function drawPlayer(posx, posy){
  if(!playGround || !playGround.getContext){
    console.log("drawPlayer_false");
    return false;
  };

  ctxCanvas.beginPath();
  ctxCanvas.arc(posx, posy, 20, 0, Math.PI*2, false);
  ctxCanvas.stroke();
};

/*=============================================================================================*/
function Controler(){

  onKeyDown = function(e) {
    // ← キー
    if (e.keyCode == 37 && !left_flag) {
      left_flag = true;
    }

    // → キー
    if (e.keyCode == 39 && !right_flag) {
      right_flag = true;
    }

    // ↑ キー
    if (e.keyCode == 38 && !up_flag) {
      up_flag = true;
    }

    // ↓ キー
    if (e.keyCode == 40 && !down_flag) {
      down_flag = true;
    }


    /* 弾が装填されていて、spacekeyが押されたとき*/
    if (e.keyCode == 90) {

      for (i=0;i<bulett_number;i++){
        console.log("bullet_"+i);

        if(!bullet[i].bullet_flag){
          bullet[i].bullet_flag = true;
          console.log("shot");

          /* 発射位置取得 */
          bullet[i].posx = player1.posx;
          bullet[i].posy = player1.posy;

          break;
        }
      }
    }

  };

  onKeyUp = function(e){

    // ← キー
    if (e.keyCode == 37) {
      left_flag = false;  
    }

    // → キー
    if (e.keyCode == 39) {
      right_flag = false; 
    }

    // ↑ キー
    if (e.keyCode == 38) {
      up_flag = false;  
    }

    // ↓ キー
    if (e.keyCode == 40) {
      down_flag = false;  
    }

  };

  document.addEventListener("keydown", onKeyDown, false);
  document.addEventListener("keyup", onKeyUp, false);

};

/*=============================================================================================*/
function update() {
  /* プレイヤーの更新 */
  if (left_flag && player1.posx > 40) {
    player1.posx -= MOVE;
  }

  if (right_flag && player1.posx < 460) {
    player1.posx += MOVE;
  }

  if (up_flag && player1.posy > 40) {
    player1.posy -= MOVE;
  }

  if (down_flag && player1.posy < 460) {
    player1.posy += MOVE;
  }

  /* 弾の更新 */
  for(i=0;i<bulett_number;i++){
    if (bullet[i].bullet_flag && bullet[i].posx <= 1000) {
      bullet[i].posx += MOVE * 10;
    } else {
      bullet[i].bullet_flag = false;
    }
  }

};

/*=============================================================================================*/
function Connect(){
  var socket = io.connect();

  var sendPosition = function(){
    socket.emit('send_position', player1);
  }

  socket.on('connect', function() {
    socket.on('receive_position', function(data){
      player2.posx = data.posx + 500;
      player2.posy = data.posy;
      $("#position").text("POSX: " + player2.posx + ", POSY: " + player1.posy);
    });

    $("#userid").text(socket.id);
  });
};