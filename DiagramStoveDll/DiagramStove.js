class DiagramStove {
    constructor(x, y, w, h) {
        this._rProc = [];
        this._rBlink = [];
        this._rNumb = [];
        this._rAll = new Rectangle(0, 0, this.minBoardW, this.minBoardH);
        this.Change(x, y, w, h);
    }

    get minBoardW() { return this._rProc.length * 6 + 3; }
    get minBoardH() { return 133; }
    get board() { return this._rAll; }

    set board(nVal) {
        this._rAll.ChangeParam(nVal.x, nVal.y,
            nVal.w < this.minBoardW ? this.minBoardW : nVal.w,
            nVal.h < this.minBoardH ? this.minBoardH : nVal.h);
        this.ReBuild();
    }
    Change(x, y, w, h) {
        this._rAll.ChangeParam(x, y, w < this.minBoardW ? this.minBoardW : w, h < this.minBoardH ? this.minBoardH : h);
        this.ReBuild();
    }

    AddStove(rProc, rBlink, rNumb) {
        this._rProc.push(rProc);
        this._rBlink.push(rBlink);
        this._rNumb.push(rNumb);
    }
    DelStove() {
        if (this._rProc.length <= 0)
            return;
        this._rProc.pop();
        this._rBlink.pop();
        this._rNumb.pop();
    }

    ReBuild() {
        var coorX = this._rAll.x + 2;
        var coorYP = this._rAll.y + 2;
        var coorYB = this._rAll.y + this._rAll.h - 31;
        var coorYN = this._rAll.y + this._rAll.h - 20;
        var correctX = this._rProc.length == 0 ? 0 : (this._rAll.w - 2) % this._rProc.length;
        var stepYP = this._rAll.h - 32;
        var stepYB = 10;
        var stepYN = 17;

        for (var i = 0; i < this._rProc.length; i++)
        {
            var stepX = Math.floor((this._rAll.w - 2 - this._rProc.length) / this._rProc.length);
            stepX = i < correctX ? stepX + 1 : stepX;
            this._rProc[i].Change(coorX, coorYP, stepX, stepYP);
            this._rBlink[i].Change(coorX, coorYB, stepX, stepYB);
            this._rNumb[i].Change(coorX, coorYN, stepX, stepYN);
            coorX += stepX + 1;
        }
    }

    Print(ctx) {
        ctx.clearRect(this._rAll.x - 1, this._rAll.y - 1, this._rAll.w + 2, this._rAll.h + 2);
        for (var key in this._rProc) {
            this._rProc[key].Print(ctx);
            this._rBlink[key].Print(ctx);
            this._rNumb[key].Print(ctx);
        }
        ctx.strokeStyle = "#333";
        ctx.strokeRect(this._rAll.x, this._rAll.y, this._rAll.w, this._rAll.h);
    }

    BuildDefault() {
        while (this._rProc.length < 48) {
            this._rProc.push(new ProcessColumn(0, 0, 0, 0))
            this._rProc[this._rProc.length - 1].BuildDefault();
            this._rBlink.push(new BlinkStatus(0, 0, 0, 0));
            this._rBlink[this._rProc.length - 1].BuildDefault();
            this._rNumb.push(new NumberColumn(0, 0, 0, 0, this._rProc.length));
        }
        this.ReBuild();
    };
}