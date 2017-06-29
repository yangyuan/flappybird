class Bird implements Sprite {
    offset: number = 0;
    active: boolean;
    height: number = 0;
    velocity: number = 0;

    /**
     * Initializes a new instance of the Bird class.
     */
    constructor() {
        this.offset = Configs.birdOffset;
        this.active = false;
    }

    jump() {
        this.velocity = Configs.birdJumpSpeed;
        Assets.playSoundWing();
    }

    reset() {
        this.velocity = 0;
        this.height = Configs.height / 2;
    }

    /**
     * Tick event of Sprite.
     * @param delta the time delta in milliseconds
     */
    tick(delta: number) {
        if (!this.active) {
            return;
        }

        let velocityDelta = delta * Configs.birdGravityConstant;
        this.height += (this.velocity + (velocityDelta / 2)) * delta * Configs.birdSpeed;
        this.velocity += velocityDelta;
    }

    /**
     * Render the Sprite.
     * @param context the CanvasRenderingContext2D
     */
    render(context: CanvasRenderingContext2D) {
        Assets.drawBird(context, this.height, this.velocity);
    }
}