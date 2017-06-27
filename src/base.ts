interface Sprite {
    tick(delta: number);
    render(context: CanvasRenderingContext2D);
}

abstract class GameEngine {
    protected sprites: Array<Sprite>;
    private time: Date;
    public fps: number;

    constructor() {
        this.sprites = [];
        this.time = new Date();
        this.fps = Configs.fps;
    }

    abstract tick(delta: number);
    abstract renderBackground(context: CanvasRenderingContext2D);
    abstract renderForeground(context: CanvasRenderingContext2D);

    render(context: CanvasRenderingContext2D) {
        let time = new Date();
        let delta = (time.getTime() - this.time.getTime());

        this.fps = this.fps * 0.95 + 1 / delta * 0.05 * 1000

        this.internalTick(delta);

        this.time = time;

        this.renderBackground(context);
        for (let sprite of this.sprites) {
            sprite.render(context);
        }
        this.renderForeground(context);
    }

    private internalTick(delta: number) {
        let standardDelta = Math.round(1000 / Configs.fps);
        if (delta > standardDelta + Configs.intervalDelta) {
            delta = standardDelta + Configs.intervalDelta;
        }

        if (delta < standardDelta - Configs.intervalDelta && Configs.ai) {
            delta = standardDelta - Configs.intervalDelta;
        }

        for (let sprite of this.sprites) {
            sprite.tick(delta);
        }
        this.tick(delta)
    }

    emulate(delta: number) {
        this.internalTick(delta);
    }
}