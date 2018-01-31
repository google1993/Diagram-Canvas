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


}

