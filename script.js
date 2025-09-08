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
context.scale(30, 30);

let pieceObj = null;
let grid = generateGrid();
console.log(pieceObj);

function gameState(){
    if(pieceObj == null){
        pieceObj = generateRandomShape();
        showPiece();
    }
    moveDown();
}

function collision(x, y){
    let piece = pieceObj.piece ;
    for(let i = 0 ; i < piece.length ; i++){
        for(let j = 0 ; j < piece[i].length ; j++){
            if(piece[i][j] == 1){
                let p = j + x ;
                let q = i + y ;
                if (p >=0 && p < cols && q >= 0 && q < rows){
                }
                else{
                    return true ;
                }
            }
        }
    }
    return false ;
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
