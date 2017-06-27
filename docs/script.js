// prepare data
if (data == undefined) {
    console.error("failed to load data.js")
    data = '[]';
}

// prepare game
let game = new Game();
let agent = new Agent(game);
let ai = new AiAgent(game, data);

/**
 * Draw canvas
 */
function draw() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, Configs.width, Configs.height); // clear canvas
    context.imageSmoothingEnabled = false;
    game.render(context);
}

/**
 * Loop with animation frame
 */
function loop() {
    draw();
    if (Configs.ai == true) {
        ai.update();
    }
    window.requestAnimationFrame(loop);
}

$(function () {
    // start the loop
    window.requestAnimationFrame(loop);

    // bind mousedown
    document.getElementById("canvas").addEventListener("mousedown", function (event) {
        if (Configs.ai == false) {
            agent.click();
            draw();
        }
    }, false);
    document.getElementById("canvas").addEventListener('mousedown', function (e) { e.preventDefault(); }, false);

    // deal with options
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