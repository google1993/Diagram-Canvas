class BlinkStatus {
    constructor(x, y, w, h) {
        this._rMain = new Rectangle(x, y, w, h);
        this._statusColor = [];
        this._status = 0;
    }

    get status() { return this._status; }
    set status(nVal) {
        this._status = (isNaN(nVal) || parseInt(nVal) < 0) ? 0 :
            parseInt(nVal) > this._statusColor.length ? this._statusColor.length :
                parseInt(nVal);
    }

    AddStatus(color) {
        var c = (color.search(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i) != -1) ?
            color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)[0] : "#000000";
        this._statusColor.push(c);
    }

    DelStatus() {
        if (this._statusColor.length > 0)
            this._statusColor.pop();
    }

    ChangeRect(nVal) {
        this._rMain.Change(nVal);
    }

    Print(ctx) {
        if (this._status > 0)
            ctx.fillStyle = this._statusColor[this._status - 1];
        else
            ctx.fillStyle = "#aaa";
        ctx.fillRect(this._rMain.x, this._rMain.y, this._rMain.w, this._rMain.h);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(this._rMain.x, this._rMain.y, this._rMain.w, this._rMain.h);
    }

    BuildDefault() {
        var defaultColor = ["#00f", "#0f0", "#f00"];
        for (var i = 0; i < defaultColor.length; i++)
            this.AddStatus(defaultColor[i]);
    };


}

