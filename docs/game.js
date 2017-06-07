class BaseAgent {
    constructor(game) {
        this.game = game;
    }
    click() {
        this.game.click();
    }
    getBirdHeight() {
        return this.game.bird.height;
    }
    getBirdVelocity() {
        return this.game.bird.velocity;
    }
}
class Agent extends BaseAgent {
    constructor(game) {
        super(game);
    }
}
class AiAgent extends BaseAgent {
    constructor(game) {
        super(game);
        this.ai = new QLearning();
    }
    update() {
        let action = this.ai.getPolicy(this.getBirdHeight(), this.getBirdVelocity());
        if (action) {
            this.click();
        }
    }
}
class QLearning {
    constructor() {
        this.values = new Map();
    }
    update(birdHeight, birdVelocity, action) {
    }
    getQValue(state, action) {
        // will return 0 if key not exists
        let key = [0, 0, false];
        key[0] = state[0];
        key[1] = state[1];
        key[2] = action;
        if (this.values.has(key)) {
            return this.values.get(key);
        }
        return 0;
    }
    computeValueFromQValues(state) {
        var qValueTrue = this.getQValue(state, true);
        var qValueFalse = this.getQValue(state, false);
        return Math.max(qValueTrue, qValueFalse, 0);
    }
    computeActionFromQValues(state) {
        var qValueTrue = this.getQValue(state, true);
        var qValueFalse = this.getQValue(state, false);
        if (qValueFalse > qValueTrue) {
            return false;
        }
        if (qValueFalse < qValueTrue) {
            return true;
        }
        return Math.random() < 0.5;
        // TODO: random choose when equal
    }
    getAction(state) {
        Math.random();
        if (Util.flipCoin(Configs.epsilon)) {
            return Math.random() < 0.5;
        }
        else {
            return this.computeActionFromQValues(state);
        }
    }
    getPolicy(birdHeight, birdVelocity) {
        let state = [birdHeight, birdVelocity];
        console.log(state);
        return this.computeActionFromQValues(state);
    }
    getValue(state) {
        return this.computeValueFromQValues(state);
    }
}
var Assets;
(function (Assets) {
    var sfx_wing = new Audio('assets/sfx_wing.ogg');
    var sfx_hit = new Audio('assets/sfx_hit.ogg');
    function playSoundWing() {
        sfx_wing.play();
    }
    Assets.playSoundWing = playSoundWing;
    function playSoundHit() {
        sfx_hit.play();
    }
    Assets.playSoundHit = playSoundHit;
})(Assets || (Assets = {}));
class GameEngine {
    constructor() {
        this.sprites = [];
        this.time = new Date();
    }
    render(context) {
        let time = new Date();
        let delta = (time.getTime() - this.time.getTime());
        if (delta > 100) {
            delta = 100;
        }
        this.tick(delta);
        for (let sprite of this.sprites) {
            sprite.tick(delta);
        }
        this.time = time;
        for (let sprite of this.sprites) {
            sprite.render(context);
        }
    }
}
class Bird {
    constructor() {
        this.offset = 0;
        this.height = 0;
        this.velocity = 0;
        this.offset = Configs.birdOffset;
    }
    jump() {
        this.velocity = Configs.birdJumpSpeed;
        Assets.playSoundWing();
    }
    reset() {
        this.velocity = 0;
        this.height = Configs.height / 2;
    }
    tick(delta) {
        this.velocity += delta * Configs.birdGravityConstant;
        this.height += this.velocity;
    }
    render(context) {
        var radius = Configs.birdRadius;
        context.beginPath();
        context.arc(300, this.height, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'yellow';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
    }
}
var Configs;
(function (Configs) {
    Configs.epsilon = 0.5;
    Configs.width = 900;
    Configs.height = 600;
    Configs.pipeWidth = 100;
    Configs.pipeHeight = 200;
    Configs.pipeSpeed = 0.25;
    Configs.birdOffset = 300;
    Configs.birdJumpSpeed = -12;
    Configs.birdGravityConstant = 0.036;
    Configs.birdRadius = 30;
})(Configs || (Configs = {}));
/// <reference path="./base.ts" />
var GameState;
(function (GameState) {
    GameState[GameState["None"] = 0] = "None";
    GameState[GameState["BeginGame"] = 1] = "BeginGame";
    GameState[GameState["InGame"] = 2] = "InGame";
    GameState[GameState["EndGame"] = 3] = "EndGame";
    GameState[GameState["Paused"] = 4] = "Paused";
})(GameState || (GameState = {}));
class Game extends GameEngine {
    constructor() {
        super();
        this.state = GameState.InGame;
        this.timestamp = 0;
        this.bird = new Bird();
        this.pipes = [];
        this.sprites.push(this.bird);
    }
    click() {
        this.bird.jump();
    }
    tick(delta) {
        let old_timestamp = this.timestamp;
        this.timestamp += delta;
        let pipes = [];
        if (Math.round(old_timestamp / 3000) < Math.round(this.timestamp / 3000)) {
            let pipe = new Pipe();
            pipes.push(pipe);
        }
        for (let pipe of this.pipes) {
            if (pipe.offset < -200) {
            }
            else if (pipe.checkCollision(this.bird)) {
                this.bird.reset();
                Assets.playSoundHit();
            }
            else {
                pipes.push(pipe);
            }
        }
        this.pipes = pipes;
        this.sprites = this.pipes.slice();
        this.sprites.push(this.bird);
    }
}
class Pipe {
    constructor() {
        this.offset = Configs.width;
        this.width = Configs.pipeWidth;
        this.height = Configs.pipeHeight;
        this.upper = (Math.random() * Configs.height / 2) + Configs.height / 4 - Configs.pipeHeight / 2;
    }
    tick(delta) {
        this.offset -= delta * Configs.pipeSpeed;
    }
    render(context) {
        context.beginPath();
        context.rect(this.offset, 0, this.width, this.upper);
        context.rect(this.offset, this.upper + this.height, this.width, Configs.height);
        context.fillStyle = 'green';
        context.fill();
    }
    checkCollision(bird) {
        if (bird.offset + Configs.birdRadius > this.offset && bird.offset - Configs.birdRadius < this.offset + this.width) {
            if (bird.height - Configs.birdRadius < this.upper || bird.height + Configs.birdRadius > this.upper + this.height) {
                console.log(bird.height);
                console.log(this.upper);
                console.log(this.upper + this.height);
                return true;
            }
        }
        return false;
    }
}
class Util {
    static flipCoin(epsilon) {
        if (Math.random() < epsilon) {
            return true;
        }
        return false;
    }
}
