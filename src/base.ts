interface Sprite {
    tick(delta:number);
    render(context:CanvasRenderingContext2D);
}

abstract class GameEngine {
    protected sprites:Array<Sprite>;
    private time:Date;

    constructor() {
        this.sprites = [];
        this.time = new Date();
    }

    abstract tick(delta:number);
    abstract renderBackground(context:CanvasRenderingContext2D);
    abstract renderForeground(context:CanvasRenderingContext2D);

    render(context:CanvasRenderingContext2D) {
        let time = new Date();
        let delta = (time.getTime() - this.time.getTime());
        if (delta > 100) {
            delta = 100;
        }
        
        if (delta < 15) {
            delta = 15;
        }

        this.tick(delta)
        for (let sprite of this.sprites) {
            sprite.tick(delta);
        }

        this.time = time;
        
        this.renderBackground(context);
        for (let sprite of this.sprites) {
            sprite.render(context);
        }
        this.renderForeground(context);
    }

    emulate(delta:number) {
        this.tick(delta)
        for (let sprite of this.sprites) {
            sprite.tick(delta);
        }
    }
}