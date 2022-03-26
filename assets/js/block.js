export default class Block {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById("buttonImg");
        this.width = 200;
        this.height = 200;
        this.x = this.gameWidth/3 - this.width;
        this.y = this.gameHeight - this.height;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y)
    }
}