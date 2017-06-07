

class AiAgent extends BaseAgent {

    ai:QLearning;

    constructor(game:Game) {
        super(game);

        this.ai = new QLearning();
    }

    update() {
        let action = this.ai.getPolicy(this.getBirdHeight(), this.getBirdVelocity());
        if (action) {
            this.click();
        }
    }
}


class QLearning {
    values:Map<[number,number,boolean], number>;

    constructor() {
        this.values = new Map<[number,number,boolean], number>();
    }

    update(birdHeight:number, birdVelocity:number, action:boolean) {
    }

    getQValue(state:[number,number], action:boolean) {
        // will return 0 if key not exists
        let key:[number,number,boolean] = [0,0,false];
        key[0] = state[0];
        key[1] = state[1];
        key[2] = action;

        if (this.values.has(key)) {
            return this.values.get(key);
        }
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
        return Math.random() < 0.5;

        // TODO: random choose when equal
    }

    getAction(state):boolean {
        Math.random()
        if (Util.flipCoin(Configs.epsilon)) {
            return Math.random() < 0.5;
        } else {
            return this.computeActionFromQValues(state);
        }
    }

    
    getPolicy(birdHeight:number, birdVelocity:number):boolean {
        let state = [birdHeight,birdVelocity];
        console.log(state);
        return this.computeActionFromQValues(state);
    }

    getValue(state):number {
        return this.computeValueFromQValues(state);
    }
}