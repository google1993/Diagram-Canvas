class Rectangle {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    get x() { return this._x; }
    set x(nVal) { this._x = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 : parseInt(nVal); }
    get y() { return this._y; }
    set y(nVal) { this._y = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 : parseInt(nVal); }
    get w() { return this._w; }
    set w(nVal) { this._w = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 : parseInt(nVal); }
    get h() { return this._h; }
    set h(nVal) { this._h = (isNaN(parseInt(nVal)) || parseInt(nVal) < 0) ? 0 : parseInt(nVal); }

    Change(nVal) {
        this.x = nVal.x;
        this.y = nVal.y;
        this.w = nVal.w;
        this.h = nVal.h;
    }
    
    ChangeParam(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

