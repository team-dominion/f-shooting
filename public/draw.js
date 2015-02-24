//***************************************
//
// Fugishige_shooting
// http://team-dominion.com/
//
//***************************************

/* player */
var MOVE = 20;

/* bullet */
var bullet_flag = false; 
var bullet_number = 5;
var bullet_speed = 10;
var nextbullet = 0;

/* fps-parameter */
var FPS  = 30;
var MSPF = 1000 / FPS;
var count  = 0;
var set_time;
var end_time;

var start_time;
var delta_time;
var interval;

/*charge*/
var charge_flag = false;
var charge_number = 3;
var charge_time = 0;

/* input_key_flag */
var up_flag    = false;
var down_flag  = false;
var right_flag = false;
var left_flag  = false;

/* definition */
player = function(posx, posy, userid, hostid, state) {
    this.posx   = posx;
    this.posy   = posy;
    this.userid = userid;
    this.hostid = hostid;
    this.state  = state;  //wait, host, join, play, dead
}
bullet = function(posx, posy) {
  this.posx = posx;
  this.posy = posy;
}

/*=============================================================================================*/
$(function(){
  /* canvas */
  playGround = $('#play-ground').get(0);
  ctxCanvas  = playGround.getContext('2d');

  player1 = new player(250, 250);
  player2 = new player(750, 250);

  for(i=0;i<bullet_number;i++){
    bullet[i] = new bullet(0, 0,false);
  };

  //Connect();
  mainloop();
  Controler();
});

/*=============================================================================================*/
var mainloop = function() {

  /* frame_config */
  if (count === 0) {
    set_time = new Date(); 
  }

  start_time = new Date();

  /* frame_start */
  update();
  draw();
  //sendPosition();
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
  for(i=0;i<bullet_number;i++){
    if (bullet[i].bullet_flag) { 
      drawBullet(bullet[i].posx, bullet[i].posy)
    };
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
    if (e.keyCode === 37 && !left_flag) {
      left_flag = true;
    }

    // → キー
    if (e.keyCode === 39 && !right_flag) {
      right_flag = true;
    }

    // ↑ キー
    if (e.keyCode === 38 && !up_flag) {
      up_flag = true;
    }

    // ↓ キー
    if (e.keyCode === 40 && !down_flag) {
      down_flag = true;
    }

    if(!charge_flag){

      //c キー
      if(e.keyCode == 67){
        charge_flag = true;
        charge_number++;
        console.log(charge_flag);
      }

      /* 弾が装填されていて、spacekeyが押されたとき*/
      if (e.keyCode == 90 && charge_number > 0) {

        for (i=0;i<bullet_number;i++){
          console.log("bullet_"+i);

          if(!bullet[i].bullet_flag){
            bullet[i].bullet_flag = true;
            console.log("shot");

            /* 発射位置取得 */
            bullet[i].posx = player1.posx;
            bullet[i].posy = player1.posy;
            charge_number--;

            break;
          }
        }
      }
    }
  };

  onKeyUp = function(e){

    // ← キー
    if (e.keyCode === 37) {
      left_flag = false;  
    }

    // → キー
    if (e.keyCode === 39) {
      right_flag = false; 
    }

    // ↑ キー
    if (e.keyCode === 38) {
      up_flag = false;  
    }

    // ↓ キー
    if (e.keyCode === 40) {
      down_flag = false;  
    }
  };

  document.addEventListener("keydown", onKeyDown, false);
  document.addEventListener("keyup", onKeyUp, false);
};

/*=============================================================================================*/
function update() {
  /* プレイヤーの更新 */

  Charge();
  if(!charge_flag){
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
  }
  /* 弾の更新 */
  for(i=0;i<bullet_number;i++){
    if (bullet[i].bullet_flag && bullet[i].posx <= 1000) {
      bullet[i].posx += bullet_speed * 10;
    } else {
      bullet[i].bullet_flag = false;
    }
  }

};

/*=============================================================================================*/
function Connect(){
  var socket = io.connect();
  player1.userid = socket.id;
  player1.state = 'wait';

  sendPosition = function(){
    socket.emit('send_position', player1);
  }

  socket.on('connect', function() {
    socket.on('receive_position', function(data){
      player2.posx = data.posx + 500;
      player2.posy = data.posy;
      $("#position").text("POSX: " + player2.posx + ", POSY: " + player2.posy);
    });

    $("#userid").text(player1.userid);
  });
};

function Charge (){

  if(charge_flag){
  charge_time++;
  }
  if(charge_time >= 15){
    charge_time = 0;
    charge_flag = false;
  }
}