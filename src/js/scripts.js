// Define the canvas and grid dimensions
var canvasSize = 800;
var gridSize = canvasSize / 5;

// Initialize the grid as a 2D array
let grid = new Array(gridSize);
for (let i = 0; i < gridSize; i++) {
  grid[i] = new Array(gridSize);
  for (let j = 0; j < gridSize; j++) {
    grid[i][j] = false;
  }
}

// Get the canvas element and its context
var canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Calculate the size of each cell based on the canvas and grid dimensions
const cellSize = canvasSize / gridSize;

// Define the formations that can be dragged onto the canvas
const formations = [
  {
    name: "Gosper Glider Gun",
    cells: [
      [0, 4],
      [0, 5],
      [1, 4],
      [1, 5],
      [10, 4],
      [10, 5],
      [10, 6],
      [11, 3],
      [11, 7],
      [12, 2],
      [12, 8],
      [13, 2],
      [13, 8],
      [14, 5],
      [15, 3],
      [15, 7],
      [16, 4],
      [16, 5],
      [16, 6],
      [17, 5],
      [20, 2],
      [20, 3],
      [20, 4],
      [21, 2],
      [21, 3],
      [21, 4],
      [22, 1],
      [22, 5],
      [24, 0],
      [24, 1],
      [24, 5],
      [24, 6],
      [34, 2],
      [34, 3],
      [35, 2],
      [35, 3],
    ],
  },
  {
    name: "Blinker",
    cells: [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
  },
  {
    name: "Toad",
    cells: [
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 0],
      [3, 1],
      [3, 2],
    ],
  },
  {
    name: "Beacon",
    cells: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 2],
      [2, 3],
      [3, 2],
      [3, 3],
    ],
  },
  {
    name: "Pulsar",
    cells: [
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 10],
      [2, 11],
      [2, 12],
      [4, 2],
      [4, 7],
      [4, 9],
      [4, 14],
      [5, 2],
      [5, 7],
      [5, 9],
      [5, 14],
      [6, 2],
      [6, 7],
      [6, 9],
      [6, 14],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 10],
      [7, 11],
      [7, 12],
      [9, 4],
      [9, 5],
      [9, 6],
      [9, 10],
      [9, 11],
      [9, 12],
      [10, 2],
      [10, 7],
      [10, 9],
      [10, 14],
      [11, 2],
      [11, 7],
      [11, 9],
      [11, 14],
      [12, 2],
      [12, 7],
      [12, 9],
      [12, 14],
      [14, 4],
      [14, 5],
      [14, 6],
      [14, 10],
      [14, 11],
      [14, 12],
    ],
  },
  {
    name: "Pentadecathlon",
    cells: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
      [1, 8],
      [1, 9],
      [1, 10],
      [1, 11],
      [1, 12],
      [1, 13],
      [1, 14],
    ],
  },
  {
    name: "Glider 2",
    cells: [
      [1, 0],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ],
  },
  {
    name: "R-pentomino",
    cells: [
      [3, 3],
      [3, 4],
      [4, 3],
      [4, 2],
      [5, 3],
    ],
  },
  {
    name: "Diehard",
    cells: [
      [0, 4],
      [1, 0],
      [1, 1],
      [2, 1],
      [2, 5],
      [2, 6],
      [2, 7],
    ],
  },
  {
    name: "Acorn",
    cells: [
      [0, 0],
      [1, 0],
      [1, -2],
      [3, -1],
      [4, 0],
      [5, 0],
      [6, 0],
    ],
  },
  {
    name: "B-Heptomino",
    cells: [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 1],
      [2, 0],
      [3, 0],
    ],
  },
  {
    name: "Bunnies",
    cells: [
      [-4, -4],
      [-4, -3],
      [-4, -2],
      [-4, 2],
      [-4, 3],
      [-4, 4],
      [-3, -4],
      [-3, 4],
      [-2, -4],
      [-2, 4],
      [1, -1],
      [1, 0],
      [2, -1],
      [2, 0],
    ],
  },
  {
    name: "Carnival Shuttle",
    cells: [
      [-2, -2],
      [-2, -1],
      [-1, -2],
      [-1, 1],
      [0, -1],
      [1, -1],
      [2, -1],
      [2, 0],
      [2, 1],
      [3, -1],
      [4, -1],
      [4, 0],
    ],
  },
  {
    name: "Caterer",
    cells: [
      [0, -2],
      [0, -1],
      [0, 0],
      [0, 1],
      [0, 2],
      [1, -3],
      [1, 3],
      [2, -3],
      [2, 3],
      [3, -2],
      [3, -1],
      [3, 0],
      [3, 1],
      [3, 2],
    ],
  },
  {
    name: "Century",
    cells: [
      [-2, -2],
      [-2, -1],
      [-1, -3],
      [-1, -1],
      [0, -3],
      [0, -1],
      [1, -2],
    ],
  },
  {
    name: "Clock",
    cells: [
      [-1, -1],
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ],
  },
  {
    name: "Clock 2",
    cells: [
      [-2, -2],
      [-2, 1],
      [-1, -2],
      [0, -2],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  },
  {
    name: "Eater 1",
    cells: [
      [-1, -2],
      [-1, 1],
      [0, -3],
      [0, -1],
      [1, -3],
      [1, -2],
      [1, -1],
    ],
  },
  {
    name: "Eater 2",
    cells: [
      [-2, -2],
      [-2, -1],
      [-2, 0],
      [-1, -3],
      [-1, 1],
      [0, -3],
      [0, 1],
      [1, -3],
      [1, -2],
      [1, -1],
    ],
  },
  {
    name: "Eater 3",
    cells: [
      [-4, 0],
      [-4, 1],
      [-4, 2],
      [-3, -2],
      [-2, -2],
      [-1, -2],
      [0, -1],
      [0, 2],
      [1, -1],
      [1, 2],
      [2, 0],
      [2, 1],
    ],
  },
  {
    name: "Eater 4",
    cells: [
      [-3, -3],
      [-3, -2],
      [-3, -1],
      [-3, 0],
      [-2, -3],
      [-2, 0],
      [-1, -3],
      [-1, 0],
      [0, -2],
      [0, -1],
    ],
  },
  {
    name: "Eater 5",
    cells: [
      [-2, -1],
      [-2, 0],
      [-2, 1],
      [-1, -1],
      [-1, 1],
      [0, -1],
      [0, 0],
    ],
  },
  {
    name: "Fishhook",
    cells: [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, 0],
    ],
  },
  {
    name: "Fountain",
    cells: [
      [-2, 0],
      [-2, 1],
      [-1, -1],
      [-1, 2],
      [0, -2],
      [0, 3],
      [1, -2],
      [1, 3],
      [2, -1],
      [2, 2],
      [3, 0],
      [3, 1],
    ],
  },
  {
    name: "French Kiss",
    cells: [
      [-1, -3],
      [-1, -2],
      [-1, -1],
      [0, -2],
      [0, 1],
      [1, 0],
    ],
  },
  {
    name: "Fumarole",
    cells: [
      [-1, -1],
      [-1, 0],
      [0, -2],
      [0, -1],
      [0, 1],
      [1, 0],
    ],
  },
  {
    name: "Garden of Eden 1",
    cells: [
      [0, -2],
      [0, 2],
      [1, -1],
      [1, 1],
      [2, -2],
      [2, -1],
      [2, 1],
      [2, 2],
    ],
  },
  {
    name: "Glider 3",
    cells: [
      [-2, 0],
      [-2, 1],
      [-1, -1],
      [-1, 1],
      [0, 1],
    ],
  },
  {
    name: "Gosper Glider Gun",
    cells: [
      [-18, -2],
      [-18, -1],
      [-17, -2],
      [-17, -1],
      [-8, -4],
      [-8, -3],
      [-8, -2],
      [-7, -4],
      [-7, -3],
      [-7, -2],
      [-6, -5],
      [-6, -1],
      [-4, -6],
      [-4, -5],
      [-4, -1],
      [-4, 0],
      [-3, -6],
      [-3, -4],
      [-3, 0],
      [-3, 1],
      [-2, -6],
      [-2, -5],
      [-2, -1],
      [-2, 0],
      [-1, -4],
      [-1, -3],
      [-1, -2],
      [0, -3],
      [0, -2],
    ],
  },
  {
    name: "Gray counter",
    cells: [
      [-2, 0],
      [-2, 1],
      [-1, -2],
      [-1, -1],
      [0, -2],
      [0, -1],
      [1, 0],
      [1, 1],
    ],
  },
  {
    name: "Herschel",
    cells: [
      [-1, 0],
      [-1, 1],
      [-1, 2],
      [0, -1],
      [0, 2],
      [1, 2],
      [2, 2],
    ],
  },
  {
    name: "Honey farm",
    cells: [
      [-1, -1],
      [-1, 0],
      [0, -2],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  },
  {
    name: "Loaf",
    cells: [
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 1],
    ],
  },
  {
    name: "Pentadecathlon",
    cells: [
      [-1, 0],
      [0, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [0, -2],
      [0, 2],
      [-2, -1],
      [-2, 1],
      [2, -1],
      [2, 1],
    ],
  },
  {
    name: "Pulsar",
    cells: [
      [-2, -4],
      [-2, -3],
      [-2, -2],
      [-1, -4],
      [-1, -2],
      [0, -4],
      [0, -3],
      [0, -2],
      [1, -1],
      [1, 0],
      [1, 1],
      [2, -2],
      [2, 0],
      [2, 2],
      [3, -4],
      [3, -3],
      [3, -2],
      [4, -3],
      [4, -2],
      [4, -1],
    ],
  },
  {
    name: "Queen bee shuttle",
    cells: [
      [-4, 0],
      [-4, 1],
      [-3, -1],
      [-3, 2],
      [-2, -2],
      [-2, 2],
      [-1, -2],
      [-1, 1],
      [0, 0],
      [0, 2],
      [1, 1],
      [1, -1],
    ],
  },
  {
    name: "Toad",
    cells: [
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 0],
      [1, -1],
      [1, 0],
    ],
  },

  // Add more formations here...
];

