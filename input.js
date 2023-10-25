/* 
The InputHandler class stores the specified keys in an array when they are pressed by the user and removes them when the keyup event is triggered.
The values stored in this array inform the Player class to change state or position of a given Player.
 */

export class InputHandler {
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === 'Enter') && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            } else if (e.key === 'o') this.game.debug = !this.game.debug;
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === 'Enter'){
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }            
        });
    }
}