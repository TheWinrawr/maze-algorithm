class Astar extends Search {
    search(maze) {
        this.steps = [];
        let nodeList = [];
        let visited = new Set();
        let currNode = new TreeNode(maze[0][0]);
        currNode.g = 0;
        currNode.h = manhattanDist(0, 0, maze.length, maze[0].length);
        currNode.f = currNode.g + currNode.h;
        nodeList.push(currNode);
        visited.add(maze[0][0]);

        while (nodeList.length > 0) {
            currNode = this.getSmallestF(nodeList);
            this.steps.push(currNode);

            let cell = currNode.cell;
            if (cell.x === maze.length - 1 && cell.y === maze[0].length - 1) {
                break;
            }

            let neighbors = getValidNeighbors(maze, cell.x, cell.y);
            neighbors.forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    let newNode = new TreeNode(neighbor, currNode);
                    newNode.g = currNode.g + 1;
                    newNode.h = manhattanDist(neighbor.x, neighbor.y, maze.length, maze[0].length);
                    newNode.f = newNode.g + newNode.h;
                    nodeList.push(newNode);
                    visited.add(neighbor);
                }
            })
        }
    }

    getSmallestF(nodeList) {
        let minIndex = 0;
        for (let i = 0; i < nodeList.length; i++) {
            minIndex = (nodeList[i].f < nodeList[minIndex].f) ? i : minIndex;
        }
        return nodeList.splice(minIndex, 1)[0];
    }
}