// Get the formations list element and create draggable elements for each formation
const formationsList = document.getElementById("formations");
formations.forEach((formation) => {
  const formationElement = document.createElement("div");
  formationElement.className = "formation";
  formationElement.innerHTML = formation.name;
  formationElement.draggable = true;
  formationElement.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", JSON.stringify(formation.cells));
  });
  formationsList.appendChild(formationElement);
});

// Add event listeners to detect mouse actions on the canvas
canvas.addEventListener("mousemove", function (event) {
  // Calculate the cell position based on the mouse coordinates
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / cellSize);
  const y = Math.floor((event.clientY - rect.top) / cellSize);

  // Redraw the grid if the mouse is hovering over a different cell
  if (canvas.lastX !== x || canvas.lastY !== y) {
    // Restore the color of the previously highlighted cell
    if (canvas.lastX !== undefined && canvas.lastY !== undefined) {
      ctx.fillStyle = grid[canvas.lastY][canvas.lastX] ? "#ffffff" : "#000000";
      ctx.fillRect(
        canvas.lastX * cellSize,
        canvas.lastY * cellSize,
        cellSize,
        cellSize
      );
    }

    // Highlight the current cell in yellow
    ctx.fillStyle = "yellow";
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

    // Store the position of the highlighted cell
    canvas.lastX = x;
    canvas.lastY = y;
  }
});

