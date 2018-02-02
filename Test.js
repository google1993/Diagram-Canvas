var canvas = document.getElementsByTagName("canvas")[0]; 
var ctx = canvas.getContext("2d");

var chkText = document.getElementById('PText'); 
var chkData = document.getElementById('DefData');
var but1 = document.getElementById('TestPercent'); 
var but2 = document.getElementById('TestProcess'); 
var but3 = document.getElementById('TestBlinkStatus');
var but4 = document.getElementById('TestNumberColumn')
var but5 = document.getElementById('TestDiagramStove');

function Resize() {
    canvas.style.margin = "10px";
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 70;
    ctx = canvas.getContext("2d");
}
window.addEventListener("load", Resize, false);
window.addEventListener("resize", Resize, false);

function PrintRotateText(x, y, px, text) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(3 * Math.PI / 2);
    ctx.fillStyle = "#888";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = px + "px Arial";
    ctx.fillText(text, 0, 0);
    ctx.restore();
}
function PrintText(x, y, px, text) {
    ctx.fillStyle = "#888";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = px + "px Arial";
    ctx.fillText(text, x, y);
    ctx.restore();
}


but1.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var y = 100;
    var x = 30;
    for (var i = 0; (10 + (x + 5) * (i + 1)) < canvas.width; i++) {
        for (var j = 0; (10 + (y + 5) * j + 50) < canvas.height; j++) {
            var t = new PercentColumn(
                5 + (x + 5) * i, 5 + (y + 5) * j,
                x, 10 + (y + 5) * (j + 1) <= canvas.height ? y : canvas.height - 10 - (y + 5) * j,
                Math.floor(Math.random() * 101), chkData.checked ? "#222" : getRColor());
            t.Print(ctx);
            if (chkText.checked)
                PrintRotateText(t.rect.x + t.rect.w / 2,
                    t.rect.y + t.rect.h / 2,
                    t.rect.w - 10 < 0 ? 0 : t.rect.w - 10,
                    t.percent + "%");
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
            if (chkData.checked)
                t.BuildDefault();
            else
                for (var k = 0; k < Math.floor(Math.random() * 9 + 1); k++) {
                    t.AddRStat(getRColor(), Math.floor(Math.random() * 100));
                }

            t.status = Math.floor(Math.random() * 11 + 1);
            t.percent = Math.floor(Math.random() * 101);
            t.Print(ctx);
            if (chkText.checked)
                PrintRotateText(t.rect.x + t.rect.w / 2,
                    t.rect.y + t.rect.h / 2,
                    t.rect.w - 10 < 0 ? 0 : t.rect.w - 10,
                    t.percent + "% " + t.status + "/" + t.allStats);
        }
    }
}

but3.onclick = function () {
    var y = 15;
    var x = 30;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; (10 + (x + 5) * (i + 1)) < canvas.width; i++) {
        for (var j = 0; (10 + (y + 5) * (j + 1)) < canvas.height; j++) {
            var t = new BlinkStatus(5 + (x + 5) * i, 5 + (y + 5) * j, x, y);
            if (chkData.checked)
                t.BuildDefault();
            else
                for (var k = 0; k < 3; k++)
                    t.AddStatus(getRColor());
            t.status = Math.floor(Math.random() * 4);
            t.Print(ctx);
            if (chkText.checked)
                PrintText(t.rect.x + t.rect.w / 2,
                    t.rect.y + t.rect.h / 2 + 1,
                    t.rect.h - 2 < 0 ? 0 : t.rect.h - 2,
                    t.status + "/" + t.allStats);
        }
    }
}

but4.onclick = function () {
    var y = 20;
    var x = 30;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; (10 + (x + 5) * (i + 1)) < canvas.width; i++) {
        for (var j = 0; (10 + (y + 5) * (j + 1)) < canvas.height; j++) {
            var t = new NumberColumn(5 + (x + 5) * i, 5 + (y + 5) * j, x, y, Math.floor(Math.random() * 100));
            t.prostoy = Math.floor(Math.random() * 2);
            t.Print(ctx);
        }
    }
}

but5.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var t = new DiagramStove(0, 0, canvas.width, canvas.height);
    if (chkData.checked) {
        t.BuildDefault();
        for (var key in t._rProc) {
            t._rProc[key].status = Math.floor(Math.random() * 11 + 1);
            t._rProc[key].percent = Math.floor(Math.random() * 101);
            t._rBlink[key].status = Math.floor(Math.random() * 4);
            t._rNumb[key].prostoy = Math.floor(Math.random() * 2);
        }
    }
    else {
        var c = Math.floor(Math.random() * 100)
        for (var i = 0; i < c; i++) {
            var tP = new ProcessColumn(0,0,0,0);
            for (var j = 0; j < Math.floor(Math.random() * 9 + 1); j++) {
                tP.AddRStat(getRColor(), Math.floor(Math.random() * 100));
            }
            tP.status = Math.floor(Math.random() * 11 + 1);
            tP.percent = Math.floor(Math.random() * 101);

            var tB = new BlinkStatus(0,0,0,0);
            for (var k = 0; k < 3; k++)
                tB.AddStatus(getRColor());
            tB.status = Math.floor(Math.random() * 4);
            var tN = new NumberColumn(0, 0, 0, 0, i + 1);
            tN.prostoy = Math.floor(Math.random() * 2);
            t.AddStove(tP, tB, tN);
        }
        t.ReBuild();
    }
    t.Print(ctx);
    if (chkText.checked) {
        for (var key in t._rProc) {
            PrintRotateText(t._rProc[key].rect.x + t._rProc[key].rect.w / 2,
                t._rProc[key].rect.y + t._rProc[key].rect.h / 2 + 1,
                t._rProc[key].rect.w - 2 < 0 ? 0 :
                    t._rProc[key].rect.w > 25 ? 25 :
                        t._rProc[key].rect.w - 2,
                t._rProc[key].percent + "% " +
                t._rProc[key].status + "/" + t._rProc[key].allStats);
            PrintText(t._rBlink[key].rect.x + t._rBlink[key].rect.w / 2,
                t._rBlink[key].rect.y + t._rBlink[key].rect.h / 2 + 1,
                t._rBlink[key].rect.h - 2 < 0 ? 0 : t._rBlink[key].rect.h - 2,
                t._rBlink[key].status + "/" + t._rBlink[key].allStats);
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

