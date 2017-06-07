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

    render(context:CanvasRenderingContext2D) {
        let time = new Date();
        let delta = (time.getTime() - this.time.getTime());
        if (delta > 100) { // max speed 0.005
            delta = 100;
        }

        this.tick(delta)
        for (let sprite of this.sprites) {
            sprite.tick(delta);
        }

        this.time = time;
        
        for (let sprite of this.sprites) {
            sprite.render(context);
        }
    }
}