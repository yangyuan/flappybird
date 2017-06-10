class BaseAgent {
    private game:Game;

    constructor(game:Game) {
        this.game = game;
    }

    click() {
        this.game.click();
    }
    protected getScore() {
        return this.game.score;
    }

    protected getBirdHeight() {
        return this.game.bird.height;
    }

    protected getBirdVelocity() {
        return this.game.bird.velocity;
    }

    protected getPipeRelativePosition() {
        let anchor = null;
        for(let pipe of this.game.pipes) {
            let tmp = pipe.getAnchor();
            if (tmp[0] > Configs.birdOffset) {
                if (anchor == null || anchor[0] > tmp[0]) {
                    anchor = tmp;
                }
            }
        }

        if (anchor == null) {
            anchor = [Configs.width, Configs.height/2];
        }

        return [anchor[0] - Configs.birdOffset, anchor[1] - this.game.bird.height];
    }

    protected isAlive() {
        if (this.game.state == GameState.EndGame) {
            return false;
        } else {
            return true;
        }
    }
}

class Agent extends BaseAgent {
    constructor(game:Game) {
        super(game);
    }
}