//Global Params
var dateNowHTML = document.getElementById("DateTimeNow");
var dateUpdateHTML = document.getElementById("DateUpdate");


var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

var diagramStove = new Diagram(0, 0, canvas.width, canvas.height);
var update_button = document.getElementById("Update_Button");
//Global Params

//Start Show Date Now
function PrintDateNow() {
    var b = new Date();
    dateNowHTML.innerHTML =
        b.getFullYear() + "." +
        FNL(b.getMonth() + 1, 2) + "." +
        FNL(b.getDate(), 2) + "  " +
        FNL(b.getHours(), 2) + ":" +
        FNL(b.getMinutes(), 2) + ":" +
        FNL(b.getSeconds(), 2);
    setTimeout(PrintDateNow, 1000);
}
function FNL(a, b) {
    for (var d = "" + a; d.length < b;)d = "0" + d; return d
}
PrintDateNow();
//End Show Date Now

//Start Resize Canvas
function Resize() {
    if (window.innerWidth > window.innerHeight) {
        canvas.height = window.innerHeight - 20
            - document.getElementById("First_Head").offsetHeight
            - document.getElementById("Second_Head").offsetHeight
            - document.getElementById("Third_Head").offsetHeight;
        canvas.width = document.getElementById("Canvas_Body").offsetWidth;
        diagramStove.Rotate = 0;
        diagramStove.RectParam(0, 0, canvas.width, canvas.height);
    }
    else {
        canvas.height = diagramStove.ProcessCount() * 25;
        canvas.width = document.getElementById("Canvas_Body").offsetWidth;
        diagramStove.Rotate = 1;
        diagramStove.RectParam(0, 0, canvas.height, canvas.width);
    }
    ctx = canvas.getContext("2d");
    diagramStove.Print(ctx);
}
window.addEventListener("load", Resize, false);
window.addEventListener("resize", Resize, false);
//End Resize Canvas

//Start Update Status
diagramStove.BuildDefault();
function UpdateStatus() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'getinfo', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            document.getElementById("Error_Message").innerHTML = "Не удается установить соединение";
            $("#Error_Border").show();
            $("#Update_Button").show();
            return;
        }
        var Pech = JSON.parse(xhr.responseText);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 1; i <= diagramStove.ProcessCount(); i++) {
            diagramStove.ChangeStatBlink(i, Pech[i].Bstatus);
            diagramStove.ChangeStatProc(i, Pech[i].Pstatus);
            diagramStove.ChangeStartDate(i, ConvDate(Pech[i].Start));
            diagramStove.ChangeEndDate(i, ConvDate(Pech[i].EndTeor));
        }
        var b = ConvDate(Pech[0].DateNow);
        dateUpdateHTML.innerHTML =
            b.getFullYear() + "." +
            FNL(b.getMonth() + 1, 2) + "." +
            FNL(b.getDate(), 2) + "  " +
            FNL(b.getHours(), 2) + ":" +
            FNL(b.getMinutes(), 2) + ":" +
            FNL(b.getSeconds(), 2);
        setTimeout(UpdateStatus, 60000);
        PrintCycle();
        $("#Error_Border").hide();
    }
}
UpdateStatus();

function PrintCycle() {
    diagramStove.Print(ctx);
    setTimeout(PrintCycle, 1000);
}
PrintCycle();

function ConvDate(a) {
    a = a.split(".")[0].split("T");
    var d = a[0].split("-");
    var h = a[1].split(":");
    var date = new Date(d[0], parseInt(d[1]) - 1, d[2], h[0], h[1], h[2]);
    return date;
}

update_button.onclick = function () {
    UpdateStatus();
}
//End Update Status
