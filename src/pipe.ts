class Pipe implements Sprite {
    offset:number;
    upper:number;
    width:number;
    height:number;

    constructor() {
        this.offset = Configs.width;
        this.width = Configs.pipeWidth;
        this.height = Configs.pipeHeight;
        this.upper = (Math.random() * Configs.height/2) + Configs.height/4 - Configs.pipeHeight/2;
    }

    tick(delta:number) {
        this.offset -= delta * Configs.pipeSpeed;
    }

    render(context:CanvasRenderingContext2D) {
        context.beginPath();
        context.rect(this.offset, 0, this.width, this.upper);
        context.rect(this.offset, this.upper + this.height, this.width, Configs.height);
        context.fillStyle = 'green';
        context.fill();
    }

    checkCollision(bird:Bird):boolean {
        if (bird.offset + Configs.birdRadius > this.offset && bird.offset - Configs.birdRadius < this.offset + this.width) {
            if (bird.height - Configs.birdRadius < this.upper || bird.height + Configs.birdRadius > this.upper + this.height) {
                console.log(bird.height);
                console.log(this.upper);
                console.log(this.upper + this.height);
                return true;
            }
        }

        return false;
    }
}