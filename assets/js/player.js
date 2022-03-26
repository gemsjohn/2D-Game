import {SittingLeft, SittingRight, StandingLeft, StandingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight,
FallingLeft, FallingRight} from './state.js';
import Block from './block.js';

export default class Player {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), 
            new RunningRight(this), new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this)];
        this.currentState = this.states[1];
        this.image = document.getElementById("splotchImg");
        this.width = 200; // width of 1 fram
        this.height = 180; // height divided by number of rows = height
        this.x = this.gameWidth/2 - this.width/2;
        this.y = this.gameHeight - this.height;
        this.vy = 0;
        this.weight = 0.5;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 4;
        this.speed = 0;
        this.maxSpeed = 10;
        this.fps = 10;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.boxCollision = false;
    }
    draw(context, deltaTime) {
        if (this.frameTimer > this.frameInterval){
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        
        context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(input) {
        this.currentState.handleInput(input);
        // horizontal movement
        this.x += this.speed;
        if (this.x <= 0) this.x = 0;
        else if (this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width;
        // vertical movement
        this.y += this.vy;
        if (!this.onGround()){
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }
        // prevents player from falling through the floor on decent
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        this.onBlock();
            
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    onGround(){
        return this.y >= this.gameHeight - this.height;
    }
    onBlock(){
        const block = new Block(this.gameWidth, this.gameHeight);
        
        if (this.x > block.x + block.width ||
            this.x + this.width < block.x ||
            this.y > block.y + block.height ||
            this.y + this.heigh > block.y
        ){
            // no collision
            // console.log("no collision");
            this.boxCollision = true;
            // if (this.y > block.y) {
            //     if (this.x > block.x) {
            //         this.y = this.gameHeight - this.height;
            //     } else if (this.x < block.x) {
            //         this.y = this.gameHeight - this.height;
            //     }
            // } 

        } else {
            // collision detected
            // console.log("collision detected");
            this.boxCollision = true;
            // if (this.x > block.x - block.width/2 && this.x < block.x + block.width/2) {
            //     console.log("between");
            //     this.y = this.gameHeight - this.height - block.height;
            // }
            // this.y = this.gameHeight - this.height - block;
            console.log(" block.width: ", block.width, " block.x: ", block.x, " gameHeight: ", this.gameHeight, " this.height: ", this.height, " this.y: ", this.y)
                // if (this.x > block.x) {
                //     console.log("UNDER - RIGHT");
                //     this.x = block.x + block.width/4;
                //     this.y = this.gameHeight - this.height;
                // } else if (this.x < block.x) {
                //     console.log("UNDER - LEFT");
                //     this.x = block.x - this.width/4;
                //     this.y = this.gameHeight - this.height;
                // } 
                if (this.x > block.x - block.width/2 && this.x < block.x + block.width/2) {
                    console.log("between");
                    this.y = this.gameHeight - this.height - block.height;
                }
            }
            
        }

    }
