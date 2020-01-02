class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.parent = this;
        this.rightWall = true;
        this.downWall = true;
    }

    find() {
        if (this.parent === this) {
            return this;
        }
        return this.parent.find();
    }

    static union(c1, c2) {
        let r1 = c1.find();
        let r2 = c2.find();
        if (r1 === r2) {
            return false;
        }

        r1.parent = r2;
        return true;
    }
}