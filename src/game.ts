/// <reference path="./base.ts" />


enum GameState {
    None,
    InGame,
    EndGame
}

class Game extends GameEngine {
    timestamp:number;
    bird:Bird;
    pipes:Array<Pipe>;
    state:GameState;
    score:number;

    constructor() {
        super();

        this.state = GameState.InGame;
        this.timestamp = 0;
        this.bird = new Bird();
        this.pipes = [];
        this.score = 0;

        this.sprites.push(this.bird);
    }

    click() {
        this.bird.jump();
       if (this.state == GameState.EndGame) {
           this.state = GameState.InGame;
       }
    }

    renderBackground(context:CanvasRenderingContext2D) {
        Assets.drawBackground(context, this.score);
    }

    
    renderForeground(context:CanvasRenderingContext2D) {
        Assets.drawScore(context, this.score);
    }

    tick(delta:number) {

        if (this.state != GameState.InGame) {
            this.bird.reset();
            return;
        }

        let old_timestamp:number = this.timestamp;
        this.timestamp += delta;

        let pipes = [];
        if (Math.round(old_timestamp/Configs.pipeInterval) < Math.round(this.timestamp/Configs.pipeInterval)) {
            //if (Math.random() > 0.1) {
                let pipe = new Pipe();
                pipes.push(pipe)
            //}
        }

        for (let pipe of this.pipes) {
            if (pipe.offset < -200) {
            } else if (pipe.checkCollision(this.bird)) {
                Assets.playSoundHit();
                this.bird.reset();
                this.score = 0;
                this.state = GameState.EndGame;
            } else {
                pipes.push(pipe);
            }
        }

        
        for (let pipe of pipes) {
            if (pipe.offset + Configs.pipeWidth + Configs.birdRadius < this.bird.offset && pipe.pass == false) {
                pipe.pass = true;
                this.score ++;
                Assets.playSoundPoint();
            }
        }
        
        if (this.bird.height - Configs.birdRadius < 0 || this.bird.height + Configs.birdRadius > Configs.height) {
            Assets.playSoundHit();
            this.bird.reset();
            this.score = 0;
            this.state = GameState.EndGame;
        }

        this.pipes = pipes;
        this.sprites = this.pipes.slice();
        this.sprites.push(this.bird);
    }
}
