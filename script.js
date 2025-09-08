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

function generateRandomShape(){
    let ran = Math.floor(Math.random() * 7);
    console.log(Shapes[ran]);
    let piece = Shapes[ran];
    let color = Colors[ran];
    let cx = 4 ;
    cy = 0;
    return {piece, color, cx, cy};
}

function showPiece(){
    newPiece = pieceObj ;
    for(let i = 0 ; i < newPiece.piece.length ; i++){
        for(let j = 0 ; j < newPiece.piece.length ; j++){
            if(newPiece.piece[i][j] == 1){
                context.fillStyle = newPiece.color;
                context.fillRect(newPiece.cx + j, newPiece.cy + i, 1, 1);
            }
        }
    }
}

function moveDown(){
    pieceObj.cy += 1 ;
    drawGrid();
}

function generateGrid(){
    let grid = [];
    for(let i = 0 ; i < rows ; i++){
        grid.push([]);
        for(let j = 0 ; j < cols ; j++){
            grid[i].push(i);
        }
    }
    return grid ;
}

function drawGrid(){
    for(let r = 0 ; r < grid.length ; r++){
        for(let c = 0 ; c < grid[r].length ; c++){
            context.fillStyle = "#F2F2F2";
            context.fillRect(c, r, 1, 1);
        }
    }
    showPiece();
}
setInterval(gameState,500);
