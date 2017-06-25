class Emulator {

    static run(data: string, dailyDump: Function) {
        let timestamp: number = 0;
        let lastGameTick: number = 0;
        let nextGameTick: number = 0;

        let game = new Game();
        let agent = new Agent(game);
        let ai = new AiAgent(game, data);

        let counter = 0;

        while (true) {
            if (nextGameTick == timestamp) {
                nextGameTick = timestamp + Math.round(Math.random() * 6 + 1000 / Configs.fps - 3);
                game.emulate(timestamp - lastGameTick);
                ai.update();
                lastGameTick = timestamp;
            }

            if (timestamp % (1000 * 60 * 60 * 24) == 0) {
                counter++
                console.log(counter);

                dailyDump(ai.dump());
            }

            if (timestamp % (1000 * 60 * 60) == 0) {
                console.log("  Noise: " + ai.getNoise());
            }

            timestamp++;
        }
    }
}