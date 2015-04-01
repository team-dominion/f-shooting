/*
*
* Fugishige_shooting
* http://team-dominioon.com
*
*/

/* 定数 */
var RADIUS = 20;
var SPEED  = 10;
var EXTRA  = SPEED / 2;
var FPS = 30;
var MFPS = 1000 / FPS;

/*
* direction
* 方向キーの押下の取得
* 　　index
*  　　 0 : key_up
*   　　1 : key_right
*   　　2 : key_down
*   　　3 : key_left
*   state
*     true  : onKeyDown
*     false : onKeyUp
*/
var direction = [false, false, false, false];
/*
* keys
* キーの押下の取得
* 　　index
*  　　 0 : z_key
*   　　1 : x_key
*   　　2 : c_key
*   state
*     true  : onKeyDown
*     false : onKeyUp
*/
var keys = [false, false, false];
/*
* プレイヤー
*   posx   : x座標
*   posy   : y座標
*   userid :
*   hostid :
*   state  :
*/
PlayerState = function(posx, posy, userid, hostid, state) {
  this.posx = posx;
  this.posy = posy;
  this.userid = userid;
  this.hostid = hostid;
  /*
  * state
  *   wait :
  *   host :
  *   join :
  *   play :
  *   dead :
  */
  this.state = state;
};
/*
* プレイヤーの状態
*   positionX : x座標初期位置
*   positionY : y座標初期位置
*   velocityX : xの初速度
*   velocityY : yの初速度
*   radius    : 半径
*/
Player = function(positionX, positionY, velocityX, velocityY, radius) {
  this.positionX = positionX;
  this.positionY = positionY;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
  this.radius    = radius;
};
/* Main */
$(function(){
  /* キャンバス */
  playGround = $('#play-ground').get(0);
  ctxCanvas  = playGround.getContext('2d');

  /* プレイヤーのインスタンス */
  player1 = new PlayerState((playGround.width - playGround.width / 2) / 2, playGround.height / 2);
  player2 = new PlayerState((playGround.width + playGround.width / 2) / 2, playGround. height / 2);

  first_player = new Player(player1.posx, player1.posy, 0, 0, RADIUS);
  second_player = new Player(player2.posx, player2.posy, 0, 0, RADIUS);

  /* */
  Connect();
  mainLoop();
  controler();
});

function mainLoop() {
  var start_time = new Date();

  update();
  draw();

  var delt_time = (new Date()) - start_time;
  var interval = MFPS - delt_time;
  if (interval > 0) {
    setTimeout(mainLoop, interval);
  }
  else {
    setTimeout(mainLoop, 0);
  }
};

function controler() {
  /* キーを押したかの判定 */
  onKeyDown = function(e) {
    switch(e.keyCode) {
      case 37: // 右
        direction[3] = true;
        break;
      case 38: // 左
        direction[0] = true;
        break;
      case 39: // 上
        direction[1] = true;
        break;
      case 40: // 下
        direction[2] = true;
        break;

      case 67: // c
        keys[2] = true;
        break;
      case 88: // x
        keys[1] = true;
        break;
      case 90: // z
        keys[0] = true;
        break;
    }
  };
  /* キーを離したかの判定 */
  onKeyUp = function(e) {
    switch(e.keyCode) {
      case 37: // 左
        direction[3] = false;
        break;
      case 38: // 上
        direction[0] = false;
        break;
      case 39: // 右
        direction[1] = false;
        break;
      case 40: // 下
        direction[2] = false;
        break;

      case 67: // c
        keys[2] = false;
        break;
      case 88: // x
        keys[1] = false;
        break;
      case 90: // z
        keys[0] = false;
        break;
    }
  };
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);  
}
/*=== update =============================================================================*/
function update() {
  /* スピードテスト（デバッグ）用 */
  first_player.velocityX = 0;
  first_player.velocityY = 0;

  updateFirstPlayer();
  /* 更新 */
  updatePlayerConection();
};

function updateFirstPlayer() {
  updateFirstPlayerSpeed();

  first_player.positionX += first_player.velocityX;
  first_player.positionY += first_player.velocityY;

  if (first_player.positionX - first_player.radius < 0) {
    first_player.positionX = first_player.radius;
  }
  else if (first_player.positionX + first_player.radius > playGround.width / 2) {
    first_player.positionX = (playGround.width / 2) - first_player.radius;
  }
  if (first_player.positionY - first_player.radius < 0) {
    first_player.positionY = first_player.radius;
  }
  else if (first_player.positionY + first_player.radius > playGround.width / 2) {
    first_player.positionY = playGround.height - first_player.radius;
  }
};

function updateFirstPlayerSpeed() {
  for (var i = 0; i < 4; i++) {
    if (direction[i] == true) {
      switch(i) {
        case 0:
          first_player.velocityY = -SPEED;
          break;
        case 2:
          first_player.velocityY =  SPEED;
          break;
        case 3:
          first_player.velocityX = -SPEED;
          break;
        case 1:
          first_player.velocityX =  SPEED;
          break;
      }
    }
  }
};

function updatePlayerConection() {
  player1.posx = first_player.positionX;
  player1.posy = first_player.positionY;
  player2.posx = second_player.positionX;
  player2.posy = second_player.positionY;
};
/*=== update_end =========================================================================*/
/*=== draw ===============================================================================*/
function draw() {
  /* リセット */
  ctxCanvas.clearRect(0, 0, playGround.width, playGround.height);

  /* 画面の準備 */
  ctxCanvas.beginPath();
  ctxCanvas.moveTo(playGround.width / 2, 0);
  ctxCanvas.lineTo(playGround.width / 2, playGround.height);
  ctxCanvas.font = '20px Arial';
  ctxCanvas.fillText('TEST', 5, 25);
  ctxCanvas.stroke();

  /* */
  drawPlayer(first_player.positionX, first_player.positionY);
  drawPlayer(second_player.positionX, second_player.positionY);
};

function drawPlayer(posx, posy) {
  if (!playGround || !playGround.getContext) {
    console.log('drawPlayer_failed');
    return false;
  };
  ctxCanvas.beginPath();
  ctxCanvas.arc(posx, posy, RADIUS, 0, Math.PI * 2, false);
  ctxCanvas.stroke();
};
/*=== draw_end ===========================================================================*/
function Connect(){

  if (typeof io === 'undefined') {
    console.log('connetion failed');
    return;
  }

  var socket = io.connect();
  player1.userid = socket.id;
  player1.state = 'wait';

  sendPosition = function(){
    socket.emit('send_position', player1);
  };

  socket.on('connect', function() {
    socket.on('receive_position', function(data){
      player2.posx = data.posx + 500;
      player2.posy = data.posy;
      $('#position').text('POSX: ' + player2.posx + ', POSY: ' + player2.posy);
    });

    $('#userid').text(player1.userid);
  });
};