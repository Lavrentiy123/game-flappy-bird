//создаем канвас
var cvs = document.getElementById("canvas");
//вид игры:
var ctx = cvs.getContext("2d");

//создаем объекты
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "flappy_bird_bird.png";
bg.src = "flappy_bird_bg.png";
fg.src = "flappy_bird_fg.png";
pipeUp.src = "flappy_bird_pipeUp.png";
pipeBottom.src = "flappy_bird_pipeBottom.png";

// Звуковые файлы
//var fly = new Audio();
var score_audio = new Audio();

//fly.src = "js_game_audio/fly.mp3";
score_audio.src = "js_game_audio/score.mp3";

var gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp); //отслеживаем какое-либо дейтвие


// за что отвечает функция moveup
function moveUp() {
 yPos -= 26;    // поднимает на 25 единиц выше 
 //fly.play();
}

// Создание блоков
var pipe = [];    //создаем массив пустой

pipe[0] = {
 x : cvs.width, //за экраном находится 
 y : 0
}

var score = 0;

// Позиция птицы

var xPos = 10;
var yPos = 150;
var grav = 1;

//рисуем объекты в канвасе
function draw() {
 ctx.drawImage(bg, 0, 0);  //рисуем картинку

//i идет от 0 до количесва эллементов в массиве
 for(var i = 0; i < pipe.length; i++) {

//используем координаты из массива
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y); 
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x--;

// новые блоки - постоянное их создание + добавляем новый эллемент

 if(pipe[i].x == 125) {
 pipe.push({
 x : cvs.width,//ширина
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height //случайное число (случайное место появления блоков)
 });
 }

 // Отслеживание прикосновений (столкновений)

 //с блоками и землей

 if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
 location.reload(); // Перезагрузка страницы
 }

//количество очков

 if(pipe[i].x == 5) {
 score++;
 score_audio.play();
 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);

 yPos += grav; //увелич на 1.5

 ctx.fillStyle = "#red";
 ctx.font = "27px Verdana";
 ctx.fillText("Счет: " + score, 10, cvs.height - 20);

 requestAnimationFrame(draw); //постоянно метод ctx.drawImage
}

pipeBottom.onload = draw;
//используется чтобы все изображения были загружены и только поcле мы видели риунок

