class PercentColumn{
    
    constructor(x, y, w, h, percent, color, point) {
        this._rAll = new Rectangle(x, y, w, h);
        this.color = color;
        this.percent = percent;
        this.point = point;
    }

    get percent() { return this._percent; }
    set percent(nVal) {
        this._percent = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 :
            (parseInt(nVal) > 100) ? 100 :
                parseInt(nVal);
        var temp = Math.floor(this._rAll.h * this._percent / 100);
        this._rPercent = new Rectangle(this._rAll.x, this._rAll.y + this._rAll.h - temp, this._rAll.w, temp);
    }

    get color() { return this._color; }
    set color(nVal) {
        this._color = (nVal.search(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i) != -1) ?
            nVal.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)[0] : "#000000";
    }

    get point() { return this._point; }
    set point(nVal) { this._point = (isNaN(parseInt(nVal)) || parseInt(nVal) < 1) ? 1 : parseInt(nVal); }

    ChangeRect(nVal) {
        this._rAll.Change(nVal);
        this.percent = this._percent;
    }

    Print(ctx) {
        ctx.fillStyle = this._color;
        ctx.strokeStyle = this._color;
        ctx.strokeRect(this._rAll.x, this._rAll.y, this._rAll.w, this._rAll.h);
        if (this._rPercent.w > 1)
            ctx.fillRect(this._rPercent.x, this._rPercent.y, this._rPercent.w, this._rPercent.h);
    }
}

