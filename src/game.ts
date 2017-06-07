/// <reference path="./base.ts" />


enum GameState {
    None,
    BeginGame,
    InGame,
    EndGame,
    Paused
}

class Game extends GameEngine {
    timestamp:number;
    bird:Bird;
    pipes:Array<Pipe>;
    private state:GameState;

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

    tick(delta:number) {
        let old_timestamp:number = this.timestamp;
        this.timestamp += delta;

        let pipes = [];
        if (Math.round(old_timestamp/3000) < Math.round(this.timestamp/3000)) {
            let pipe = new Pipe();
            pipes.push(pipe)
        }


        for (let pipe of this.pipes) {
            if (pipe.offset < -200) {

            } else if (pipe.checkCollision(this.bird)) {
                this.bird.reset();
                Assets.playSoundHit();
            } else {
                pipes.push(pipe);
            }
        }

        this.pipes = pipes;
        this.sprites = this.pipes.slice();
        this.sprites.push(this.bird);
    }
}
