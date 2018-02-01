class NumberColumn {
    constructor(x, y, w, h, num) {
        this._rMain = new Rectangle(x, y, w, h);
        this.number = num;
        this.prostoy = 0;
    }

    get prostoy() { return this._prostoy; }
    set prostoy(nVal) { this._prostoy = (isNaN(nVal) || parseInt(nVal) != 1) ? 0 : 1; }
    get number() { return this._number; }
    set number(nVal) { this._number = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 : parseInt(nVal); }
    
    ChangeRect(nVal) {
        this._rMain.Change(nVal);
    }

    Print(ctx) {
        ctx.fillStyle = this.prostoy == 0 ? "#ff0" : "#ff8000";
        ctx.fillRect(this._rMain.x, this._rMain.y, this._rMain.w, this._rMain.h);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(this._rMain.x, this._rMain.y, this._rMain.w, this._rMain.h);

        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold " + (this._rMain.h - 3 < 0 ? 0 : this._rMain.h - 3) + "px Arial";
        ctx.fillText(this.number, this._rMain.x + this._rMain.w / 2, this._rMain.y + 1 + this._rMain.h / 2); 
    }
}

