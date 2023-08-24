let inputDir={x:0,y:0};
const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
const moveSound=new Audio('move.mp3');
const musicSound=new Audio('music.mp3');
let speed=19;
let score=0;
let latPaintTime=0;
let highscoreval=0;
let snakeArr=[
    {x:13,y:15}
];
let food={x:6,y:7};
//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-latPaintTime)/1000<1/speed){
        return;
    }
    latPaintTime=ctime;
    gameEngine();
}

function isCollide(snake)
{
    for(let index=1;index<snakeArr.length;index++)
    {
        if(snake[index].x===snake[0].x&&snake[index].y===snake[0].y){
            return true;
        }
    }
        if(snake[0].x>=18||snake[0].x<=0||snake[0].y>=18||snake[0].y<=0)
        return true;
}

function gameEngine(){
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over.Press any key to play Again!!");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }

    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score++;
        if(score>highscoreval)
        {
            highscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(highscoreval));
            highscoreBox.innerHTML="HiScore: "+highscoreval;
        }
        document.getElementById('score').innerHTML="Score: "+score
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
        let a= 2;
        let b= 16;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }

    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);   
}

// main logic
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    highscoreBox.innerHTML="HiScore: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
})