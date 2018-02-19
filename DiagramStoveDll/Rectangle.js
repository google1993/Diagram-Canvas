function Rectangle(x, y, w, h) {
    this.X = function (nVal) {
        if (nVal == undefined) return x;
        x = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 : parseInt(nVal);
    }
    this.Y = function (nVal) {
        if (nVal == undefined) return y;
        y = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 : parseInt(nVal);
    }
    this.W = function (nVal) {
        if (nVal == undefined) return w;
        w = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 : parseInt(nVal);
    }
    this.H = function (nVal) {
        if (nVal == undefined) return h;
        h = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 : parseInt(nVal);
    }

    this.Rect = function (nVal) {
        if (nVal == undefined) return self;
        x = nVal.X();
        y = nVal.Y();
        w = nVal.W();
        h = nVal.H();
    }
    this.RectParam = function (nVal_x, nVal_y, nVal_w, nVal_h) {
        self.X(nVal_x);
        self.Y(nVal_y);
        self.W(nVal_w);
        self.H(nVal_h);
    }

    var self = this;
    (x == undefined) ? x = 0 : self.X(x);
    (y == undefined) ? y = 0 : self.Y(y);
    (w == undefined) ? w = 0 : self.W(w);
    (h == undefined) ? h = 0 : self.H(h);
}