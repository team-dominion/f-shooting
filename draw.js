//宣言
// var player1 = player1 || {};
// player1.posx = 250;
// player1.posy = 250;
// var player2 = player2 || {};
// player2.posx = 250;
// player2.posy = 250;

var player = function(posx, posy) {
		this.
    this.posx = posx;
    this.posy = posy;
}

var player1 = new player(250, 250);
var player2 = new player(250, 250);

$(function(){
	drawPlayer1();
	drawPlayer2();
	Control();
	test2();
});

function test2(){
	console.log("positionTEST: " + player1.posx);
}

function drawPlayer1(){
	//プレイヤー描画
	var player = $('#player1').get(0);
	if(!player || !player1.getContext){
		return false;
	};


	var ctxPlayer1 = player.getContext('2d');
	ctxPlayer1.beginPath();
	ctxPlayer1.arc(player1.posx, player1.posy, 20, 0, Math.PI*2, false);
	ctxPlayer1.stroke();
};


function drawPlayer2(){
	//プレイヤー描画
	var player2 = $('#player2').get(0);
	if(!player2 || !player2.getContext){
		return false;
	};

	var ctxPlayer2 = player2.getContext('2d');
	ctxPlayer2.beginPath();
	ctxPlayer2.arc(70, 70, 20, 0, Math.PI*2, false);
	ctxPlayer2.stroke();
};


function Control(){
	$(window).keyup(function(e){
		//左が押されたとき
		if(e.keyCode == 37){
			player1.posx -= 1;
		}
		//右が押されたとき
		if(e.keyCode == 39){
			player1.posx += 1;
		}
		//上が押されたとき
		if(e.keyCode == 38){
			player1.posy -= 1;
		}
		//下が押されたとき
		if(e.keyCode == 40){
			player1.posy += 1;
		}
		// console.log("p1posx" + player1.posx);
		// console.log("p1posy" + player1.posy);
	});
};