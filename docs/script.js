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
    if (Configs.ai == true) {
        ai.update();
    }
    window.requestAnimationFrame(loop);
}



setInterval(function () {
    if (Configs.ai == true) {
        //ai.update();
    }
}, Configs.agentInterval);

$(function () {


    init();
    document.getElementById("canvas").addEventListener("mousedown", function (event) {
        if (Configs.ai == false) {
            agent.click();
            draw();
        }
    }, false);
    document.getElementById("canvas").addEventListener('mousedown', function (e) { e.preventDefault(); }, false);


    $('input[type=radio][name=options]').change(function () {
        switch (this.value) {
            case "play":
                Configs.ai = false;
                Configs.learn = false;
                Configs.epsilon = 0.0;
                break;
            case "auto":
                Configs.ai = true;
                Configs.learn = false;
                Configs.epsilon = 0.0;
                break;
            case "train":
                Configs.ai = true;
                Configs.learn = true;
                Configs.epsilon = 0.2;
                break;
        }
    });
});