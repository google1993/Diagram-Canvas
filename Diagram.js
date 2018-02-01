var canvas = document.getElementsByTagName("canvas")[0]; 
var but1 = document.getElementById('submit'); 

function Resize() {
    canvas.style.margin = "10px";
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 70;
}

window.addEventListener("load", Resize, false);
window.addEventListener("resize", Resize, false);

but1.onclick = function () {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 20; j++) {
            var t = new BlinkStatus(5 + 35 * i, 5 + 20 * j, 30, 15);
            t.BuildDefault();
            t.status = Math.floor(Math.random() * 4);
            t.Print(ctx);
        }
    }
}