function PercentColumn(x, y, w, h, percent, color, point) {
    this.Percent = function (nVal) {
        if (nVal == undefined) return percent;
        percent = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 :
            (parseInt(nVal) > 100) ? 100 : parseInt(nVal);
        Rebuild();
    }
    this.Color = function (nVal) {
        if (nVal == undefined) return color;
        color = (nVal.search(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i) != -1) ?
            nVal.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)[0] : "#000000";
    }
    this.Point = function (nVal) {
        if (nVal == undefined) return point;
        point = (isNaN(parseInt(nVal)) || parseInt(nVal) < 1) ? 1 : parseInt(nVal);
    }
    this.Rect = function (nVal) {
        if (nVal == undefined) return rAll;
        rAll.Rect(nVal);
        Rebuild();
    }
    this.RectParam = function (nVal_x, nVal_y, nVal_w, nVal_h) {
        rAll.RectParam(nVal_x, nVal_y, nVal_w, nVal_h);
        Rebuild();
    }
    this.Print = function (ctx) {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.strokeRect(rAll.X(), rAll.Y(), rAll.W(), rAll.H());
        ctx.fillRect(rPercent.X(), rPercent.Y(), rPercent.W(), rPercent.H());
    }
    this.PrintText = function (ctx) {
        ctx.save();
        ctx.translate(rAll.X() + rAll.W() / 2, rAll.Y() + rAll.H() / 2);
        ctx.rotate(3 * Math.PI / 2);
        ctx.fillStyle = "#888";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = (rAll.W() - 10 < 0 ? 0 : t.Rect().W() - 10) + "px Arial";
        ctx.fillText(percent + "%", 0, 0);
        ctx.restore();
    }

    function Rebuild() {
        var temp = Math.floor(rAll.H() * percent / 100);
        rPercent.RectParam(rAll.X(), rAll.Y() + rAll.H() - temp, rAll.W(), temp);
    }

    var self = this;
    var rAll = new Rectangle(x, y, w, h);
    var rPercent = new Rectangle();
    (point == undefined) ? point = 0 : self.Point(point);
    (color == undefined) ? color = "#000" : self.Color(color);
    (percent == undefined) ? percent = 0 : self.Percent(percent);
}