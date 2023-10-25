/**
 * The Particle class adds elementary particle effects to the Player dependent upon the Player state. Particles are stored in an array and instantiated
 * when called in a State class. 
 */

class Particle {
    constructor(game){
        this.game = game;
        this.deleteParticle = false;
    }
    update(){
        this.x -= this.velX + this.game.gameSpeed;
        this.y -= this.velY;
        this.size *= 0.94;
        if (this.size < 1) this.deleteParticle = true;
    }
}

export class Dust extends Particle {
    constructor(game, x, y){
        super(game);
        this.size = Math.random() * 20 + 10;
        this.x = x;
        this.y = y;
        this.velX = Math.random();
        this.velY = Math.random();
        this.color = 'rgba(0,0,0,0.2';
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();

    }
}

export class Splash extends Particle {
    constructor(game, x, y){
        super(game);
        this.size = Math.random() * 100 + 100;
        this.x = x;
        this.y = y;
        this.velX = Math.random() * 6 - 4;
        this.velY = Math.random() * 3 + 2;
        this.gravity = 0;
        this.image = fire;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
    update(){
        super.update();
        this.gravity += 0.1;
        this.y += this.gravity;

    }
}

export class Fire extends Particle {
    constructor(game, x, y){
        super(game);
        this.image = fire;
        this.size = Math.random() * 50 + 60;
        this.x = x - 10;
        this.y = y + 10;
        this.velX = 1;
        this.velY = 1;
        this.angle = 0;
        this.startX = Math.random() * 0.1 + 0.1;
        this.velA = Math.random() * 0.2 - 0.1;   
    }
    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.size * this.startX, -this.size, this.size, this.size);
        context.restore();
    }
    update(){
        super.update();
        this.angle += this.velA;
        this.x += Math.sin(this.angle * 5);
    }
    
}