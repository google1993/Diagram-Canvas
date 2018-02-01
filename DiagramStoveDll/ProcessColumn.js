class ProcessColumn {
    constructor(x, y, w, h) {
        this._rAll = new Rectangle(x, y, w, h);
        this._rStats = [];
        this._percent = 0;
        this._status = 0;
    }

    get allPoint() {
        var count = 0;
        for (var key in this._rStats)
            count += this._rStats[key].point;
        return count;
    }
    get allStats() {
        return this._rStats.length;
    }
    get corrStats() {
        var temp = 0;
        for (var key in this._rStats) temp += Math.floor((this._rAll.h - 2) * this._rStats[key].point / this.allPoint);
        return this._rAll.h - 2 - temp;
    }
    get status() { return this._status; }
    get percent() { return this._percent; }
    get rect() { return this._rAll; }

    set status(nVal) {
        this._status = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 :
            (parseInt(nVal) > this._rStats.length) ? this._rStats.length : parseInt(nVal);
        this.ReStats();
    }
    set percent(nVal) {
        this._percent = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 :
            (parseInt(nVal) > 100) ? 100 : parseInt(nVal);
        this.ReStats();
    }
    ReStats() {
        for (var i = 0; i < this._rStats.length; i++) {
            this._rStats[i].percent = (i + 1) < this._status ? 100 :
                (i + 1) == this._status ? this._percent : 0;
        }
    }
    set rect(nVal) {
        this._rAll.Change(nVal);
        this.ReBuild();
    }
    ReBuild() {
        var coorY = this._rAll.y + 1;
        for (var i = this._rStats.length - 1; i >= 0; i--) {
            var stepY = Math.floor((this._rAll.h - 2) * this._rStats[i].point / this.allPoint);
            stepY += i < this.corrStats ? 1 : 0;
            this._rStats[i].Change(this._rAll.x + 1, coorY, this._rAll.w - 2, stepY);
            coorY += stepY;
        }
    }

    AddRStat(color, point) {
        this._rStats.push(new PercentColumn(0, 0, 0, 0, 0, color, point));
        this.ReBuild();
    }
    DelRStat(index) {
        if (index == null || index == undefined || index <= 0 || index > this._rStats.length) {
            if (this._rStats.length > 0) this._rStats.pop();
        }
        else
            this._rStats.splice(index - 1, 1);
        this.status = 0;
        ReBuild();
    }
    ChangeRStat(index, color, point) {
        if (index != null && index != undefined && index > 0 && index <= this._rStats.length) {
            this._rStats[index - 1].color = color;
            this._rStats[index - 1].point = point;
            ReBuild();
        }
    }

    Print(ctx) {
        ctx.clearRect(this._rAll.x - 1, this._rAll.y - 1, this._rAll.w + 2, this._rAll.h + 2);
        for (var key in this._rStats)
            if (key < this._status)
                this._rStats[key].Print(ctx);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(this._rAll.x, this._rAll.y, this._rAll.w, this._rAll.h);
    }

    BuildDefault() {
        var defaultPoint = [57, 49, 49, 71, 28, 49, 21, 171, 114, 103];
        var defaultColor = ["#0ff", "#00f", "#f00", "#0f0", "#0ff", "#00f", "#8500b6", "#f00", "#f0f", "#0f0"]
        for (var i = 0; i < defaultPoint.length; i++)
            this.AddRStat(defaultColor[i], defaultPoint[i]);
    };
}