/****************************
*    javascript draw.js 	*
*    FPSと滑らかな移動の実装   *
*****************************/


// FPS管理に使用するパラメータを定義
const FPS = 30;			    	// １秒間の描画の回数
const MSPF = 1000 / FPS;		// １フレームの時間
var set_time;                   // 1フレーム開始時の時間
var end_time;     　　　　　　　　// 1フレームにかかった時間
var count = 0;					// フレーム回数
// ...


//	キー入力のフラグ
var up_flag = 0;	//　↑ キーの入力フラグ
var down_flag = 0;	//　↓ キーの入力フラグ
var right_flag = 0;	//　→ キーの入力フラグ
var left_flag = 0;	// ← キーの入力フラグ
// ...

const  MOVE = 5;	//	移動量


// 宣言
player = function(posx, posy, canvas) {
    this.posx         = posx;	
    this.posy         = posy;
    this.canvas       = canvas;
}
// ...


// MAIN
$(function(){
	player1 = new player(250, 250, $('#player1').get(0));	//	プレイヤー１の定義
	player2 = new player(250, 250, $('#player2').get(0));	//	プレイヤー２の定義

	mainloop();
	Controler();
});


// メインループを定義
var mainloop = function() {

	//　1フレーム開始時の時間をとる
	if (count == 0) { set_time = new Date(); }

	//	フレーム数を増やす
	count++;

    // 処理開始時間を保存
    var startTime = new Date();

    //　移動処理
    move();

    // 描画処理
    redraw();

    // 処理経過時間の保存
    var deltaTime = (new Date()) - startTime;

    //　次のフレームの間隔
    // 1フレームにかかる時間 - 1処理にかかった時間
    var interval = MSPF - deltaTime;

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


//	描画関数を定義
function redraw() {

	// プレイヤー１の描画
	drawPlayer(player1.posx, player1.posy, player1.canvas);

	// プレイヤー2の描画
	drawPlayer(player2.posx, player2.posy, player2.canvas);

	end_time = new Date();

	//	1秒(1000ミリ秒)経過したら
	if (end_time - set_time >= 1000)
	 {
		//console.log("end_time = " + end_time);
		//console.log("set_time = " + set_time);
		//console.log(end_time - set_time);

		console.log(count);	// フレーム数の表示
		count = 0;			//　フレーム数のリセット
		set_time = end_time // １フレーム目の時間のセット
	}

};


//	描画処理の定義
function drawPlayer(posx, posy, canvas){
	if(!canvas || !canvas.getContext){
		console.log("false");
		return false;
	};

	var ctxCanvas = canvas.getContext('2d');
	ctxCanvas.clearRect(0,0,canvas.width,canvas.height);
	ctxCanvas.beginPath();
	ctxCanvas.arc(posx, posy, 20, 0, Math.PI*2, false);
	ctxCanvas.stroke();
	//console.log(posx);
	//console.log(posy);
};

function Controler(){

	//	キーが押されたとき？
	$(window).keydown(function(e) {

		//　← キーが押されたとき
		if (e.keyCode == 37) {
			left_flag = 1;	// ← キーフラグをオン	
		}

		//　→ キーが押されたとき
		if (e.keyCode == 39) {
			right_flag = 1;	//　→　キーフラグをオン
		}

		//　↑ キーが押されたとき
		if (e.keyCode == 38) {
			up_flag = 1;	// ↑ キーフラグをオン
		}

		//　↓ キーが押されたとき
		if (e.keyCode == 40) {
			down_flag = 1;	//　↓ キーフラグをオン
		}
	});

	// キーが離されたとき？
	$(window).keyup(function(e){

		//　← キーが押されたとき
		if (e.keyCode == 37) {
			left_flag = 0;	// ← キーフラグをオフ
		}

		//　→ キーが押されたとき
		if (e.keyCode == 39) {
			right_flag = 0; //　→　キーフラグをオフ
		}

		//　↑ キーが押されたとき
		if (e.keyCode == 38) {
			up_flag = 0;	// ↑ キーフラグをオフ
		}

		//　↓ キーが押されたとき
		if (e.keyCode == 40) {
			down_flag = 0;	//　↓ キーフラグをオフ
		}
	});

};

//	移動処理
function move() {

	/*
	*	更新できる場所であるか
	*	フラグがオンになっているか
	*	MOVE ... 移動量
	*/
	
	if (left_flag == 1 && player1.posx > 40) {
		 player1.posx -= MOVE;
	}

	if (right_flag == 1 && player1.posx < 460) {
		player1.posx += MOVE;
	}

	if (up_flag == 1 && player1.posy > 40) {
		player1.posy -= MOVE;
	}

	if (down_flag == 1 && player1.posy < 460) {
		player1.posy += MOVE;
	}

};