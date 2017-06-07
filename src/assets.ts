namespace Assets {
    var sfx_wing = new Audio('assets/sfx_wing.ogg');
    var sfx_hit = new Audio('assets/sfx_hit.ogg');
    export function playSoundWing() {
        sfx_wing.play();
    }
    export function playSoundHit() {
        sfx_hit.play();
    }
}