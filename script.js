const Shapes = [
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0]
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [1, 1],
        [1, 1]
    ]
];
const Colors = [
    'white',
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];

const rows = 20 ;
const cols = 10 ;

let canvas = document.querySelector('#tetris');
let context = canvas.getContext("2d");
let scorebox = document.querySelector('h2');
context.scale(30, 30);

let pieceObj = null;
let grid = generateGrid();
let score = 0 ;
console.log(pieceObj);

function gameState(){
    if(pieceObj == null){
        pieceObj = generateRandomShape();
        showPiece();
    }
    moveDown();
    checkLine();
}

function checkLine(){
    let lines = 0 ;
    for (let i = 0 ; i <grid.length ; i++){
        for(let j = 0 ; j < grid[i].length ; j++){
            if(grid[i][j] == 0){
                break ;
            }else{
                if(j == grid[i].length -1){
                grid.splice(i,1);
                grid.unshift(new Array(cols).fill(0));
                lines++;
            }

        }
    }
}
        if (lines == 1){
            score += 100 ;
        }else if(lines == 2){
            score += 300 ;
        }else if(lines == 3){
            score += 500 ;
        }else if(lines >= 4){
            score  += 800 ;
        }
        scorebox.innerHTML = "Score : " + score ;
    }
function collision(x, y, testPiece) {
    let piece = testPiece || pieceObj.piece;
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[i].length; j++) {
            if (piece[i][j] == 1) {
                let p = j + x;
                let q = i + y;
                if (p < 0 || p >= cols || q < 0 || q >= rows) {
                    return true;
                }
                if (grid[q][p] != 0) {
                    return true;
                }
            }
        }
    }
    return false;
}


function generateRandomShape(){
    let ran = Math.floor(Math.random() * 7);
    console.log(Shapes[ran]);
    let piece = Shapes[ran];
    let color = ran +1;
    let cx = 4 ;
    cy = 0;
    return {piece, color, cx, cy};
}

function showPiece(){
    newPiece = pieceObj ;
    for(let i = 0 ; i < newPiece.piece.length ; i++){
        for(let j = 0 ; j < newPiece.piece.length ; j++){
            if(newPiece.piece[i][j] == 1){
                context.fillStyle = Colors[newPiece.color] ;
                context.fillRect(newPiece.cx + j, newPiece.cy + i, 1, 1);
            }
        }
    }
}

function moveDown(){
    if(!collision(pieceObj.cx , pieceObj.cy + 1))
        pieceObj.cy += 1 ;
        else{
            let piece = pieceObj.piece ;
        for(let i = 0 ; i < piece.length ; i++){
            for(let j = 0 ; j < piece[i].length ; j++){
                if(piece[i][j] == 1){
                let p = pieceObj.cx + j ;
                let q = pieceObj.cy + i ;
                grid[q][p] = pieceObj.color ;
                }
            }
            if (pieceObj.cy == 0){
                alert("Game Over");
                grid = generateGrid();
            }
        }
        pieceObj = null ;
    }
    drawGrid();
}
function moveRight(){
    if(!collision(pieceObj.cx + 1 , pieceObj.cy))
    pieceObj.cx += 1 ;
    drawGrid();
    
}
function moveLeft(){
    if(!collision(pieceObj.cx -1 , pieceObj.cy))
    pieceObj.cx -= 1 ;
    
    drawGrid();
    
}

function rotate(){
    let piece = pieceObj.piece ;
    let n = piece.length ;
    let m = piece[0].length ;
    let rotatedPiece = [];
    for(let i = 0 ; i < m ; i++){
        rotatedPiece.push([]);
        for(let j = 0 ; j < n ; j++){
            rotatedPiece[i].push(0);
        }
    }
    for(let i = 0 ; i < n ; i++){
        for(let j = 0 ; j < m ; j++){
            rotatedPiece[j][n - 1 - i] = piece[i][j];
        }
    }
    // Only rotate if it doesn't collide
    if (!collision(pieceObj.cx, pieceObj.cy, rotatedPiece)) {
        pieceObj.piece = rotatedPiece;
    }
    drawGrid();
}

function generateGrid(){
    let grid = [];
    for(let i = 0 ; i < rows ; i++){
        grid.push([]);
        for(let j = 0 ; j < cols ; j++){
            grid[i].push(0);
        }
    }
    return grid ;
}

function drawGrid(){
    for(let i = 0 ; i < grid.length ; i++){
        for(let j = 0 ; j < grid[i].length ; j++){
            context.fillStyle = Colors[grid[i][j]] ;
            context.fillRect(j, i, 1, 1);
        }
    }
    showPiece();
}

document.addEventListener('keydown', function(e) {
    console.log(e.key);
    if(e.key == "ArrowDown"){
        moveDown();
    }
    else if(e.key == "ArrowRight"){
        moveRight();
    }
    else if(e.key == "ArrowLeft"){
        moveLeft();
    }
    else if(e.key == "ArrowUp"){
        rotate();
    }
})

setInterval(gameState,500);
