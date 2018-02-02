class BlinkStatus {
    constructor(x, y, w, h) {
        this._rAll = new Rectangle(x, y, w, h);
        this._statusColor = [];
        this._status = 0;
    }

    get allStats() {
        return this._statusColor.length;
    }
    get status() {
        return this._status;
    }
    get rect() {
        return this._rAll;
    }

    set status(nVal) {
        this._status = (isNaN(nVal) || parseInt(nVal) < 0) ? 0 :
            parseInt(nVal) > this._statusColor.length ? this._statusColor.length :
                parseInt(nVal);
    }
    set rect(nVal) {
        this._rAll.Change(nVal);
    }

    AddStatus(color) {
        var c = (color.search(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i) != -1) ?
            color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)[0] : "#000000";
        this._statusColor.push(c);
    }
    DelStatus() {
        if (this._statusColor.length > 0)
            this._statusColor.pop();
        this._status = 0;
    }

    Change(x, y, w, h) {
        this._rAll.ChangeParam(x, y, w, h);
    }

    Print(ctx) {
        ctx.fillStyle = this._status > 0 ? this._statusColor[this._status - 1] : "#aaa";
        ctx.fillRect(this._rAll.x, this._rAll.y, this._rAll.w, this._rAll.h);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(this._rAll.x, this._rAll.y, this._rAll.w, this._rAll.h);
    }

    BuildDefault() {
        var defaultColor = ["#00f", "#0f0", "#f00"];
        for (var i = 0; i < defaultColor.length; i++)
            this.AddStatus(defaultColor[i]);
    };


}

