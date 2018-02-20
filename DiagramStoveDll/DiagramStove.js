function Diagram(x, y, w, h) {
    this.minBoardW = function () { return rProc.length * 8 + 5; }
    this.minBoardH = function () { return 141; }
    this.Rotate = 0;

    this.Rect = function (nVal) {
        if (nVal == undefined) return rAll;
        self.RectParam(nVal.X(), nVal.Y(), nVal.W(), nVal.H());
    }
    this.RectParam = function (x, y, w, h) {
        rAll.RectParam(x, y, w < self.minBoardW() ? self.minBoardW() : w, h < self.minBoardH() ? self.minBoardH() : h);
        Rebuild();
    }

    this.ProcessCount = function () {
        return rProc.length;
    }

    this.AddStove = function (Process, Blink, Numb, index) {
        if (index == undefined || isNaN(parseInt(index)) ||
            parseInt(index) - 1 < 0 || parseInt(index) - 1 > rProc.length) {
            rProc.push(Process);
            rBlink.push(Blink);
            rNumb.push(Numb);
            pStart.push(new Date());
            pEnd.push(new Date());
            pFlag.push(0);
        }
        else {
            rProc.splice(parseInt(index) - 1, 0, Process);
            rBlink.splice(parseInt(index) - 1, 0, Blink);
            rNumb.splice(parseInt(index) - 1, 0, Numb);
            pStart.splice(parseInt(index) - 1, 0, new Date());
            pEnd.splice(parseInt(index) - 1, 0, new Date());
            pFlag.splice(parseInt(index) - 1, 0, 0);
        }
        Rebuild();
    }
    this.ChangeStove = function (Process, Blink, Numb, index) {
        if (index != undefined && !isNaN(parseInt(index)) &&
            parseInt(index) > 0 && parseInt(index) <= rProc.length) {
            rProc.splice(parseInt(index) - 1, 0, Process);
            rBlink.splice(parseInt(index) - 1, 0, Blink);
            rNumb.splice(parseInt(index) - 1, 0, Numb);
            pStart.splice(parseInt(index) - 1, 0, new Date());
            pEnd.splice(parseInt(index) - 1, 0, new Date());
            pFlag.splice(parseInt(index) - 1, 0, 0);
        }
        Rebuild();
    }
    this.DelStove = function (index) {
        if (rProc.length > 0) {
            if (index == undefined || isNaN(parseInt(index)) ||
                parseInt(index) - 1 < 0 || parseInt(index) - 1 > rProc.length) {
                rProc.splice(parseInt(index) - 1, 1);
                rBlink.splice(parseInt(index) - 1, 1);
                rNumb.splice(parseInt(index) - 1, 1);
                pStart.splice(parseInt(index) - 1, 1);
                pEnd.splice(parseInt(index) - 1, 1);
                pFlag.splice(parseInt(index) - 1, 1);
            }
            else {
                rProc.pop();
                rBlink.pop();
                rNumb.pop();
                pStart.pop();
                pEnd.pop();
                pFlag.pop();
            }
        }
        Rebuild();
    }

    this.ChangeStatProc = function (index, status, percent) {
        if (index != undefined && !isNaN(parseInt(index)) &&
            parseInt(index) > 0 && parseInt(index) <= rProc.length) {
            rProc[parseInt(index) - 1].Status(status);
            if (percent != undefined)
                rProc[parseInt(index) - 1].Percent(percent);
        }
    }
    this.ChangeStatBlink = function (index, status) {
        if (index != undefined && !isNaN(parseInt(index)) &&
            parseInt(index) > 0 && parseInt(index) <= rBlink.length)
            rBlink[parseInt(index) - 1].Status(status);
    }
    this.ChangeStatNumb = function (index, prostoy) {
        if (index != undefined && !isNaN(parseInt(index)) &&
            parseInt(index) > 0 && parseInt(index) <= rNumb.length)
            rNumb[parseInt(index) - 1].Prostoy(prostoy);
    }
    this.ChangeControllPercent = function (index, b) {
        if (index != undefined && !isNaN(parseInt(index)) &&
            parseInt(index) > 0 && parseInt(index) <= pFlag.length)
            pFlag[parseInt(index) - 1] = (isNaN(parseInt(b)) || parseInt(b) != 1) ? 0 : 1;
    }
    this.ChangeStartDate = function (index, dStart) {
        if (index != undefined && !isNaN(parseInt(index)) &&
            parseInt(index) > 0 && parseInt(index) <= pStart.length)
            pStart[parseInt(index) - 1] = dStart;
        CountPercent(1);
    }
    this.ChangeEndDate = function (index, dEnd) {
        if (index != undefined && !isNaN(parseInt(index)) &&
            parseInt(index) > 0 && parseInt(index) <= pEnd.length)
            pEnd[parseInt(index) - 1] = dEnd;
        CountPercent(1);
    }

    this.BuildDefault = function () {
        while (rProc.length < 48) {
            rProc.push(new ProcessColumn(0, 0, 0, 0))
            rProc[rProc.length - 1].BuildDefault();
            rBlink.push(new BlinkStatus(0, 0, 0, 0));
            rBlink[rProc.length - 1].BuildDefault();
            rNumb.push(new NumberColumn(0, 0, 0, 0, rProc.length));
            pStart.push(new Date());
            pEnd.push(new Date());
            pFlag.push(1);
        }
        Rebuild();
    };

    this.Print = function (ctx) {
        ctx.save();
        if (self.Rotate != 0) {
            ctx.translate(rAll.H(), 0);
            ctx.rotate(- 3 * Math.PI / 2);
        }
        ctx.clearRect(rAll.X() - 1, rAll.Y() - 1, rAll.W() + 2, rAll.H() + 2);
        ctx.fillStyle = "#ddd";
        ctx.fillRect(rAll.X(), rAll.Y(), rAll.W(), rAll.H());
        for (var i = 0; i < rProc.length; i++) {
            rProc[i].Print(ctx);
            rBlink[i].Print(ctx);
            rNumb[i].Print(ctx, self.Rotate);
        }
        ctx.strokeStyle = "#333";
        ctx.strokeRect(rAll.X(), rAll.Y(), rAll.W(), rAll.H());
        ctx.restore();
    }
    this.PrintText = function (ctx) {
        ctx.save();
        if (self.Rotate != 0) {
            ctx.translate(rAll.H(), 0);
            ctx.rotate(- 3 * Math.PI / 2);
        }
        for (var i = 0; i < rProc.length; i++) {
            rProc[i].PrintText(ctx);
            rBlink[i].PrintText(ctx, self.Rotate);
        }
        ctx.restore();
    }

    function Rebuild() {
        var coorX = rAll.X() + 4;
        var coorYP = rAll.Y() + 4;
        var coorYB = rAll.Y() + rAll.H() - 34;
        var coorYN = rAll.Y() + rAll.H() - 21;
        var correctX = rProc.length == 0 ? 0 : (rAll.W() - 2 - (rProc.length + 1) * 3) % rProc.length;
        var stepYP = rAll.H() - 41;
        var stepYB = 10;
        var stepYN = 17;

        for (var i = 0; i < rProc.length; i++) {
            var stepX = Math.floor((rAll.W() - 2 - (rProc.length + 1) * 3) / rProc.length);
            stepX = i < correctX ? stepX + 1 : stepX;
            rProc[i].RectParam(coorX, coorYP, stepX, stepYP);
            rBlink[i].RectParam(coorX, coorYB, stepX, stepYB);
            rNumb[i].RectParam(coorX, coorYN, stepX, stepYN);
            coorX += stepX + 3;
        }
    }
    function CountPercent(b) {
        for (var i = 0; i < rProc.length; i++){
            if (pFlag[i] == 1) {
                var full = pEnd[i] - pStart[i];
                full = full == 0 ? 1 : full;
                var now = new Date() - pStart[i];
                var percent = Math.floor(now * 100 / full);
                rProc[i].Percent(percent);
                rNumb[i].Prostoy(percent > 100 ? 1 : 0);
            }
        }
        if (b == undefined)
            setTimeout(CountPercent, 1000);
    }

    var self = this;
    var rProc = [];
    var rBlink = [];
    var rNumb = [];
    var pStart = [];
    var pEnd = [];
    var pFlag = [];
    var rAll = new Rectangle(0, 0, 0, 0);
    self.RectParam(x, y, w, h);
    setTimeout(CountPercent, 1000);
}