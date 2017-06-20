class Assets {
    private static sfx_wing = new Audio('assets/sfx_wing.ogg');
    private static sfx_hit = new Audio('assets/sfx_hit.ogg');
    private static sfx_point = new Audio('assets/sfx_point.ogg');
    private static mario_jump = new Audio('assets/mario_jump.ogg');
    private static img_altas = new Image(1024, 1024);
    private static data_altas = '[["bg_day",[0,0,288,512]],["bg_night",[292,0,288,512]],["bird0_0",[0,970,48,48]],["bird0_1",[56,970,48,48]],["bird0_2",[112,970,48,48]],["bird1_0",[168,970,48,48]],["bird1_1",[224,646,48,48]],["bird1_2",[224,698,48,48]],["bird2_0",[224,750,48,48]],["bird2_1",[224,802,48,48]],["bird2_2",[224,854,48,48]],["black",[584,412,32,32]],["blink_00",[276,682,10,10]],["blink_01",[276,734,10,10]],["blink_02",[276,786,10,10]],["brand_copyright",[884,182,126,14]],["button_menu",[924,52,80,28]],["button_ok",[924,84,80,28]],["button_pause",[242,612,26,28]],["button_play",[702,234,116,70]],["button_rate",[924,0,74,48]],["button_resume",[668,284,26,28]],["button_score",[822,234,116,70]],["button_share",[584,284,80,28]],["font_048",[992,116,24,44]],["font_049",[272,906,16,44]],["font_050",[584,316,24,44]],["font_051",[612,316,24,44]],["font_052",[640,316,24,44]],["font_053",[668,316,24,44]],["font_054",[584,364,24,44]],["font_055",[612,364,24,44]],["font_056",[640,364,24,44]],["font_057",[668,364,24,44]],["land",[584,0,336,112]],["medals_0",[242,516,44,44]],["medals_1",[242,564,44,44]],["medals_2",[224,906,44,44]],["medals_3",[224,954,44,44]],["new",[224,1002,32,14]],["number_context_00",[276,646,12,14]],["number_context_01",[276,664,12,14]],["number_context_02",[276,698,12,14]],["number_context_03",[276,716,12,14]],["number_context_04",[276,750,12,14]],["number_context_05",[276,768,12,14]],["number_context_06",[276,802,12,14]],["number_context_07",[276,820,12,14]],["number_context_08",[276,854,12,14]],["number_context_09",[276,872,12,14]],["number_context_10",[992,164,12,14]],["number_score_00",[272,612,16,20]],["number_score_01",[272,954,16,20]],["number_score_02",[272,978,16,20]],["number_score_03",[260,1002,16,20]],["number_score_04",[1002,0,16,20]],["number_score_05",[1002,24,16,20]],["number_score_06",[1008,52,16,20]],["number_score_07",[1008,84,16,20]],["number_score_08",[584,484,16,20]],["number_score_09",[620,412,16,20]],["pipe2_down",[0,646,52,320]],["pipe2_up",[56,646,52,320]],["pipe_down",[112,646,52,320]],["pipe_up",[168,646,52,320]],["score_panel",[0,516,238,126]],["text_game_over",[784,116,204,54]],["text_ready",[584,116,196,62]],["title",[702,182,178,48]],["tutorial",[584,182,114,98]],["white",[584,448,32,32]]]';
    private static map_altas:Map<string,[number,number,number,number]>;
    private static img_rainbow = new Image(100, 50);

    static initialize() {
        this.img_altas.src = 'assets/atlas.png';
        this.img_rainbow.src = 'assets/rainbow.png';
        this.map_altas = <Map<string,[number,number,number,number]>>new Map(JSON.parse(this.data_altas))
    }

    static playSoundWing() {
        this.sfx_wing.play();
    }
    static playSoundHit() {
        Assets.sfx_hit.play();
    }
    static playSoundPoint() {
        Assets.sfx_point.play();
    }
    static playSoundMarioJump() {
        Assets.mario_jump.play();
    }

    static drawBackground(context:CanvasRenderingContext2D, score:number) {
        let alta = this.map_altas.get('bg_day');
        context.drawImage(this.img_altas, alta[0], alta[1], alta[2], alta[3], 0, 0, alta[2], Configs.height);
        context.drawImage(this.img_altas, alta[0], alta[1], alta[2], alta[3], alta[2], 0, alta[2], Configs.height);
        context.drawImage(this.img_altas, alta[0], alta[1], alta[2], alta[3], alta[2]*2, 0, alta[2], Configs.height);

        if (score > 20 && (score % 5 == 0)) {
            context.drawImage(this.img_rainbow, Configs.width/2, 100, 200, 100);
        }
    }

    static drawPipe (context:CanvasRenderingContext2D, offset:number, upper:number) {
        let pipe_down = this.map_altas.get('pipe_down');
        let pipe_up = this.map_altas.get('pipe_up');
        //,["pipe_down",[112,646,52,320]],["pipe_up",[168,646,52,320]]
        context.drawImage(this.img_altas, pipe_down[0], pipe_down[1], pipe_down[2], pipe_down[3],
         offset, upper-pipe_down[3]*2, pipe_down[2]*2, pipe_down[3]*2);

        context.drawImage(this.img_altas, pipe_up[0], pipe_up[1], pipe_up[2], pipe_up[3],
         offset, upper+Configs.pipeHeight, pipe_up[2]*2, pipe_up[3]*2);
    }

    static drawBird (context:CanvasRenderingContext2D, height:number, velocity:number) {
        let bird = this.map_altas.get('bird0_0');
        var x = Configs.width / 2;
        var y = Configs.height / 2;

        let ang = 10;
        context.save(); //saves the state of canvas
        context.translate(Configs.birdOffset, height); //let's translate
        context.rotate(Math.atan2(velocity, 7.5)); //increment the angle and rotate the image 
        context.drawImage(this.img_altas, bird[0], bird[1], bird[2], bird[3],
         0 -bird[3], 0-bird[3], bird[2]*2, bird[3]*2);
        context.restore(); //restore the state of canvas
    }

    static drawScore(context:CanvasRenderingContext2D, score:number) {
        //context.font="30px Arial";
        //context.fillStyle = 'blue';
        //context.fillText(score + "",10,40);

        let scores = [];
        for (let i=3; i >= 0; i--) {
            scores[i] = score%10;
            score = Math.floor(score/10);
        }

        for (let i=0; i < 4; i++) {
            let alta = this.map_altas.get('font_0' + (48 + scores[i]));
            context.drawImage(this.img_altas, alta[0], alta[1], alta[2], alta[3], (i+1)*28 - alta[2]/2 - 12, 0, alta[2], alta[3]);
        }
    }
}

Assets.initialize();