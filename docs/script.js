function init() {
    window.requestAnimationFrame(loop);
}

if (data == undefined) {
    data = '[]';
}

let game = new Game();
let agent = new Agent(game);
let ai = new AiAgent(game, data);

function draw() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, Configs.width, Configs.height); // clear canvas

    ctx.imageSmoothingEnabled = false; /// future

    ctx.fillStyle = '#71c5cf';
    ctx.fillRect(0, 0, Configs.width, Configs.height);

    game.render(ctx);
}

function loop() {
    draw();
    window.requestAnimationFrame(loop);
}


var mode = "human";

setInterval(function(){ 
        if (mode != "human") {
            ai.update();
 }
 }, 50);

$(function() {


    init();
    document.getElementById("canvas").addEventListener("mousedown", function( event ) {
        if (mode == "human") {
            agent.click();
            draw();
        }
    }, false);
    document.getElementById("canvas").addEventListener('mousedown', function(e){ e.preventDefault(); }, false);

    
    $('input[type=radio][name=options]').change(function() {
        mode = this.value;
        if (mode == "train") {
            Configs.epsilon = 0.2;
        } else {
            Configs.epsilon = 0.0;
        }
        console.log(this.value);
    });
});