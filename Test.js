var canvas = document.getElementsByTagName("canvas")[0]; 
var ctx = canvas.getContext("2d");

var but1 = document.getElementById('TestPercent'); 
var but2 = document.getElementById('TestProcess'); 
var but3 = document.getElementById('TestBlinkStatus'); 


function Resize() {
    canvas.style.margin = "10px";
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 70;
    ctx = canvas.getContext("2d");
}
window.addEventListener("load", Resize, false);
window.addEventListener("resize", Resize, false);


but1.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; (10 + 35 * (i + 1)) < canvas.width; i++) {
        for (var j = 0; (10 + 105 * j + 20) < canvas.height; j++) {
            var t = new PercentColumn(
                5 + 35 * i, 5 + 105 * j,
                30, ((10 + 105 * (j + 1)) <= canvas.height) ? 100 : canvas.height - 10 - 100 * j,
                Math.floor(Math.random() * 101), getRColor());
            t.Print(ctx);
        }
    }
}

but2.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; (10 + 35 * (i + 1)) < canvas.width; i++) {
        for (var j = 0; (10 + 205 * j + 100) < canvas.height; j++) {
            var t = new ProcessColumn(
                5 + 35 * i, 5 + 205 * j,
                30, ((10 + 205 * (j + 1)) <= canvas.height) ? 200 : canvas.height - 10 - 200 * j);
            for (var k = 0; k < Math.floor(Math.random() * 9 + 1); k++) {
                t.AddStatus(getRColor(), Math.floor(Math.random() * 100));
            }
            t.status = Math.floor(Math.random() * 11 + 1);
            t.percent = Math.floor(Math.random() * 101);
            t.Print(ctx);
        }
    }
}

but3.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; (10 + 35 * (i + 1)) < canvas.width; i++) {
        for (var j = 0; (10 + 20 * (j + 1)) < canvas.height; j++) {
            var t = new BlinkStatus(5 + 35 * i, 5 + 20 * j, 30, 15);
            for (var k = 0; k < 3; k++)
                t.AddStatus(getRColor());
            t.status = Math.floor(Math.random() * 4);
            t.Print(ctx);
        }
    }
}

function getRColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

