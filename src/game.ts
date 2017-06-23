/// <reference path="./base.ts" />


enum GameState {
    None,
    Playing,
    Ended
}

class Game extends GameEngine {
    timestamp:number;
    bird:Bird;
    pipes:Array<Pipe>;
    state:GameState;
    score:number;

    constructor() {
        super();

        this.state = GameState.Playing;
        this.timestamp = 0;
        this.bird = new Bird();
        this.pipes = [];
        this.score = 0;

        this.sprites.push(this.bird);
    }

    endGame() {
        this.score = 0;
        this.state = GameState.Ended;
        this.pipes = [];
        this.sprites = [];
        this.bird.active = false;
        this.bird.reset();
        this.sprites.push(this.bird);
    }

    startGame() {
        this.state = GameState.Playing;
        this.bird.active = true;
    }

    click() {
        if (this.state == GameState.Ended) {
            this.startGame();
        }
        this.bird.jump();
    }

    renderBackground(context:CanvasRenderingContext2D) {
        Assets.drawBackground(context, this.score);
    }

    
    renderForeground(context:CanvasRenderingContext2D) {
        Assets.drawScore(context, this.score);
        Assets.drawFps(context, this.fps);
    }

    tick(delta:number) {

        if (this.state != GameState.Playing) {
            return;
        }

        let old_timestamp:number = this.timestamp;
        this.timestamp += delta;

        let pipes = [];
        if (Math.round(old_timestamp/Configs.pipeInterval) < Math.round(this.timestamp/Configs.pipeInterval)) {
            let pipe = new Pipe(Math.random() < Math.pow(this.score,0.5)/200);
            pipes.push(pipe)
        }

        for (let pipe of this.pipes) {
            if (pipe.offset < -200) {
            } else if (pipe.checkCollision(this.bird)) {
                Assets.playSoundHit();
                this.endGame();
                return;
            } else {
                pipes.push(pipe);
            }
        }

        
        for (let pipe of pipes) {
            if (pipe.offset + Configs.pipeWidth + Configs.birdRadius < this.bird.offset && pipe.scored == false) {
                pipe.scored = true;
                this.score ++;
                Assets.playSoundPoint();
            }
        }
        
        if (this.bird.height - Configs.birdRadius < 0 || this.bird.height + Configs.birdRadius > Configs.height) {
            Assets.playSoundHit();
            this.endGame();
            return;
        }

        this.pipes = pipes;
        this.sprites = this.pipes.slice();
        this.sprites.push(this.bird);
    }
}
