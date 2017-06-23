class Emulator {

    static run(data:string, dailyDump:Function) {
        let timestamp:number = 0;
        let lastGameTick:number = 0;
        let nextGameTick:number = 0;

        let game = new Game();
        let agent = new Agent(game);
        let ai = new AiAgent(game, data);

        let counter = 0;

        while(true) {
            if (nextGameTick == timestamp) {
                nextGameTick = timestamp + Math.round(Math.random() * 4.9 + 1000/Configs.fps - 2.4);
                game.emulate(timestamp - lastGameTick);
                ai.update();
                lastGameTick = timestamp;
            }

            if (timestamp%(1000*60*60*24) == 0) {
                counter ++ 
                console.log(counter);

                dailyDump(ai.dump());
                // var fs = require('fs');
                // fs.writeFileSync("C:\\Users\\Windows\\Desktop\\FAI\\dump.txt", ai.dump());
            }

            timestamp ++;
        }
    }
}