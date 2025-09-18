let isMoving = false;
let shienaImg;
let hienaImg;
let maskImg;
let handImg;
let wallImg;
let px = 0;
let py = 0;
let scl = 1.0;
let scope_scale = 1.0;

function drawAll () {
    var canvas1 = document.getElementById('canvas1');
    var canvas2 = document.getElementById('canvas2');
    var ctx1 = canvas1.getContext('2d');
    var ctx2 = canvas2.getContext('2d');

    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

    ctx1.globalCompositeOperation = 'source-over';
    //ctx1.drawImage(hienaImg, 0, 0, canvas1.width, canvas1.height);
    ctx1.drawImage(hienaImg, (1.0 - scope_scale) * 0.5 * px, (1.0 - scope_scale) * 0.5 * py, canvas1.width * scope_scale, canvas1.height * scope_scale);

    ctx1.globalCompositeOperation = 'destination-in';
    ctx1.drawImage(maskImg, px - canvas1.width * scl * 0.5, py - canvas1.height * scl * 0.5, canvas1.width * scl, canvas1.height * scl);

    ctx1.globalCompositeOperation = 'source-over';
    ctx1.drawImage(handImg, px - canvas1.width * scl * 0.5, py - canvas1.height * scl * 0.5, canvas1.width * scl, canvas1.height * scl);

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
        px = e.offsetX;
        py = e.offsetY;
        drawAll();
    });
    canvas.addEventListener("mousedown", (e) => {
        isMoving = true;
        px = e.offsetX;
        py = e.offsetY;
        drawAll();
    });
    canvas.addEventListener("mouseup", (e) => {
        isMoving = false;
        px = e.offsetX;
        py = e.offsetY;
        drawAll();
    });
    canvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        scl += e.deltaY * -0.001;
        if (scl > 3.0) scl = 3.0;
        if (scl < 1.0) scl = 1.0;
        scope_scale = (scl - 1.0) / 2.0 * 0.2 + 1.0;
        drawAll();
    }, {passive: false});
};
function first_draw () {
    var canvas2 = document.getElementById('canvas2');
    var ctx2 = canvas2.getContext('2d');

    hienaImg = new Image();
    hienaImg.src = './ginkai3.png';
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
    shienaImg.src = './ginkai1.png';

    var drawWall = function () {
        ctx2.globalCompositeOperation = 'source-over';
        wallImg = new Image();
        wallImg.onload = function () {
            ctx2.drawImage(wallImg, 0, 0, canvas2.width, canvas2.height);
        };
        wallImg.src = './wall.png';
    };
};

init();
first_draw();