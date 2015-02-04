/*************************
*   Fugishige_shooting   *
*************************/

/* player_speed */
const  MOVE = 5;

/* fps-parameter */
const FPS = 30;			    // １秒間の描画の回数
const MSPF = 1000 / FPS;	// １フレームの時間
var set_time;               // 1フレーム開始時の時間
var end_time;     　　　　　　　	// 1フレームにかかった時間
var count = 0;				// フレーム回数

var start_time;				//フレーム開始時の時間
var delta_time;				//1フレームにかかった時間
var interval;  				//1フレームの時間 - 1フレームにかかった時間

/* input_key_flag */
var up_flag 	= false;	
var down_flag 	= false;	
var right_flag 	= false;	
var left_flag 	= false;

/* */
var bullet_flag = false;	

/* playerの定義 */
player = function(posx, posy) {
    this.posx         = posx;	
    this.posy         = posy;
}

bullet = function(posx, posy) {
	this.posx = posx;
	this.posy = posy;
}



/*=============================================================================================*/

/* MAIN */
$(function(){
	// canvas定義
	playGround = $('#play-ground').get(0);
	ctxCanvas = playGround.getContext('2d');

	// プレイヤー定義
	player1 = new player(250, 250);
	player2 = new player(750, 250);
	_bullet = new bullet(0, 0);

	Connect();
	mainloop();
	Controler();
});

/* main_loop */
var mainloop = function() {

	/* frame_config */
	if (count == 0) { set_time = new Date(); }

	/*--------------------------------------------------*/
    start_time = new Date();
    /* frame_start */
    update();	//更新
    draw();		//描画
    sendPosition();


    /* frame_end */
    delta_time = (new Date()) - start_time;
    interval = MSPF - delta_time;
	/*--------------------------------------------------*/

    // 1フレームの時間が残っていたら
    if(interval > 0) 
    {
        // 処理が早すぎるので次のループまで少し待つ
        setTimeout(mainloop, interval);
    } 
    else 
    {
        // 処理が遅すぎるので即次のループを実行する
        // mainloop();

        // 処理が遅すぎるので、次のフレームを休止させる
        // intarvalは1フレームにかかる時間を超えてしまった分の数(マイナス)
        setTimeout(mainloop, MSPF + interval);
        // count++;
    }

};

/* 描画 */
function draw() {

	/* reset */
	ctxCanvas.clearRect(0,0,playGround.width,playGround.height);

	// プレイヤーの描画
	drawPlayer(player1.posx, player1.posy);
	drawPlayer(player2.posx, player2.posy);

	/* 弾 */
	if (bullet_flag) { drawBullet(_bullet.posx, _bullet.posy); }

	end_time = new Date();

	/*
	if (end_time - set_time >= 1000)
	 {
		//console.log("end_time = " + end_time);
		//console.log("set_time = " + set_time);
		//console.log(end_time - set_time);

		console.log(count);	// フレーム数の表示
		count = 0;			//　フレーム数のリセット
		set_time = end_time // １フレーム目の時間のセット
	}
	*/

};

function drawBullet(posx, posy) {
		if(!playGround || !playGround.getContext){
		console.log("false");
		return false;
	};

	ctxCanvas.beginPath();
	ctxCanvas.arc(posx, posy, 10, 0, Math.PI * 2, false);
	ctxCanvas.stroke();
}

/* players_draw */
function drawPlayer(posx, posy){
	if(!playGround || !playGround.getContext){
		console.log("false");
		return false;
	};

	ctxCanvas.beginPath();
	ctxCanvas.arc(posx, posy, 20, 0, Math.PI*2, false);
	ctxCanvas.stroke();
	
};

/* */
function Controler(){

	//	キーが押されたとき
	onKeyDown = function(e) {

		//　← キー
		if (e.keyCode == 37 && !left_flag) {
			left_flag = true;
			console.log("hidari");
		}

		//　→ キー
		if (e.keyCode == 39 && !right_flag) {
			right_flag = true;
			console.log("migi");
		}

		//　↑ キーが
		if (e.keyCode == 38 && !up_flag) {
			up_flag = true;	
			console.log("ue");
		}

		//　↓ キー
		if (e.keyCode == 40 && !down_flag) {
			down_flag = true;
			console.log("sita")	
		}


		/* 弾が装填されていて、spacekeyが押されたとき*/
		if (e.keyCode == 32 && !bullet_flag) {
			bullet_flag = true;	//弾発射

			console.log("spac");
			/* 発射位置取得 */
			_bullet.posx = player1.posx;
			_bullet.posy = player1.posy;
		}
	};

	// キーが離されたとき
	onKeyUp = function(e){

		//　← キー
		if (e.keyCode == 37) {
			left_flag = false;	
		}

		//　→ キー
		if (e.keyCode == 39) {
			right_flag = false; 
		}

		//　↑ キー
		if (e.keyCode == 38) {
			up_flag = false;	
		}

		//　↓ キー
		if (e.keyCode == 40) {
			down_flag = false;	
		}

	};

	document.addEventListener("keydown", onKeyDown, false);
	document.addEventListener("keyup", onKeyUp, false);

};


/* */
function update() {

	/*
	*	更新できる場所であるか
	*	フラグがオンになっているか
	*	MOVE ... 移動量
	*/
	
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
	if (bullet_flag && _bullet.posx <= 1000) {
		_bullet.posx += MOVE * 10;
	} else { bullet_flag = false; }

};

function Connect(){
	var socket = io.connect();

	socket.on('connect', function() {
	    socket.emit('set name', 'rauchg');
	    socket.on('ready', function (msg) {
	    	socket.emit('get name');
	    });
	    socket.on('name', function (name) {
			console.log('name is', name);
	    });
	});
	socket.on('receive_position', function(data){
		$("#position").text("POSX: " + data.posx + ", POSY: " + data.posy);
	});

	sendPosition = function(){
		socket.emit('send_position', player1);
	}
}