import Player from './player.js';
import Block from './block.js';
import InputHandler from './input.js';
import {drawStatusText} from './utils.js';

window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    loading.style.display = 'none';
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const player = new Player(canvas.width, canvas.height);
    const block = new Block(canvas.width, canvas.height);
    const input = new InputHandler();
    
    

    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.update(input.lastKey);
        player.draw(ctx, deltaTime);
        drawStatusText(ctx, input, player);
        requestAnimationFrame(animate); 

        block.draw(ctx);

        // if (player.x > block.x + block.width ||
        //     player.x + player.width < block.x ||
        //     player.y > block.y + block.height ||
        //     player.y + player.heigh > block.y
        // ){
        //     // no collision
        //     console.log("no collision");
        // } else {
        //     // collision detected
        //     console.log("collision detected");
        // }
    }
    animate(0);
});