canvas.addEventListener("mouseleave", function (event) {
  // Restore the color of the previously highlighted cell
  if (canvas.lastX !== undefined && canvas.lastY !== undefined) {
    ctx.fillStyle = grid[canvas.lastY][canvas.lastX] ? "#ffffff" : "#000000";
    ctx.fillRect(
      canvas.lastX * cellSize,
      canvas.lastY * cellSize,
      cellSize,
      cellSize
    );
  }

  // Clear the stored position of the highlighted cell
  canvas.lastX = undefined;
  canvas.lastY = undefined;
});

// Add an event listener to detect clicks on the canvas
canvas.addEventListener("click", function (event) {
  // Calculate the cell position based on the click coordinates
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / cellSize);
  const y = Math.floor((event.clientY - rect.top) / cellSize);

  // Toggle the cell's state and redraw the grid
  grid[y][x] = !grid[y][x];
  drawGrid();
});
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 32 || event.which === 32) {
    // Toggle the cell's state and redraw the grid
    // grid[canvas.lastY][canvas.lastX] = !grid[canvas.lastY][canvas.lastX];
    grid[canvas.lastY][canvas.lastX] = true;
    drawGrid();
  }

  if (event.keyCode === 189 || event.which === 189) {
    grid[canvas.lastY][canvas.lastX] = false;
  }
});

