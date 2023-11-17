/* complexCode.js */

// This complex JavaScript code generates a maze using Prim's algorithm,
// and then finds the shortest path between two points using Dijkstra's algorithm.

const GRID_SIZE = 20;

class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.visited = false;
    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true,
    };
  }
}

class Maze {
  constructor() {
    this.grid = [];

    for (let row = 0; row < GRID_SIZE; row++) {
      let rowCells = [];
      for (let column = 0; column < GRID_SIZE; column++) {
        rowCells.push(new Cell(row, column));
      }
      this.grid.push(rowCells);
    }
  }

  generateMaze() {
    const stack = [];
    const startCell = this.getRandomCell();
    let currentCell = startCell;
    currentCell.visited = true;
    stack.push(currentCell);

    while (stack.length > 0) {
      const neighbors = this.getUnvisitedNeighbors(currentCell);

      if (neighbors.length > 0) {
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        this.removeWalls(currentCell, randomNeighbor);
        randomNeighbor.visited = true;

        stack.push(randomNeighbor);
        currentCell = randomNeighbor;
      } else {
        currentCell = stack.pop();
      }
    }
  }

  getRandomCell() {
    const randomRow = Math.floor(Math.random() * GRID_SIZE);
    const randomColumn = Math.floor(Math.random() * GRID_SIZE);
    return this.grid[randomRow][randomColumn];
  }

  getUnvisitedNeighbors(cell) {
    const neighbors = [];

    if (cell.row > 0 && !this.grid[cell.row - 1][cell.column].visited)
      neighbors.push(this.grid[cell.row - 1][cell.column]);

    if (cell.column < GRID_SIZE - 1 && !this.grid[cell.row][cell.column + 1].visited)
      neighbors.push(this.grid[cell.row][cell.column + 1]);

    if (cell.row < GRID_SIZE - 1 && !this.grid[cell.row + 1][cell.column].visited)
      neighbors.push(this.grid[cell.row + 1][cell.column]);

    if (cell.column > 0 && !this.grid[cell.row][cell.column - 1].visited)
      neighbors.push(this.grid[cell.row][cell.column - 1]);

    return neighbors;
  }

  removeWalls(cell1, cell2) {
    if (cell1.row === cell2.row) {
      if (cell1.column < cell2.column) {
        cell1.walls.right = false;
        cell2.walls.left = false;
      } else {
        cell1.walls.left = false;
        cell2.walls.right = false;
      }
    } else if (cell1.column === cell2.column) {
      if (cell1.row < cell2.row) {
        cell1.walls.bottom = false;
        cell2.walls.top = false;
      } else {
        cell1.walls.top = false;
        cell2.walls.bottom = false;
      }
    }
  }

  findShortestPath(startRow, startColumn, endRow, endColumn) {
    const distances = [];
    const visited = [];
    const queue = [];

    for (let row = 0; row < GRID_SIZE; row++) {
      let rowDistances = [];
      let rowVisited = [];
      for (let column = 0; column < GRID_SIZE; column++) {
        rowDistances[column] = Infinity;
        rowVisited[column] = false;
      }
      distances.push(rowDistances);
      visited.push(rowVisited);
    }

    distances[startRow][startColumn] = 0;
    queue.push({ row: startRow, column: startColumn });

    while (queue.length > 0) {
      const current = queue.shift();
      const neighbors = this.getNeighbors(current.row, current.column);

      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        const neighborDistance = distances[current.row][current.column] + 1;
        if (neighborDistance < distances[neighbor.row][neighbor.column]) {
          distances[neighbor.row][neighbor.column] = neighborDistance;
          if (!visited[neighbor.row][neighbor.column]) {
            visited[neighbor.row][neighbor.column] = true;
            queue.push(neighbor);
          }
        }
      }
    }

    return distances[endRow][endColumn];
  }

  getNeighbors(row, column) {
    const neighbors = [];

    if (row > 0 && !this.grid[row][column].walls.top)
      neighbors.push({ row: row - 1, column });

    if (column < GRID_SIZE - 1 && !this.grid[row][column].walls.right)
      neighbors.push({ row, column: column + 1 });

    if (row < GRID_SIZE - 1 && !this.grid[row][column].walls.bottom)
      neighbors.push({ row: row + 1, column });

    if (column > 0 && !this.grid[row][column].walls.left)
      neighbors.push({ row, column: column - 1 });

    return neighbors;
  }
}

// Example usage:

const maze = new Maze();
maze.generateMaze();

const shortestPathDistance = maze.findShortestPath(0, 0, GRID_SIZE - 1, GRID_SIZE - 1);
console.log("Shortest path distance:", shortestPathDistance);