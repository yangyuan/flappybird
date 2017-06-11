

class AiAgent extends BaseAgent {

    ai:QLearning;
    lastState:[number,number,number,number];
    lastAction:boolean;
    lastScore:number;

    constructor(game:Game, data:string) {
        super(game);
        
        this.ai = new QLearning(data);
    }

    getCurrentState():[number,number,number,number] {
        let state:[number,number,number,number] = [this.getBirdHeight(), this.getBirdVelocity(), 0, 0];
        let pipePos = this.getPipeRelativePosition();
        state[2] = pipePos[0];
        state[3] = pipePos[1];
        return state;
    }

    update() {
        let state = this.getCurrentState();

        if (this.isAlive()) {
            let reward = 0;
            let action = this.ai.getAction(state);

            let pipePos = this.getPipeRelativePosition();
            let delta = Math.abs(pipePos[1]);
            if (delta < Configs.pipeHeight/2) {
               // reward = 1;
            }

            if (this.getScore() > this.lastScore) {
                reward = 1024;
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
                this.ai.update(this.lastState, this.lastAction, state, -1024);
            }
            
            this.lastState = null;
            this.lastAction = null;

            this.click();
        }
    }
}


class QLearning {

    discount:number;
    alpha:number;

    values:Map<string, number>;

    constructor(data:string) {

        // JSON.stringify([...this.values])
        // new Map();
        // 
        this.values = <Map<string, number>>new Map(JSON.parse(data))
        this.discount = 0.9;
        this.alpha = 0.2;
    }

    getPolicy(state:[number,number,number,number]):boolean {
        return this.computeActionFromQValues(state);
    }

    update(state, action, nextState, reward) {
        let qvalue = reward + this.discount * this.getValue(nextState)
        qvalue = (1 - this.alpha) * this.getQValue(state, action) + this.alpha * qvalue;
        this.setQValue(state, action, qvalue)
    }

    getKey(state:[number,number,number,number], action:boolean):string {
        let key:string = (action?"t":"f");
        key += "," + Math.round(state[0]/100); // height
        key += "," + Math.round(state[1]/4);
        key += "," + Math.round(state[2]/100); //
        key += "," + Math.round(this.getMagicNumber(state[3], 100)/10);
        //key += "," + Math.round(Math.log(state[2]));
        //key += ","
        if (state[3] < 0) {
            //key += "-"
        }
        //key += Math.round(Math.abs(state[3])/8);

        return key;
    }

    getMagicNumber(value:number, base:number) {
        let poz = 1;
        let abs = Math.abs(value);
        if (value < 0) {
            poz = -1;
        }

        if (abs <= base) {
            return value;
        }

        return poz * Math.log(Math.abs(value)/base*Math.E)*base;
    }

    setQValue(state:[number,number,number,number], action:boolean, value:number) {
        let key:string = this.getKey(state, action);
        this.values.set(key, Number(value.toPrecision(8)));
    }

    getQValue(state:[number,number,number,number], action:boolean) {
        let key:string = this.getKey(state, action);


        if (this.values.has(key)) {
            if (state[2] < 200) {
                //console.log(key + ":" + this.values.get(key));
            }
            console.log(key + ":" + this.values.get(key));
            return this.values.get(key);
        }

            //console.log(key + ":" + 0);
        return 0
    }

    computeValueFromQValues(state):number {
        var qValueTrue = this.getQValue(state, true);
        var qValueFalse = this.getQValue(state, false);
        return Math.max(qValueTrue, qValueFalse, 0)
    }

    computeActionFromQValues(state):boolean {
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

    getAction(state):boolean {
        Math.random()
        if (Util.flipCoin(Configs.epsilon)) {
            return Math.random() < 0.1;
        } else {
            return this.computeActionFromQValues(state);
        }
    }

    getValue(state):number {
        return this.computeValueFromQValues(state);
    }
}