class Util {
    static flipCoin(epsilon:number):boolean {
        if (Math.random() < epsilon) {
            return true;
        }

        return false;
    }
}