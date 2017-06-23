class Bird implements Sprite {
    offset:number = 0;
    active:boolean;
    height:number = 0;
    velocity:number = 0;

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
        this.height = Configs.height/2;
    }

    tick(delta:number) {
        if (!this.active) {
            return;
        }
        
        let velocityDelta = delta * Configs.birdGravityConstant;
        this.height += (this.velocity + (velocityDelta / 2)) * delta * Configs.birdSpeed; 
        this.velocity += velocityDelta;
    }

    render(context:CanvasRenderingContext2D) {
        var radius = Configs.birdRadius;

        //context.beginPath();
        //context.arc(300, this.height, radius, 0, 2 * Math.PI, false);
        //context.fillStyle = 'yellow';
        //context.fill();
        //context.lineWidth = 5;
        //context.strokeStyle = '#003300';
        //context.stroke();

        Assets.drawBird(context, this.height, this.velocity);
    }
}