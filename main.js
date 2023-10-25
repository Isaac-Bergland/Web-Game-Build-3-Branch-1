import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { Floater, Flyer, Crawler, Climber, Jumper } from './enemies.js';
import { UI } from './userInterface.js';


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.gameSpeed = 0;
            this.maxSpeed = 1.75;
            this.groundMargin = 50;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this); 
            this.UI = new UI(this);
            this.livesLeft = 5;
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.maxParticles = 80;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.time = 0;
            this.maxTime = 3000000;
            this.gameOver = false;
            this.score = 0;
            this.fontColor = 'black';
            this.debug = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.particles.forEach(particle => {
                particle.draw(context);
            });
            this.collisions.forEach(collision => {
                collision.draw(context);
            });
            this.UI.draw(context);
        }
        update(deltaTime){

            //handle player
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            //handle enemies
            if (this.enemyTimer > this.enemyInterval){
                this.spawnEnemy();
                console.log(this.enemies);
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });

            //handle particles
            this.particles.forEach((particle) => {
                particle.update();
            });
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }

            //handle collision
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            })

            //Filter container arrays to remove enemies when offscreen
            this.enemies = this.enemies.filter(enemy => !enemy.deleteEnemy);
            this.particles = this.particles.filter(particle => !particle.deleteParticle);
            this.collisions = this.collisions.filter(collision => !collision.deleteBoom);

        }
        spawnEnemy(){
            //Stationary type enemies
            if (this.gameSpeed > 0 && Math.random() < 0.5) this.enemies.push(new Crawler(this));
            else if (this.gameSpeed > 0) this.enemies.push(new Climber(this));
            
            //Overhead moving enemies
            if (Math.random() < 0.5) this.enemies.push(new Flyer(this));
            else this.enemies.push(new Floater(this));

        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});