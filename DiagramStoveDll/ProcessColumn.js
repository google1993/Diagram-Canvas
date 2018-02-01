class ProcessColumn {
    constructor(x, y, w, h) {
        this._sColumn = [];
        this.status = 0;
        this.percent = 0;
        this.mainColumn = new Rectangle(x, y, w, h);
    }

    get allPoint() {
        var count = 0;
        for (var rec in this._sColumn)
            count += this._sColumn[rec].point;
        return count;
    }
    get status() { return this._status; }
    set status(nVal) {
        this._status = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 :
            (parseInt(nVal) > this._sColumn.length) ? this._sColumn.length :
                parseInt(nVal);
    }
    get percent() { return this._percent; }
    set percent(nVal) {
        this._percent = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 :
            (parseInt(nVal) > 100) ? 100 :
                parseInt(nVal);
        for (var i = 0; i < this._sColumn.length; i++) {
            if ((i + 1) < this.status)
                this._sColumn[i].percent = 100;
            else if ((i + 1) === this.status)
                this._sColumn[i].percent = this.percent;
            else
                this._sColumn[i].percent = 0;
        }
    }
    get mainColumn() { return this._mainColumn; }
    set mainColumn(nVal) {
        this._mainColumn = nVal;
        var coorY = this._mainColumn.y + 1;
        for (var i = this._sColumn.length - 1; i >= 0; i--) {
            var stepY = Math.floor((this._mainColumn.h - 2) * this._sColumn[i].point / this.allPoint);
            stepY = i < this.correctSColumn ? stepY + 1 : stepY;
            this._sColumn[i].ChangeRect(new Rectangle(this._mainColumn.x + 1, coorY, this._mainColumn.w - 2, stepY));
            coorY += stepY;
        }
    }

    get correctSColumn() {
        if (this._sColumn.length === 0)
            return 0;
        var temp = 0;
        for (var e in this._sColumn)
            temp += Math.floor((this.mainColumn.h - 2) * this._sColumn[e].point / this.allPoint);
        temp = (this.mainColumn.h - 2) - temp;
        return temp;
    }

    AddStatus(color, point) {
        this._sColumn.push(new PercentColumn(0, 0, 0, 0, 0, color, point));
        this.mainColumn = this._mainColumn;
    }
    DelStatus() {
        if (this._sColumn.length > 0)
            this._sColumn.pop();
        this.mainColumn = this._mainColumn;
    }

    Print(ctx) {
        ctx.clearRect(this._mainColumn.x, this._mainColumn.y, this._mainColumn.w, this._mainColumn.h);
        for (var i = 0; i < this.status; i++)
            this._sColumn[i].Print(ctx);
        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#333";
        ctx.strokeRect(this._mainColumn.x, this._mainColumn.y, this._mainColumn.w, this._mainColumn.h);
    }

    BuildDefault() {
        var defaultPoint = [57, 49, 49, 71, 28, 49, 21, 171, 114, 103];
        var defaultColor = ["#0ff", "#00f", "#f00", "#0f0", "#0ff", "#00f", "#8500b6", "#f00", "#f0f", "#0f0"]
        for (var i = 0; i < defaultPoint.length; i++)
            this.AddStatus(defaultColor[i], defaultPoint[i]);
    };
}