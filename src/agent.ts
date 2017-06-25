/**
 * The base class for Agents.
 * Wrap and hide the game information from agents.
 */
class BaseAgent {
    /**
     * The game.
     */
    private game: Game;

    /**
     * Initializes a new instance of the BaseAgent class.
     * @param game the game instance
     */
    constructor(game: Game) {
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
        for (let pipe of this.game.pipes) {
            let tmp = pipe.getAnchor();
            if (tmp[0] > Configs.birdOffset - Configs.birdRadius) {
                if (anchor == null || anchor[0] > tmp[0]) {
                    anchor = tmp;
                }
            }
        }

        if (anchor == null) {
            anchor = [Configs.width + Configs.pipeWidth, Configs.height / 2];
        }

        return [anchor[0] - Configs.birdOffset, anchor[1] - this.game.bird.height];
    }

    protected isAlive() {
        if (this.game.state == GameState.Ended) {
            return false;
        } else {
            return true;
        }
    }
}

/**
 * The default agent for human to play games.
 */
class Agent extends BaseAgent {

    /**
     * Initializes a new instance of the Agent class.
     * @param game the game instance
     */
    constructor(game: Game) {
        super(game);
    }
}