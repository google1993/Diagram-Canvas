var canvas = document.getElementsByTagName("canvas")[0]; 
var but1 = document.getElementById('submit'); 

function Resize() {
    canvas.style.margin = "10px";
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 70;
}

window.addEventListener("load", Resize, false);
window.addEventListener("resize", Resize, false);

var t = new ProcessColumn(5, 5, 20, 400);
t.BuildDefault();
var pers = 0;
var status = 1;
but1.onclick = function () {
    if (pers > 100) {
        pers = 0;
        status++;
    }
    else {
        pers += 10;
    }
    t.status = status;
    t.percent = pers;

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    t.Print(ctx);
}