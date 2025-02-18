let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let bugSize = 50;
let score = 0;
let bugX = Math.floor(Math.random() * (canvas.width - bugSize));
let bugY = Math.floor(Math.random() * (canvas.height - bugSize));
let hopInterval = 1000; 

let img = new Image();
img.src = 'grass.jpg'; 

let bugImage = new Image();
bugImage.src = 'bug.png'; 

img.onload = function() {
    drawBackground();
    drawBug();
}

function drawBackground() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function drawBug() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    ctx.drawImage(bugImage, bugX, bugY, bugSize, bugSize);
}

function moveBug() {
    bugX = Math.floor(Math.random() * (canvas.width - bugSize));
    bugY = Math.floor(Math.random() * (canvas.height - bugSize));
    drawBug();
}

canvas.addEventListener("click", function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    if (x > bugX && x < bugX + bugSize && y > bugY && y < bugY + bugSize) {
        score++;
        document.getElementById("score").textContent = score;
        if (hopInterval > 100) {
            hopInterval -= 50;
        }
        clearInterval(hopTimer);
        hopTimer = setInterval(moveBug, hopInterval);
    }
});

function resetSpeed() {
    clearInterval(hopTimer);
    hopInterval = 1000;
    hopTimer = setInterval(moveBug, hopInterval);
}

function resetScore() {
    score = 0;
    document.getElementById("score").textContent = score;
}

let hopTimer = setInterval(moveBug, hopInterval);
drawBug();
