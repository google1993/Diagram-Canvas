class PercentColumn{
    
    constructor(x, y, w, h, percent, color, point) {
        this._rPercent = new Rectangle(0, 0, 0, 0);
        this._rAll = new Rectangle(x, y, w, h);
        this.percent = percent;
        this.color = color;
        this.point = point;
    }

    get rect() { return this._rAll; }
    get percent() { return this._percent; }
    get color() { return this._color; }
    get point() { return this._point; }

    set percent(nVal) {
        this._percent = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 :
            (parseInt(nVal) > 100) ? 100 :
                parseInt(nVal);
        this.Rebuild();
    }
    set color(nVal) {
        this._color = (nVal.search(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i) != -1) ?
            nVal.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)[0] : "#000000";
    }
    set point(nVal) {
        this._point = (isNaN(parseInt(nVal)) || parseInt(nVal) < 1) ? 1 : parseInt(nVal);
    }
    set rect(nVal) {
        this._rAll.Change(nVal);
        this.Rebuild();
    }

    Change(x, y, w, h) {
        this._rAll.ChangeParam(x, y, w, h);
        this.Rebuild();
    }
    Rebuild() {
        var temp = Math.floor(this.rect.h * this.percent / 100);
        this._rPercent.ChangeParam(this.rect.x, this.rect.y + this.rect.h - temp, this.rect.w, temp);
    }
    Print(ctx) {
        ctx.fillStyle = this._color;
        ctx.strokeStyle = this._color;
        ctx.strokeRect(this._rAll.x, this._rAll.y, this._rAll.w, this._rAll.h);
        if (this._rPercent.h > 0)
            ctx.fillRect(this._rPercent.x, this._rPercent.y, this._rPercent.w, this._rPercent.h);
    }
}

