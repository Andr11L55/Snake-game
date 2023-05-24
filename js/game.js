const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const colors = [`AliceBlue`,`AntiqueWhite`,`Aqua`,`Aquamarine`,`Azure`,`Beige`,
`Bisque`,`Black`,`BlanchedAlmond`,`Blue`,`BlueViolet`,`Brown`,`BurlyWood`,`CadetBlue`,
`Chartreuse`,`Chocolate`,`Coral`,`CornflowerBlue`,`Cornsilk`,`Crimson`,
`Cyan`,`DarkBlue`,`DarkCyan`,`DarkGoldenRod`,
`DarkGray`,`DarkGrey`,`DarkGreen`,`DarkKhaki`,
`DarkMagenta`,`DarkOliveGreen`,`Darkorange`,`DarkOrchid`,
`DarkRed`,`DarkSalmon`,`DarkSeaGreen`,`DarkSlateBlue`,
`DarkSlateGray`,`DarkSlateGrey`,`DarkTurquoise`,`DarkViolet`,
`DeepPink`,`DeepSkyBlue`,`DimGray`,
`DimGrey`,`DodgerBlue`,
`FireBrick`,`FloralWhite`,
`ForestGreen`,`Fuchsia`,
`Gainsboro`,`GhostWhite`,
`Gold`,
`GoldenRod`,`Gray`,
`Grey`,`Green`,
`GreenYellow`,`HoneyDew`,
`HotPink`,`IndianRed`,`Indigo`,
`Ivory`,`Khaki`,
`Lavender`,`LavenderBlush`,
`LawnGreen`,`LemonChiffon`,
`LightBlue`,
`LightCoral`,`LightCyan`,
`LightGoldenRodYellow`,
`LightGray`,`LightGrey`,
`LightGreen`,`LightPink`,`LightSalmon`,`LightSeaGreen`,`LightSkyBlue`,
`LightSlateGray`,`LightSlateGrey`,`LightSteelBlue`,
`LightYellow`,
`Lime`,
`LimeGreen`,
`Linen`,
`Magenta`,
`Maroon`,`MediumAquaMarine`,
`MediumBlue`,`MediumOrchid`,
`MediumPurple`,`MediumSeaGreen`,
`MediumSlateBlue`,`MediumSpringGreen`,`MediumTurquoise`,
`MediumVioletRed`,
`MidnightBlue`,
`MintCream`,
`MistyRose`,
`Moccasin`,
`NavajoWhite`,`Navy`,
`OldLace`,
`Olive`,`OliveDrab`,
`Orange`,
`OrangeRed`,
`Orchid`,
`PaleGoldenRod`,
`PaleGreen`,
`PaleTurquoise`,
`PaleVioletRed`,
`PapayaWhip`,
`PeachPuff`,
`Peru`,
`Pink`,`Plum`,
`PowderBlue`,
`Purple`,
`Red`,`RosyBrown`,`RoyalBlue`,`SaddleBrown`,`Salmon`,`SandyBrown`,
`SeaGreen`,
`SeaShell`,
`Sienna`,
`Silver`,
`SkyBlue`,
`SlateBlue`,
`SlateGray`,
`SlateGrey`,
`Snow`,
`SpringGreen`,
`SteelBlue`,
`Tan`,
`Teal`,
`Thistle`,
`Tomato`,
`Turquoise`,
`Violet`,
`Wheat`,
`White`,
`WhiteSmoke`,
`Yellow`,
`YellowGreen`,]
let col = Math.floor(Math.random()*colors.length+1)
let col1 = Math.floor(Math.random()*colors.length+1)
console.log(col);

const ground = new Image()
ground.src = "img/bg.png"

const foodImg = new Image()
foodImg.src = "img/food.png"

let box = 32

let score = 0

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
}

let snake = []
snake[0] = {
    x: 9*box,
    y: 10*box,
}

document.addEventListener('keydown', direction)

let dir

function direction(event){
    if(event.keyCode === 37 && dir != 'right')
        dir = 'left'
    else if(event.keyCode === 38 && dir != 'down')
        dir = 'up'
    else if(event.keyCode === 39 && dir != 'left')
        dir = 'right'
    else if(event.keyCode === 40 && dir != 'up')
        dir = 'down'
}

function eatTail(head, arr){
    for(let i=0; i < arr.length; i++){
        if(head.x === arr[i].x && head.y === arr[i].y){
            clearInterval(game)
        }
    }
}

function drawGame(){
    ctx.drawImage(ground, 0,0)

    ctx.drawImage(foodImg, food.x, food.y)

    for(let i=0; i < snake.length; i++){
        ctx.fillStyle = i===0 || i%2===0 ? colors[col] : colors[col1]
        ctx.fillRect(snake[i].x, snake[i].y, box, box) 
       
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Times New Roman'
    ctx.fillText(score, box * 2.5, box * 1.7)

    let snakeX= snake[0].x
    let snakeY= snake[0].y

    if(snakeX === food.x && snakeY === food.y){
        score++
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        }
    } else{
            snake.pop()
        }
    
    if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game)

    if(dir === 'left') snakeX -= box
    if(dir === 'right') snakeX += box
    if(dir === 'up') snakeY -= box
    if(dir === 'down') snakeY += box

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    eatTail(newHead, snake)

    snake.unshift(newHead)

}

let game = setInterval(drawGame, 100)

