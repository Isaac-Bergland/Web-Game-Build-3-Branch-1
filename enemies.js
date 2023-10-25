/**
 * The Enemy class and all related subclasses define the dimensions, behaviors, and other properties for a given enemy type.
 */
class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.deleteEnemy = false;

    }
    draw(context){ //Place an enemy on screen in a specified location
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    update(deltaTime){ //Generic updater and frame selection in sprite sheet
        this.x -= this.velX + this.game.gameSpeed;
        this.y += this.velY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else  {
            this.frameTimer += deltaTime;
        }
        // Check if an enemy is off the left side of the scren to delete
        if (this.x + this.width < 0) this.deleteEnemy = true;

    }
}

export class Floater extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.image = ghost;
        this.width = 87.2;
        this.height = 70;
        this.x = this.game.width;        
        this.y = Math.random() * this.game.height * 0.3; 
        this.velX = Math.random() + 1.25;
        this.velY = 0;
        this.maxFrame = 5;
        this.angle = 0;
        this.cycleSpeed = Math.random() * 0.02 + 0.01;
        this.amplitude = Math.random() * 1.2;
    }
    update(deltaTime){ //Sinewave movement pattern
        super.update(deltaTime);
        this.y += Math.sin(this.angle) * this.amplitude;
        this.angle += this.cycleSpeed;
    }
}

export class Flyer extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.image = fly;
        this.width = 60;
        this.height = 44;
        this.x = this.game.width;        
        this.y = Math.random() * this.game.height * 0.4;        
        this.velX = Math.random() + 1.25;
        this.velY = 0;
        this.maxFrame = 5;
    }
}

export class Crawler extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 60;
        this.height = 87;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = plant;
        this.velX = 0;
        this.velY = 0;
        this.maxFrame = 1;
    }
}

export class Climber extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = spider;
        this.velX = 0;
        this.velY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
    }

    draw(context){ //Draw a connecting line (web) from above sprite to top middle of sprite
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.width/2, 0);
        context.lineTo(this.x + this.width/2, this.y + 50);
        context.stroke();
    }

    update(deltaTime){
        super.update(deltaTime);
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.velY *= -1; //Ground touch check
        if (this.y < -this.height) this.deleteEnemy = true; //
    }

}

export class Jumper extends Enemy {

}

