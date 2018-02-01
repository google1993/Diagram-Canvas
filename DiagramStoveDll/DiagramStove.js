class BlinkStatus {
    constructor(x, y, w, h) {
        this._Board = new Rectangle(x, y, w, h);
        this._PCol = [];
        this._BStat = [];
        this._NCol = [];
    }

    get minBoardW() { return this._PCol.length * 6 + 3; }
    get minBoardH() { return 133; }

    get board() { return this._Board; }
    set board(nVal) {
        this._Board.Change(new Rectangle(nVal.x, nVal.y,
            nVal.w < this.minBoardW ? this.minBoardW : nVal.w,
            nVal.h < this.minBoardH ? this.minBoardH : nVal.h));
    }
    int coorX = Board.X + 2;
    int coorY = Board.Y + 2;
    int correctX = CountStoves == 0 ? CountStoves : (Board.Width - 2) % CountStoves;
    int stepY = Board.Height - 32;
    for (int i = 0; i < CountStoves; i++)
    {
        int stepX = (Board.Width - 2 - CountStoves) / CountStoves;
        stepX = i < correctX ? stepX + 1 : stepX;
        stoves[i].process.Resize(coorX, coorY, stepX, stepY);
        coorX += stepX + 1;
    }

    coorX = Board.X + 2;
    coorY += Board.Height - 31;
    stepY = 10;
    for (int i = 0; i < CountStoves; i++)
    {
        int stepX = (Board.Width - 2 - CountStoves) / CountStoves;
        stepX = i < correctX ? stepX + 1 : stepX;
        stoves[i].blink.rMain = new Rectangle(coorX, coorY, stepX, stepY);
        coorX += stepX + 1;
    }

    coorX = Board.X + 2;
    coorY += 11;
    stepY = 17;
    for (int i = 0; i < CountStoves; i++)
    {
        int stepX = (Board.Width - 2 - CountStoves) / CountStoves;
        stepX = i < correctX ? stepX + 1 : stepX;
        stoves[i].numberStove.rMain = new Rectangle(coorX, coorY, stepX, stepY);
        coorX += stepX + 1;
    }
}

}