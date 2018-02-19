function BlinkStatus(x, y, w, h) {
    this.Status = function (nVal) {
        if (nVal == undefined) return status;
        status = (isNaN(nVal) || parseInt(nVal) < 0) ? 0 :
            parseInt(nVal) > statColor.length ? statColor.length : parseInt(nVal);
    }
    this.Rect = function (nVal) {
        if (nVal == undefined) return rAll;
        rAll.Rect(nVal);
    }
    this.RectParam = function (x, y, w, h) {
        rAll.RectParam(x, y, w, h);
    }
    this.BuildDefault = function () {
        var defaultColor = ["#00f", "#f00", "#0f0"];
        for (var i = 0; i < defaultColor.length; i++)
            self.AddStatus(defaultColor[i]);
    }

    this.AddStatus = function (color, index) {
        var c = (color.search(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i) != -1) ?
            color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)[0] : "#000000";
        if (index == undefined || isNaN(parseInt(index)) ||
            parseInt(index) - 1 < 0 || parseInt(index) - 1 > statColor.length)
            statColor.push(c);
        else
            statColor.splice(parseInt(index) - 1, 0, c);
        status = 0;
    }
    this.ChangeStatus = function (color, index) {
        var c = (color.search(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i) != -1) ?
            color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)[0] : "#000000";
        if (index != undefined && !isNaN(parseInt(index)) &&
            parseInt(index) > 0 && parseInt(index) <= statColor.length)
            statColor.splice(parseInt(index) - 1, 1, c);
    }
    this.DelStatus = function (index) {
        if (statColor.length > 0){
            if (index == undefined || isNaN(parseInt(index)) ||
                parseInt(index) - 1 < 0 || parseInt(index) - 1 > statColor.length)
                statColor.splice(parseInt(index) - 1, 1);
            else
                statColor.pop();
            status = 0;
        }
    }
    this.Print = function (ctx) {
        ctx.fillStyle = status > 0 ? statColor[status - 1] : "#ddd";
        ctx.fillRect(rAll.X(), rAll.Y(), rAll.W(), rAll.H());
        ctx.strokeStyle = "#333";
        ctx.strokeRect(rAll.X(), rAll.Y(), rAll.W(), rAll.H());
    }
    this.PrintText = function (ctx) {
        ctx.fillStyle = "#888";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = (rAll.H() - 2 < 0 ? 0 : rAll.H() - 2) + "px Arial";
        ctx.fillText(status + "/" + statColor.length, rAll.X() + rAll.W() / 2, rAll.Y() + rAll.H() / 2 + 1);
    }

    var self = this;
    var rAll = new Rectangle(x, y, w, h);
    var statColor = [];
    var status = 0;
}