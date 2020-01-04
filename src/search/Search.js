class Search {

    constructor() {
        this.steps = [];
    }

    search(maze) {

    }

    animate(ctx) {
        this.stepIndex = 0;
        this.ctx = ctx;

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'Pink';
        this.animateSteps = this.animateSteps.bind(this);
        requestAnimationFrame(this.animateSteps);
    }

    animateSteps() {
        let node = this.steps[this.stepIndex++];
        let parent = node.parent;
        if (parent !== null) {
            this.ctx.moveTo(node.cell.x * cellSize + cellSize / 2, node.cell.y * cellSize + cellSize / 2);
            this.ctx.lineTo(parent.cell.x * cellSize + cellSize / 2, parent.cell.y * cellSize + cellSize / 2);
            this.ctx.stroke();
        }
        if (this.stepIndex < this.steps.length) {
            requestAnimationFrame(this.animateSteps);
        }
        else {
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'Red';
            this.ctx.moveTo(node.cell.x * cellSize + cellSize / 2, node.cell.y * cellSize + cellSize / 2);
            while (node.parent !== null) {
                node = node.parent;
                this.ctx.lineTo(node.cell.x * cellSize + cellSize / 2, node.cell.y * cellSize + cellSize / 2);
            }
            this.ctx.stroke();
        }
    }
}