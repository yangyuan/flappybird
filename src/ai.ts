/**
 * The agent class for AI.
 */
class AiAgent extends BaseAgent {

    ai: QLearning;
    lastState: [number, number, number, number];
    lastAction: boolean;
    lastScore: number;

    time: Date;

    constructor(game: Game, data: string) {
        super(game);

        this.ai = new QLearning(data);
        this.time = new Date();
    }

    getCurrentState(): [number, number, number, number] {
        let state: [number, number, number, number] = [this.getBirdHeight(), this.getBirdVelocity(), 0, 0];
        let pipePos = this.getPipeRelativePosition();
        state[2] = pipePos[0];
        state[3] = pipePos[1];
        return state;
    }

    dump(): string {
        return this.ai.dump();
    }

    getNoise(): number {
        return this.ai.noise;
    }

    update() {
        let time = new Date();
        this.time = time;

        let state = this.getCurrentState();

        if (this.isAlive()) {
            let reward = 0;
            let action = this.ai.getAction(state);

            let pipePos = this.getPipeRelativePosition();
            let delta = Math.abs(pipePos[1]);

            if (this.getScore() > this.lastScore) {
                reward = 1048576;
                this.lastScore = this.getScore();
            }

            if (this.lastState != null) {
                this.ai.update(this.lastState, this.lastAction, state, reward);
            }

            this.lastState = state;
            this.lastAction = action;

            if (action) {
                this.click();
            }
        } else {
            this.lastScore = 0;
            if (this.lastState != null) {
                this.ai.update(this.lastState, this.lastAction, state, -1048576);
            }

            this.lastState = null;
            this.lastAction = null;

            this.click();
        }
    }
}


class QLearning {

    values: Map<string, number>;
    noise: number;

    constructor(data: string) {
        this.noise = 0;
        this.values = <Map<string, number>>new Map(JSON.parse(data))
    }

    dump(): string {
        return JSON.stringify([...this.values]);
    }

    getPolicy(state: [number, number, number, number]): boolean {
        return this.computeActionFromQValues(state);
    }

    update(state, action, nextState, reward) {

        if (!Configs.learn) {
            return;
        }

        let qvalue = reward + Configs.discount * this.getValue(nextState)
        let oldQvalue = this.getQValue(state, action);

        if (qvalue != 0) {
            this.noise = Math.abs((oldQvalue - qvalue) / (Math.abs(qvalue) + Math.abs(oldQvalue))) * 0.001 + this.noise * 0.999;
        }

        qvalue = (1 - Configs.alpha) * oldQvalue + Configs.alpha * qvalue;
        this.setQValue(state, action, qvalue)
    }

    getKey(state: [number, number, number, number], action: boolean): string {
        let key: string = (action ? "t" : "f");
        key += "," + Math.round(state[0] / 128); // height
        key += "," + Math.round(state[1]); // speed
        key += "," + Math.round(this.getMagicNumber(state[2], 100) / 25); // position x
        key += "," + Math.round(this.getMagicNumber(state[3], 90) / 9); // position y

        return key;
    }

    getMagicNumber(value: number, base: number) {
        let poz = 1;
        let abs = Math.abs(value);
        if (value < 0) {
            poz = -1;
        }

        if (abs <= base) {
            return value;
        }

        return poz * Math.log(Math.abs(value) / base * Math.E) * base;
    }

    setQValue(state: [number, number, number, number], action: boolean, value: number) {
        let key: string = this.getKey(state, action);
        this.values.set(key, Number(value.toPrecision(8)));
    }

    getQValue(state: [number, number, number, number], action: boolean) {
        let key: string = this.getKey(state, action);

        if (this.values.has(key)) {
            return this.values.get(key);
        }

        return 0
    }

    computeValueFromQValues(state): number {
        var qValueTrue = this.getQValue(state, true);
        var qValueFalse = this.getQValue(state, false);
        return Math.max(qValueTrue, qValueFalse, 0)
    }

    computeActionFromQValues(state): boolean {
        var qValueTrue = this.getQValue(state, true);
        var qValueFalse = this.getQValue(state, false);

        if (qValueFalse > qValueTrue) {
            return false;
        }
        if (qValueFalse < qValueTrue) {
            return true;
        }
        return Math.random() < 0.1;

        // TODO: random choose when equal
    }

    getAction(state): boolean {
        Math.random()
        if (Util.flipCoin(Configs.epsilon)) {
            return Math.random() < 0.1;
        } else {
            return this.computeActionFromQValues(state);
        }
    }

    getValue(state): number {
        return this.computeValueFromQValues(state);
    }
}