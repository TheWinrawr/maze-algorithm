class Greedy extends Search {
    search(maze) {
        this.steps = [];
        let nodeList = [];
        let visited = new Set();
        let currNode = new TreeNode(maze[0][0]);
        currNode.h = manhattanDist(0, 0, maze.length, maze[0].length);
        nodeList.push(currNode);
        visited.add(maze[0][0]);

        while (nodeList.length > 0) {
            currNode = this.getSmallestH(nodeList);
            this.steps.push(currNode);

            let cell = currNode.cell;
            if (cell.x === maze.length - 1 && cell.y === maze[0].length - 1) {
                break;
            }

            let neighbors = getValidNeighbors(maze, cell.x, cell.y);
            neighbors.forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    let newNode = new TreeNode(neighbor, currNode);
                    newNode.h = manhattanDist(neighbor.x, neighbor.y, maze.length, maze[0].length);
                    nodeList.push(newNode);
                    visited.add(neighbor);
                }
            })
        }
    }

    getSmallestH(nodeList) {
        let minIndex = 0;
        for (let i = 0; i < nodeList.length; i++) {
            minIndex = (nodeList[i].h < nodeList[minIndex].h) ? i : minIndex;
        }
        return nodeList.splice(minIndex, 1)[0];
    }
}