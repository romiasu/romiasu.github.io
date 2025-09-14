let isMoving = false;
let shienaImg;
let hienaImg;
let maskImg;
let handImg;
let wallImg;

function drawAll (x, y) {
    var canvas1 = document.getElementById('canvas1');
    var canvas2 = document.getElementById('canvas2');
    var ctx1 = canvas1.getContext('2d');
    var ctx2 = canvas2.getContext('2d');

    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    ctx1.globalCompositeOperation = 'source-over';
    ctx1.drawImage(hienaImg, 0, 0, canvas1.width, canvas1.height);

    ctx1.globalCompositeOperation = 'destination-in';
    ctx1.drawImage(maskImg, x, y, canvas1.width, canvas1.height);

    ctx1.globalCompositeOperation = 'source-over';
    ctx1.drawImage(handImg, x, y, canvas1.width, canvas1.height);

    ctx1.globalCompositeOperation = 'source-over';
    ctx1.drawImage(wallImg, 0, 0, canvas1.width, canvas1.height);

    ctx1.globalCompositeOperation = 'destination-over';
    ctx1.drawImage(shienaImg, 0, 0, canvas1.width, canvas1.height);

    var dat = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    ctx2.putImageData(dat, 0, 0);
};
function init () {
    var canvas = document.getElementById('canvas2');
    canvas.addEventListener("mousemove", (e) => {
        if (!isMoving) return;
        let x = e.offsetX - canvas.width * 0.5;
        let y = e.offsetY - canvas.height * 0.5;
        drawAll(x + 50, y + 100);
    });
    canvas.addEventListener("mousedown", (e) => {
        isMoving = true;
        let x = e.offsetX - canvas.width * 0.5;
        let y = e.offsetY - canvas.height * 0.5;
        drawAll(x + 50, y + 100);
    });
    canvas.addEventListener("mouseup", (e) => {
        isMoving = false;
        let x = e.offsetX - canvas.width * 0.5;
        let y = e.offsetY - canvas.height * 0.5;
        drawAll(x + 50, y + 100);
    });
};
function first_draw () {
    var canvas2 = document.getElementById('canvas2');
    var ctx2 = canvas2.getContext('2d');

    hienaImg = new Image();
    hienaImg.src = './hiena.png';
    maskImg = new Image();
    maskImg.src = './mask.png';
    handImg = new Image();
    handImg.src = './hand.png';

    shienaImg = new Image();
    shienaImg.onload = function () {

        ctx2.globalCompositeOperation = 'source-over';
        ctx2.drawImage(shienaImg, 0, 0, canvas2.width, canvas2.height);
        drawWall();
    };
    shienaImg.src = './shiena.png';

    var drawWall = function () {
        ctx2.globalCompositeOperation = 'source-over';
        wallImg = new Image();
        wallImg.onload = function () {
            ctx2.drawImage(wallImg, 0, 0, canvas2.width, canvas2.height);
        };
        wallImg.src = './wall2.png';
    };
};

init();
first_draw();