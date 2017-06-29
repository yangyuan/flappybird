/**
 * The Sprite of Pipe
 */
class Pipe implements Sprite {
    /**
     * Offset from the left of the screen.
     */
    offset: number;

    /**
     * Upper bound of the pipe tunnel.
     */
    upper: number;

    /**
     * Width of the pipe.
     */
    width: number;

    /**
     * Height of the pipe tunnel.
     */
    height: number;

    /**
     * If the pipe has passed the bird.
     */
    scored: boolean;

    /**
     * If there is a mario on the pipe.
     */
    mario: boolean;

    /**
     * Did mario jumped?
     */
    marioJumped: boolean;

    /**
     * Initializes a new instance of the Pipe class.
     * @param mario does the pipe include a mario or not
     */
    constructor(mario: boolean) {
        this.offset = Configs.width;
        this.width = Configs.pipeWidth;
        this.height = Configs.pipeHeight;
        this.scored = false;
        this.upper = (Math.random() * Configs.height / 2) + Configs.height / 4 - Configs.pipeHeight / 2;
        this.mario = mario;
        this.marioJumped = false;
    }

    /**
     * Tick event of Sprite.
     * @param delta the time delta in milliseconds
     */
    tick(delta: number) {
        this.offset -= delta * Configs.pipeSpeed;
    }

    /**
     * Render the Sprite.
     * @param context the CanvasRenderingContext2D
     */
    render(context: CanvasRenderingContext2D) {
        Assets.drawPipe(context, this.offset, this.upper);

        if (this.mario) {
            if (!this.marioJumped && this.offset < Configs.marioJumpOffset) {
                this.marioJumped = true;
                Assets.playSoundMarioJump();
            }
            Assets.drawMario(context, this.offset, this.upper);
        }
    }

    /**
     * Get the middle right position of the Pipe.
     */
    getAnchor(): [number, number] {
        return [this.offset + Configs.pipeWidth, this.upper + Configs.pipeHeight / 2]
    }
}