//宣言
var player = function(posx, posy, canvas) {
    this.posx         = posx;
    this.posy         = posy;
    this.canvas       = canvas;
}

//MAIN
$(function(){
	player1 = new player(250, 250, $('#player1').get(0));
	player2 = new player(250, 250, $('#player2').get(0));

	drawPlayer(player1.posx, player1.posy, player1.canvas);
	drawPlayer(player2.posx, player2.posy, player2.canvas);
	Controler();
});


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
};


function Controler(){
	$(window).keyup(function(e){
		//左が押されたとき
		if(e.keyCode == 37 && player1.posx > 40){
				player1.posx -= 45;
		}
		//右が押されたとき
		if(e.keyCode == 39 && player1.posx < 460){
			player1.posx += 45;
		}
		//上が押されたとき
		if(e.keyCode == 38 && player1.posy > 40){
			player1.posy -= 45;
		}
		//下が押されたとき
		if(e.keyCode == 40 && player1.posy < 460){
			player1.posy += 45;
		}
		//描画
		drawPlayer(player1.posx, player1.posy, player1.canvas);
	});
};