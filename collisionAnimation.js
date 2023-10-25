/**
 * The CollisionAnimation class defines the effect seen on screen when a collision occurs between the Player and an Enemy.
 * The standard animation loop is used to cycle trhough the sprite sheet a single time rather than continuously then the
 * effect is removed from the screen.
 */
export class CollisionAnimation {
    constructor(game, x, y){
        this.game = game;
        this.image = boom;
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width/2;
        this.y = y - this.height/2;
        this.frameX = 0;
        this.maxFrame = 4;
        this.deleteBoom = false;
        this.fps = 8;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update(deltaTime){
        this.x -= this.game.gameSpeed;
        if (this.frameTimer > this.frameInterval){
            this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        if (this.frameX > this.maxFrame) this.deleteBoom = true;
    }
}