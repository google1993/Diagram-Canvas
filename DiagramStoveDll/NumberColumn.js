function NumberColumn(x, y, w, h, number) {
    this.Number = function (nVal) {
        if (nVal == undefined) return number;
        number = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 : parseInt(nVal);
    }
    this.Prostoy = function (nVal) {
        if (nVal == undefined) return nVal;
        prostoy = (isNaN(nVal) || parseInt(nVal) != 1) ? 0 : 1;
    }
    this.Rect = function (nVal) {
        if (nVal == undefined) return rAll;
        rAll.Rect(nVal);
    }
    this.RectParam = function (x, y, w, h) {
        rAll.RectParam(x, y, w, h);
    }
    this.Print = function (ctx, rotate) {
        ctx.fillStyle = prostoy == 0 ? "#ff0" : "#ff8000";
        ctx.fillRect(rAll.X(), rAll.Y(), rAll.W(), rAll.H());
        ctx.strokeStyle = "#333";
        ctx.strokeRect(rAll.X(), rAll.Y(), rAll.W(), rAll.H());
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var px = rAll.H() < rAll.W() ? rAll.H() - 3 : rAll.W() - 3;
        ctx.save();
        ctx.translate(rAll.X() + rAll.W() / 2, rAll.Y() + 1 + rAll.H() / 2);
        if (rotate != 0) {
            ctx.translate(+1,0);
            ctx.rotate(3 * Math.PI / 2);
        }
        px = px < 0 ? 0 : px;
        ctx.font = px + "px Arial";
        ctx.fillText(number, 0, 0);
        ctx.restore();
    }

    var self = this;
    var rAll = new Rectangle(x, y, w, h);
    var prostoy = 0;
    (number == undefined) ? number = 0 : self.Number(number);
}
