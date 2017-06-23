/**
 * The Sprite of Pipe
 */
class Pipe implements Sprite {
    /**
     * Offset from the left of the screen.
     */
    offset:number;

    /**
     * Upper bound of the pipe tunnel.
     */
    upper:number;

    /**
     * Width of the pipe.
     */
    width:number;

    /**
     * Height of the pipe tunnel.
     */
    height:number;

    /**
     * If the pipe has passed the bird.
     */
    scored:boolean;

    /**
     * If there is a mario on the pipe.
     */
    mario:boolean;

    /**
     * Did mario jumped?
     */
    marioJumped:boolean;

    constructor(mario:boolean) {
        this.offset = Configs.width;
        this.width = Configs.pipeWidth;
        this.height = Configs.pipeHeight;
        this.scored = false;
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