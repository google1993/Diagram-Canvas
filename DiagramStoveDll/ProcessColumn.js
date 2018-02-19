function ProcessColumn(x, y, w, h) {
    this.Percent = function (nVal) {
        if (nVal == undefined) return percent;
        percent = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 :
            (parseInt(nVal) > 100) ? 100 : parseInt(nVal);
        Restat();
    }
    this.Status = function (nVal) {
        if (nVal == undefined) return status;
        status = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 :
            (parseInt(nVal) > rStat.length) ? rStat.length : parseInt(nVal);
        Restat();
    }
    this.Rect = function (nVal) {
        if (nVal == undefined) return rAll;
        rAll.Rect(nVal);
        Rebuild();
    }
    this.RectParam = function (x, y, w, h) {
        rAll.RectParam(x, y, w, h);
        Rebuild();
    }

    this.AddRStat = function (color, point, index) {
        if (index == undefined || isNaN(parseInt(index)) ||
            parseInt(index) - 1 < 0 || parseInt(index) - 1 > rStat.length)
            rStat.push(new PercentColumn(0, 0, 0, 0, 0, color, point));
        else
            rStat.splice(parseInt(index) - 1, 0, new PercentColumn(0, 0, 0, 0, 0, color, point));
        Rebuild();
    }
    this.ChangeRStat = function (index, color, point) {
        if (index != undefined && !isNaN(parseInt(index)) && parseInt(index) > 0 && parseInt(index) <= rStat.length) {
            rStat[parseInt(index) - 1].Color(color);
            rStat[parseInt(index) - 1].Point(point);
            Rebuild();
        }
    }
    this.DelRStat = function (index) {
        if (index == null || index == undefined || index <= 0 || index > rStat.length) {
            if (rStat.length > 0) rStat.pop();
        }
        else
            rStat.splice(index - 1, 1);
        status = 0;
        Rebuild();
    }

    this.BuildDefault = function () {
        var defaultPoint = [57, 49, 49, 71, 28, 49, 21, 171, 114, 103];
        var defaultColor = ["#0ff", "#00f", "#f00", "#0f0", "#0ff", "#00f", "#8500b6", "#f00", "#f0f", "#0f0"]
        for (var i = 0; i < defaultPoint.length; i++)
            self.AddRStat(defaultColor[i], defaultPoint[i]);
        Rebuild();
    };
    this.Print = function (ctx) {
        ctx.clearRect(rAll.X() - 1, rAll.Y() - 1, rAll.W() + 2, rAll.H() + 2);
        ctx.fillStyle = "#ddd";
        ctx.fillRect(rAll.X(), rAll.Y(), rAll.W(), rAll.H());
        for (var i = 0; i < rStat.length; i++)
            if (i < status)
                rStat[i].Print(ctx);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(rAll.X(), rAll.Y(), rAll.W(), rAll.H());
    }
    this.PrintText = function (ctx) {
        ctx.save();
        ctx.translate(rAll.X() + rAll.W() / 2, rAll.Y() + rAll.H() / 2);
        ctx.rotate(3 * Math.PI / 2);
        ctx.fillStyle = "#888";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = (rAll.W() - 10 < 0 ? 0 : rAll.W() - 10) + "px Arial";
        ctx.fillText(percent + "% " + status + "/" + rStat.length, 0, 0);
        ctx.restore();
    }

    function AllPoint() {
        var count = 0;
        for (var i = 0; i < rStat.length; i++)
            count += rStat[i].Point();
        return count;
    }
    function corrStat() {
        var temp = 0;
        for (var i = 0; i < rStat.length; i++)
            temp += Math.floor((rAll.H() - (rStat.length + 1)) * rStat[i].Point() / AllPoint());
        return rAll.H() - (rStat.length + 1 + temp);
    }
    function Restat() {
        for (var i = 1; i < rStat.length + 1; i++) {
            rStat[i - 1].Percent(i < status ? 100 :
                i == status ? percent : 0);
        }
    }
    function Rebuild() {
        var coorY = rAll.Y() + 1;
        for (var i = rStat.length - 1; i >= 0; i--) {
            var stepY = Math.floor((rAll.H() - (rStat.length + 1)) * rStat[i].Point() / AllPoint());
            stepY += i < corrStat() ? 1 : 0;
            rStat[i].RectParam(rAll.X() + 1, coorY, rAll.W() - 2, stepY);
            coorY += stepY + 1;
        }
        Restat();
    }

    var self = this;
    var rAll = new Rectangle(x, y, w, h);
    var rStat = [];
    var percent = 0;
    var status = 0;
}