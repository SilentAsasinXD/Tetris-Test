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

let pieceObj = generateRandomShape();
console.log(pieceObj);
showPiece();

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
                context.fillRect(j , i, 1, 1);
            }
        }
    }
}