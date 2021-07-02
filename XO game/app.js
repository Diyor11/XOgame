let allBox = document.querySelectorAll('section div');
let players = document.querySelector('.player');
let playerTurn = document.querySelector('.turn-player');
let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');
let human = document.querySelector('.human').style;
let beXO = document.querySelector('.beXO').style;
let beX = document.getElementById('beX');
let beO = document.getElementById('beO');
let gameBoard = document.querySelector('.game_board').style;
let rePlay = document.getElementById('replay').style;
let reBtn = document.getElementById('reBtn');
let botWork;
let allPlayBox = [];
let arr = [];

player1.onclick = () => {
    botWork = true;
    human.display = 'none';
    beXO.display = 'block';
}
player2.onclick = () => {
    botWork = false;
    human.display = 'none';
    gameBoard.display = 'block';
    playerTurn.id = 'playerX';
}
beX.onclick = () => {
    gameBoard.display = 'block';
    beXO.display = 'none';
}
beO.onclick = () => {
    gameBoard.display = 'block';
    beXO.display = 'none';
    playerTurn.id = 'playerX';
    bot()
}
// write x or o 
window.onload = () => {
    for(let i = 0; i < allBox.length; i++){
        allBox[i].setAttribute('onclick', 'clickedBox(this)');
        allPlayBox.push(allBox[i])
    }
}

let playerXIcon = 'fas fa-times';
let playerOIcon = 'far fa-circle';

function clickedBox(element){
    if(element.childElementCount === 0){
        if(playerTurn.id === 'playerX'){
            element.innerHTML = '<i class="fas fa-times"></i>';
            playerTurn.id = 'playerO'
            element.setAttribute('id', 'x')
        }
        else {
            element.innerHTML = '<i class="far fa-circle"></i>';
            playerTurn.id = 'playerX';
            element.setAttribute('id', 'o')
        }
        setTimeout(bot, 1000)
        selectWinner('x');
        selectWinner('o')
    }
}

//  Function bot

function bot(){
    for(let i = 0; i < allBox.length; i++){
        if(allBox[i].childElementCount == 0){
            arr.push(allBox[i])
        }
    }
    let randomBox = arr[Math.round((Math.random() * (arr.length - 1)))]
    
    if(arr.length > 0 && botWork && randomBox.childElementCount === 0){
        if(playerTurn.id === 'playerX'){
            randomBox.innerHTML = '<i class="fas fa-times"></i>';
            playerTurn.id = 'playerO';
            randomBox.setAttribute('id', 'x')
        }
        else {
            randomBox.innerHTML = '<i class="far fa-circle"></i>';
            playerTurn.id = 'playerX';
            randomBox.setAttribute('id', 'o')
        }
    }
    else {bot()}
       selectWinner('o');
       selectWinner('x');
    draw('draw');
}

//  check winner
function getClass(idname){
    return document.querySelector('.box'+idname).id;
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign)
    return true;
}

function selectWinner(who){
    if(
    checkClass(1, 2, 3, who) ||
    checkClass(4, 5, 6, who) ||
    checkClass(7, 8, 9, who) ||
    checkClass(1, 4, 7, who) ||
    checkClass(2, 5, 8, who) ||
    checkClass(3, 6, 9, who) ||
    checkClass(1, 5, 9, who) ||
    checkClass(3, 5, 7, who)
    ){
        gameBoard.animationName = 'light'
        botWork = false;
        setTimeout(() => {
        gameBoard.display = 'none';
        rePlay.display = 'block';
        document.getElementById('winnerIn').innerHTML = who;
        allPlayBox.forEach((a)=> a.innerHTML = '');
        allPlayBox.forEach(a => a.id = '')
        gameBoard.animationName = ''
        }, 3000)
    }
}
reBtn.onclick = () => {
    rePlay.display = 'none';
    human.display = 'block';
    gameBoard.display = 'none';
}
function draw(a){
    let allP = []
    allBox.forEach(a => {
        if(a.childElementCount == 0)
        allP.push(a)
    });
    console.log(allP.length)
    if(allP.length == 0){
    gameBoard.display = 'none';
        rePlay.display = 'block';
        document.getElementById('winnerIn').innerHTML = a;
        allPlayBox.forEach((a)=> a.innerHTML = '');
        allPlayBox.forEach(a => a.id = '')
    }
}


