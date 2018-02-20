var canvas = document.getElementsByTagName("canvas")[0]; 
var ctx = canvas.getContext("2d");

var chkText = document.getElementById('PText'); 
var chkData = document.getElementById('DefData');
var chkloop = document.getElementById('ChkLoop');

var legend1 = document.getElementById("legend1");
var legend2 = document.getElementById("legend2");
var dateupdate = document.getElementById("DateUpdate");

var but1 = document.getElementById('TestPercent'); 
var but2 = document.getElementById('TestProcess'); 
var but3 = document.getElementById('TestBlinkStatus');
var but4 = document.getElementById('TestNumberColumn')
var but5 = document.getElementById('TestDiagramStove');

var but6 = document.getElementById('TestPost');
var text = document.getElementById('TestDiv');

var diagramStove = new Diagram(0, 0, canvas.width, canvas.height);
diagramStove.BuildDefault();

function Resize() {

    if (window.innerWidth > window.innerHeight) {
        canvas.style.margin = "10px 0px 10px 10px";
        canvas.width = window.innerWidth - 20;
        canvas.height = window.innerHeight - legend1.offsetHeight - legend2.offsetHeight - buttons.offsetHeight - 60;
        diagramStove.Rotate = 0;
        diagramStove.RectParam(0, 0, canvas.width, canvas.height);
    }
    else {
        canvas.style.margin = "10px 0px 27px 10px";
        canvas.width = window.innerWidth - 37;
        canvas.height = (window.innerHeight - 70) * Math.floor(diagramStove.ProcessCount() / 13);
        diagramStove.Rotate = 1;
        diagramStove.RectParam(0, 0, canvas.height, canvas.width);
    }
    ctx = canvas.getContext("2d");

    diagramStove.Print(ctx);
    if (chkText.checked) {
        diagramStove.PrintText(ctx);
    }
}
window.addEventListener("load", Resize, false);
window.addEventListener("resize", Resize, false);

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
                t.PrintText(ctx);
        }
    }
}
but2.onclick = function () {
    var y = 200;
    var x = 30;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; (10 + (x + 5) * (i + 1)) < canvas.width; i++) {
        for (var j = 0; (10 + (y + 5) * (j + 1)) < canvas.height; j++) {
            var t = new ProcessColumn(
                5 + (x + 5) * i, 5 + (y + 5) * j,
                x, ((10 + (y + 5) * (j + 1)) <= canvas.height) ? y : canvas.height - x - y * j);
            if (chkData.checked)
                t.BuildDefault();
            else
                for (var k = 0; k < Math.floor(Math.random() * 9 + 1); k++) {
                    t.AddRStat(getRColor(), Math.floor(Math.random() * 100));
                }

            t.Status(Math.floor(Math.random() * 11 + 1));
            t.Percent(Math.floor(Math.random() * 101));
            t.Print(ctx);
            if (chkText.checked)
                t.PrintText(ctx);
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
            t.Status(Math.floor(Math.random() * 4));
            t.Print(ctx);
            if (chkText.checked)
                t.PrintText(ctx);
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
            t.Prostoy(Math.floor(Math.random() * 2));
            t.Print(ctx);
        }
    }
}

but5.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var t = new Diagram(0, 0, canvas.width, canvas.height);
    if (chkData.checked) {
        t.BuildDefault();
        for (var i = 0; i < t.ProcessCount(); i++) {
            t.ChangeStatProc(i, Math.floor(Math.random() * 11 + 1), Math.floor(Math.random() * 101));
            t.ChangeStatBlink(i, Math.floor(Math.random() * 4));
            t.ChangeStatNumb(i, Math.floor(Math.random() * 2));
        }
    }
    else {
        var c = Math.floor(Math.random() * 100)
        for (var i = 0; i < c; i++) {
            var tP = new ProcessColumn(0,0,0,0);
            for (var j = 0; j < Math.floor(Math.random() * 9 + 1); j++) {
                tP.AddRStat(getRColor(), Math.floor(Math.random() * 100));
            }
            tP.Status(Math.floor(Math.random() * 11 + 1));
            tP.Percent(Math.floor(Math.random() * 101));

            var tB = new BlinkStatus(0,0,0,0);
            for (var k = 0; k < 3; k++)
                tB.AddStatus(getRColor());
            tB.Status(Math.floor(Math.random() * 4));
            var tN = new NumberColumn(0, 0, 0, 0, i + 1);
            tN.Prostoy(Math.floor(Math.random() * 2));
            t.AddStove(tP, tB, tN);
        }
    }
    t.Print(ctx);
    if (chkText.checked) {
        t.PrintText(ctx);
    }
}

but6.onclick = function () {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'getinfo', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
            return;
        }
        var Pech = JSON.parse(xhr.responseText);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //var c = Pech[0].DateUpdate;
        for (var i = 1; i <= diagramStove.ProcessCount(); i++) {
            diagramStove.ChangeStatBlink(i, Pech[i].Bstatus);
            diagramStove.ChangeStatProc(i, Pech[i].Pstatus);
            diagramStove.ChangeStartDate(i, ConvDate(Pech[i].Start));
            diagramStove.ChangeEndDate(i, ConvDate(Pech[i].EndTeor));
        }
        //diagramStove.Print(ctx);

        var b = ConvDate(Pech[0].DateNow);
        dateupdate.innerHTML =
            b.getFullYear() + "." +
            FNL(b.getMonth() + 1, 2) + "." +
            FNL(b.getDate(), 2) + "  " +
            FNL(b.getHours(), 2) + ":" +
            FNL(b.getMinutes(), 2) + ":" +
            FNL(b.getSeconds(), 2);
        //if (chkText.checked) {
        //    diagramStove.PrintText(ctx);
        //}
        if (chkloop.checked) {
            setTimeout(but6.onclick, 60000);
            but6.disabled = true;
        } else {
            but6.disabled = false;
        }
        PrintCycle();
    }
}

function PrintCycle() {
    diagramStove.Print(ctx);
    if (chkText.checked) {
        diagramStove.PrintText(ctx);
    }
    if (but6.disabled)
        setTimeout(PrintCycle, 1000);
}

function FNL(a, b) {
    for (var d = "" + a; d.length < b;)d = "0" + d; return d
}
function ConvDate(a) {
    a = a.split(".")[0].split("T");
    var d = a[0].split("-");
    var h = a[1].split(":");
    var date = new Date(d[0], parseInt(d[1]) - 1, d[2], h[0], h[1], h[2]);
    return  date;
}
function getRColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
