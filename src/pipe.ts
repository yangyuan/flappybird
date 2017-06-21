class Pipe implements Sprite {
    offset:number;
    upper:number;
    width:number;
    height:number;
    pass:boolean;
    mario:boolean;
    marioJumped:boolean;

    constructor(mario:boolean) {
        this.offset = Configs.width;
        this.width = Configs.pipeWidth;
        this.height = Configs.pipeHeight;
        this.pass = false;
        this.upper = (Math.random() * Configs.height/2) + Configs.height/4 - Configs.pipeHeight/2;
        this.mario = mario;
        this.marioJumped = false;
    }

    tick(delta:number) {
        this.offset -= delta * Configs.pipeSpeed;
    }

    render(context:CanvasRenderingContext2D) {
        //context.beginPath();
        //context.rect(this.offset, 0, this.width, this.upper);
        //context.rect(this.offset, this.upper + this.height, this.width, Configs.height);
        //context.fillStyle = 'green';
        //context.fill();

        Assets.drawPipe(context, this.offset, this.upper);

        if (this.mario) {
            if (!this.marioJumped && this.offset < Configs.marioJumpOffset) {
                this.marioJumped = true;
                Assets.playSoundMarioJump();
            }
            Assets.drawMario(context, this.offset, this.upper);
        }
    }

    checkCollision(bird:Bird):boolean {
        if (bird.offset + Configs.birdRadius > this.offset && bird.offset - Configs.birdRadius < this.offset + this.width) {
            if (bird.height - Configs.birdRadius < this.upper || bird.height + Configs.birdRadius > this.upper + this.height) {
                return true;
            }
        }

        return false;
    }

    getAnchor():[number, number] {
        return [this.offset + Configs.pipeWidth, this.upper + Configs.pipeHeight/2]
    }
}