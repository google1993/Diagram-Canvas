class NumberColumn {
    constructor(x, y, w, h, num) {
        this._rAll = new Rectangle(x, y, w, h);
        this._prostoy = 0;
        this.number = num;
    }

    get prostoy() {
        return this._prostoy;
    }
    get number() {
        return this._number;
    }
    get rect() {
        return this._rAll;
    }

    set prostoy(nVal) {
        this._prostoy = (isNaN(nVal) || parseInt(nVal) != 1) ? 0 : 1;
    }
    set number(nVal) {
        this._number = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 : parseInt(nVal);
    }
    set rect(nVal) {
        this._rAll.Change(nVal);
    }
    Change(x, y, w, h) {
        this._rAll.ChangeParam(x, y, w, h);
    }

    Print(ctx) {
        ctx.fillStyle = this._prostoy == 0 ? "#ff0" : "#ff8000";
        ctx.fillRect(this._rAll.x, this._rAll.y, this._rAll.w, this._rAll.h);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(this._rAll.x, this._rAll.y, this._rAll.w, this._rAll.h);
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        //ctx.font = "bold " + (this._rAll.h - 3 < 0 ? 0 : this._rAll.h - 3) + "px Arial";
        var px = 0
        if (this._rAll.h < this._rAll.w )
            px = this._rAll.h - 3 < 0 ? 0 : this._rAll.h - 3;
        else
            px = this._rAll.w - 3 < 0 ? 0 : this._rAll.w - 3;
        ctx.font = px + "px Arial";

        ctx.fillText(this._number, this._rAll.x + this._rAll.w / 2, this._rAll.y + 1 + this._rAll.h / 2); 
    }
}

