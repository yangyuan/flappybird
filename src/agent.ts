class BaseAgent {
    private game:Game;

    constructor(game:Game) {
        this.game = game;
    }

    click() {
        this.game.click();
    }

    protected getBirdHeight() {
        return this.game.bird.height;
    }

    protected getBirdVelocity() {
        return this.game.bird.velocity;
    }
}

class Agent extends BaseAgent {
    constructor(game:Game) {
        super(game);
    }
}