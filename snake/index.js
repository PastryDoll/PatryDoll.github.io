// Attach the function to the button's click event
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let BlipFood = true
let foodX = 0
let foodY = 0

let bodySize = 1
let step = 100
let speed = 10
let dead = false

// Initial position of the red square
let X = 0;
let Y = 0;

// Function to update the red square's position
function updateSquarePosition(x, y) {
    // Update the position
    X = x;
    Y = y;
  }

function drawBody(bodySize){

    context.fillStyle = 'red';
    context.fillRect(X, Y, step, step);

}

class SnakeBody {
    constructor() {
        this.vX = speed
        this.vY = 0
        this.body = []; // An array to store the body segments of the snake
        // this.vel = {vX,vY}
    }

    addSegment(){
        let X = this.body[this.body.length -1].X ;
        let Y = this.body[this.body.length -1].Y;
        this.body.push({X, Y})
        speed += 1
    }

    update(x,y){
        if (this.body.length >= 2){
            for (let i = this.body.length -1; i > 0 ; i-- ){
                if (this.body[i] === this.body[0]){dead = true; console.log("Looser")}
                this.body[i] = this.body[i-1]
            }
        }
        X = x;
        Y = y;
        X = X + this.vX;
        Y = Y + this.vY;
        this.body[0] = {X,Y}
    }

    draw(){
        for (let i = 0; i < this.body.length; i++ ){
        context.fillStyle = 'red';
        context.fillRect(this.body[i].X, this.body[i].Y, step, step);
        }
    }

}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

function getRandomMultipleOfTen(min, max) {
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomValue - (randomValue % speed); // Ensure it's a multiple of 10
}


(() => {
    Snake = new SnakeBody()
    Snake.body.push({X,Y})

    function update(){
        
        if (BlipFood) {
            foodX = getRandomMultipleOfTen(0,canvas.width-step)
            foodY= getRandomMultipleOfTen(0,canvas.height-step)
            
            BlipFood = false
        }
        
        if  ((((foodX >= X) && (foodX <= X + step)) && (( foodY >= Y) && (foodY <= Y + step))) ||
            (((foodX + 50 >= X) && (foodX + 50 <= X + step)) && (( foodY + 50 >= Y) && (foodY + 50 <= Y + step))))
        {
            Snake.addSegment()
            BlipFood = true
        }

        if (Snake.body[0].X > window.innerWidth){
            Snake.update(0,Snake.body[0].Y)
        }
        else if (Snake.body[0].X < 0){
            Snake.update(window.innerWidth ,Snake.body[0].Y)
        }
        else if (Snake.body[0].Y < 0){
            Snake.update(Snake.body[0].X,window.innerHeight )
        }
        else if (Snake.body[0].Y > window.innerHeight ){
            Snake.update(Snake.body[0].X,0)
        }
        else {
            Snake.update(Snake.body[0].X,Snake.body[0].Y)
        }

    }

    function render(){
        context.fillStyle = 'blue';
        context.fillRect(0, 0, canvas.width, canvas.height);
        Snake.draw()
       
        context.fillStyle = 'green';
        context.fillRect(foodX, foodY, 50, 50);
        
        
    }

    function loop(){
        update()
        render()
        window.requestAnimationFrame(loop);

    }

    window.requestAnimationFrame(loop);



  // Event listener for arrow key presses
    document.addEventListener('keydown', (event) => {
        event.preventDefault()
        switch (event.key) {
            case 'ArrowLeft':
            if (Snake.vX === speed){break;}
            Snake.vY = 0
            Snake.vX = -speed
            break;
            case 'ArrowRight':
            if (Snake.vX === -speed){break;}
            Snake.vY = 0
            Snake.vX = speed
            break;
            case 'ArrowUp':
            if (Snake.vY === speed){break;}
            Snake.vY = -speed
            Snake.vX = 0
            break;
            case 'ArrowDown': 
                if (Snake.vY === -speed){break;}
            Snake.vY = speed
            Snake.vX = 0
            break;
            case 'a':
            Snake.vY = 0
            Snake.vX = 0
            break;
        }
    });

})();
