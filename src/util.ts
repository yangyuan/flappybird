/**
 * The common features.
 */
class Util {
    /**
     * Flip a coin with a change.
     * @param epsilon the epsilon value
     */
    static flipCoin(epsilon: number): boolean {
        if (Math.random() < epsilon) {
            return true;
        }

        return false;
    }
}