// Function to draw the grid on the canvas
function drawGrid() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Loop through each cell in the grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Set the color based on the cell's state
      ctx.fillStyle = grid[i][j] ? "#ffffff" : "#000000";

      // Draw the cell as a rectangle on the canvas
      ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
}

// Add event listeners to detect drag and drop actions on the canvas
canvas.addEventListener("dragover", function (event) {
  event.preventDefault();
});

canvas.addEventListener("drop", function (event) {
  event.preventDefault();

  // Parse the JSON data from the dragged formation element
  const cells = JSON.parse(event.dataTransfer.getData("text/plain"));

  // Calculate the cell position based on the drop coordinates
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / cellSize);
  const y = Math.floor((event.clientY - rect.top) / cellSize);

  // Add the formation to the grid at the drop location
  cells.forEach(([dx, dy]) => {
    grid[y + dy][x + dx] = true;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect((x + dx) * cellSize, (y + dy) * cellSize, cellSize, cellSize);
  });
});

// Add a start button to the HTML document
const startButton = document.createElement("button");
startButton.innerText = "Start";
startButton.classList.add("button-4");
startButton.classList.add("start");
document.querySelector("#control-panel").appendChild(startButton);

// Add a pause button to the HTML document
const pauseButton = document.createElement("button");
pauseButton.innerText = "Pause";
pauseButton.classList.add("button-4");
pauseButton.classList.add("pause");
pauseButton.hidden = true;
document.querySelector("#control-panel").appendChild(pauseButton);

var animation;

// Add an event listener to the start button
startButton.addEventListener("click", function () {
  // Stop any existing animation frame
  cancelAnimationFrame(animation);

  // Start the game of life with the current live cell positions
  animate();

  startButton.hidden = true;
  pauseButton.hidden = false;
});

// Add an event listener to the start button
pauseButton.addEventListener("click", function () {
  // Stop any existing animation frame
  cancelAnimationFrame(animation);

  startButton.hidden = false;
  pauseButton.hidden = true;
});

// Update the grid with the next state
function updateGrid() {
  const newGrid = new Array(gridSize)
    .fill(0)
    .map(() => new Array(gridSize).fill(false));
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      newGrid[x][y] = getNextState(x, y);
    }
  }
  grid = newGrid;
}

// Start the animation loop
function animate() {
  updateGrid();
  drawGrid();
  animation = requestAnimationFrame(animate);
}

// Define the rules of the game
function getNextState(x, y) {
  const numNeighbors = countNeighbors(x, y);
  if (grid[x][y]) {
    return numNeighbors === 2 || numNeighbors === 3;
  } else {
    return numNeighbors === 3;
  }
}

// Count the number of live neighbors for a given cell
function countNeighbors(x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      const neighborX = x + i;
      const neighborY = y + j;
      if (
        neighborX < 0 ||
        neighborX >= gridSize ||
        neighborY < 0 ||
        neighborY >= gridSize
      ) {
        continue;
      }
      if (grid[neighborX][neighborY]) {
        count++;
      }
    }
  }
  return count;
}

// Draw the initial grid on the canvas
drawGrid();

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty("--vw", `${vw}px`);
  resizeCanvas();
});

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);
let vw = window.innerWidth * 0.01;
document.documentElement.style.setProperty("--vw", `${vw}px`);

function resizeCanvas() {
  newWidth = canvas.offsetWidth;
  if (newWidth < 800) {
    canvasSize = newWidth;
    canvas.setAttribute("width", newWidth);
    canvas.setAttribute("height", newWidth);
  } else {
    canvasSize = 800;
    canvas.setAttribute("width", 800);
    canvas.setAttribute("height", 800);
  }
  drawGrid();
}
resizeCanvas();
