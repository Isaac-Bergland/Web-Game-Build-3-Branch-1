import { CollisionAnimation } from './collisionAnimation.js';
import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from './playerStates.js';

/*
Player class defines all properties associated with the player sprite. A Player is defined by position, size, animation frame, velocity,
current state, and other features. It checks the inputs array as well as current state/state transitions to modify properties.
*/

export class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.5;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = player;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.velX = 0;
        this.velY = 0;
        this.velMax = 5;
        this.gravity = 1;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        this.currentState = null;
    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);

        //Horizonal Movement
        this.x += this.velX;
        if (input.includes('a') && this.currentState !== this.states[6]) this.velX = -this.velMax;
        else if (input.includes('d') && this.currentState !== this.states[6]) this.velX = this.velMax;
        else this.velX = 0;

        //Horizontal Boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        //Vertical Movement
        this.y += this.velY/2;
        if (!this.onGround()) this.velY += this.gravity;
        else this.velY = 0;

        //Vertical Boundaries
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;

        //Sprite Animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else this.frameTimer += deltaTime;


    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.gameSpeed = this.game.maxSpeed * speed;
        this.currentState.enter();
        
    }
    checkCollision(){ //Add points if collision occurs in diving or rolling state. Remove life if not. Check overlap/collision using x+width and y+height values.
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width && 
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
               ){ 
                    enemy.deleteEnemy = true;
                    this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width/2, enemy.y + enemy.height/2));
                    if (this.currentState === this.states[4] || this.currentState[5]){
                        this.game.score += 5;
                    } else {
                        this.setState(6, 0);
                        this.game.livesLeft--;
                        if (this.game.livesLeft <= 0) this.game.gameOver = true;
                    }
                    
            } else { //No Collision
                
            }
        });
    }
}