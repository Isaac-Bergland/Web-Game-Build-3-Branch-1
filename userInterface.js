/**
 * The UI class defines user interface elements such as score, timer, and game completion messages.
 */

export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
        this.lifeImage = life;
    }
    draw(context){
        context.save();
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        
        //Score
        context.fillText('Score: ' + this.game.score, 20, 50);
        
        //Timer
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time *0.001).toFixed(1), 20, 80);
        
        //Lives
        for (let i=0; i < this.game.livesLeft; i++){
            context.drawImage(this.lifeImage, 30 * i + 20, 95, 25, 25);
        }
        
        //Game Over
        if (this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('Game Over!', this.game.width/2, this.game.height/2);
        }
        context.restore();
    }
}