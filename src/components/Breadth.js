import React from 'react';
import Tutorial from './Tutorial'
import defaultObstacles from './defaultObstacles'

class Breadth extends React.Component{
  constructor(props) {
    super(props);
    this.canvasHex = React.createRef();
    this.mouseCanvas = React.createRef();
    this.startHexCanvas = React.createRef();
    this.obstacleCanvas = React.createRef();
    this.startHexTargetCanvas = React.createRef();
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.showTutorial = this.showTutorial.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.clearObstacles = this.clearObstacles.bind(this);

    this.state = {
      radius: 24, //should be an even number, else the grid is missaligned
      colorScheme: { green: "#338b2b", orange: "#cc6109", brightOrange: "#ff790a", purple: "#bb0bc4", hexGrey: "#cdcdcd", selectionGrey: "#a8a8a8" },
      canvasSize: { canvasWidth: 800, canvasHeight: 600  },
      gridStartingPoint: { x: 50, y: 50 },
      startHexCoord: { q: 8, r: 7},
      gridSize: { x: 17, y: 15 },
      startHexDrag: false,
      obstacleArray: defaultObstacles,
      destination: {},
      showTutorial: false,
      tutorialPageNumber: 1
    }
  }
  componentDidMount() {
    const { canvasWidth: width, canvasHeight: height } = this.state.canvasSize;

    this.canvasHex.current.width            = width;
    this.mouseCanvas.current.width          = width;
    this.startHexTargetCanvas.current.width = width;
    this.startHexCanvas.current.width       = width;
    this.obstacleCanvas.current.width       = width;
    
    this.canvasHex.current.height            = height;
    this.mouseCanvas.current.height          = height;
    this.startHexTargetCanvas.current.height = height;
    this.startHexCanvas.current.height       = height;
    this.obstacleCanvas.current.height       = height;

    this.drawHexGrid(this.canvasHex.current, this.state.radius);
    this.drawStartingHex();
    this.drawObstacles(this.state.obstacleArray);
  }
  getHexCornerCoordinates(center, radius, i) {
    const angle_deg = 60 * i - 30;
    const angle_rad = Math.PI / 180 * angle_deg;
    
    return { x: center.x + radius * Math.cos(angle_rad), 
             y: center.y + radius * Math.sin(angle_rad) };
  }
  drawHex(canvasID, center, radius, lineColor="#5e5e5e", fillColor=this.state.colorScheme.hexGrey, lineWidth=2) {
    const ctx = canvasID.getContext("2d");
    ctx.lineWidth   = lineWidth;
    ctx.fillStyle   = fillColor;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    const startPoint = this.getHexCornerCoordinates(center, radius, 0);
    ctx.moveTo(startPoint.x, startPoint.y);
    for (let i = 1; i <= 6; i++) {
      const nextPoint   = this.getHexCornerCoordinates(center, radius, i);
      ctx.lineTo(nextPoint.x, nextPoint.y);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
  }
  drawHexGrid(canvasID, radius) {
    const hexWidth = Math.round(Math.sqrt(3) * radius);
    const hexHeight = 2 * radius;
    const hexCount = this.state.gridSize;
    const gridStartingPoint = this.state.gridStartingPoint;
    let center = { ...gridStartingPoint };
    
    for (let i = 0; i < hexCount.y; i++) {
      for (let j = 0; j < hexCount.x; j++) {
        this.drawHex(canvasID, center, radius, undefined, undefined, 1);
        center.x += hexWidth;
      }
      center.x = gridStartingPoint.x + ((hexWidth/2) * ((i+1)%2));
      center.x = Math.round(center.x);
      center.y += hexHeight * 3/4;
      center.y = Math.round(center.y);
    }
  }
  handleMouseMove(e) {
    const hexCoords     = this.mousePositionToHexCoords(e);
    const center        = this.hexToPixel(hexCoords);
    const startHexCoord = this.state.startHexCoord;
    const obstacleArray = this.state.obstacleArray;
    const gridSize      = this.state.gridSize;
    let isObstacle      = false;

    this.setState({
      destination: hexCoords
    });

    this.clearCanvas(this.mouseCanvas.current);
    if (hexCoords.q >= 0 && hexCoords.q < gridSize.x && hexCoords.r >= 0 && hexCoords.r < gridSize.y) {
      obstacleArray.forEach( obstacle => {
        if (JSON.stringify(obstacle) === JSON.stringify(hexCoords)) {
          isObstacle = true;
        }
      });
      const green         = this.state.colorScheme.green;
      const purple        = this.state.colorScheme.purple;
      const orange        = this.state.colorScheme.orange;
      const brightOrange  = this.state.colorScheme.brightOrange;
      const selectionGrey = this.state.colorScheme.selectionGrey;
      
      const radius = this.state.radius;
      //handles the repositioning of the starting hex
      if (this.state.startHexDrag) {
        const { left: x, top: y } = this.getCanvasPosition(this.canvasHex.current);
        const offsetX   = e.pageX - x;
        const offsetY   = e.pageY - y;
        this.clearCanvas(this.startHexCanvas.current);
        this.drawStartingHex({ x: offsetX, y: offsetY }, radius/1.3);

        const targetCanvas = this.startHexTargetCanvas.current;
        let targetHex = this.mousePositionToHexCoords(e);
        targetHex = this.hexToPixel(targetHex);
        this.clearCanvas(targetCanvas);

        if (isObstacle) {
          this.drawHex(targetCanvas, center, radius, green, purple, 5);
        } else {
          this.drawHex(targetCanvas, targetHex, radius, green, undefined, 5);
        }

      } else if (JSON.stringify(hexCoords) === JSON.stringify(startHexCoord)) {
        this.drawHex(this.mouseCanvas.current, center, radius, brightOrange, green, 5);
      } else if (isObstacle) {
        this.drawHex(this.mouseCanvas.current, center, radius, brightOrange, purple, 5);
      } else {
        this.drawHex(this.mouseCanvas.current, center, radius, orange, selectionGrey, 3);
        this.breadthFirstSearch(startHexCoord);
      }
    }
  }
  mousePositionToHexCoords(e) {
    const { left: x, top: y } = this.getCanvasPosition(this.canvasHex.current);
    const gridStartingPoint   = this.state.gridStartingPoint;
    const radius              = this.state.radius;

    const offsetX   = e.pageX - x - gridStartingPoint.x;
    const offsetY   = e.pageY - y - gridStartingPoint.y;
    const hexCoords = this.pixelToHex({ x: offsetX, y: offsetY }, radius);

    return hexCoords;
  }
  getCanvasPosition(canvasID) {
    const rect = canvasID.getBoundingClientRect();
    return { left: rect.left, top: rect.top }
  }
  pixelToHex(point, size) {
    const q = Math.round((Math.sqrt(3)/3 * point.x  -  1/3 * point.y) / size);
    const r = Math.round((                             2/3 * point.y) / size);
    return this.rhombusGridToRectangleGridCoords({ q, r });
  }
  //pixelToHex returns coordinates for a hex grid in the shape of a rhombus
  //this function transforms them into rectangular hex grig coordinates
  rhombusGridToRectangleGridCoords(point) {
    const q = point.q + Math.floor(point.r/2);
    const r = point.r;
    return { q, r };
  } 
  hexToPixel(hex) {
    const size = this.state.radius;
    const gridStartingPoint = this.state.gridStartingPoint;

    //grid didn't align properly when I wasn't using this Math.round mess, but at the same time its probably the cause of some minor pixelToHex inaccuracy
    //not noticable usless you know what to look for, so its good enough 😁
    let x = Math.round(size * Math.sqrt(3)) * (hex.q-1);
    let y = Math.round(size * (                         3/2 * hex.r));
    x += gridStartingPoint.x + Math.round((size) * Math.sqrt(3)) + Math.round(Math.sqrt(3)/2 * size * ((hex.r)%2)) + (hex.r)%2*0;
    x = Math.round(x);
    y += gridStartingPoint.y;

    return { x, y };
  }
  getHexNeighbors(currentHex) {
    const gridSize = this.state.gridSize;
    if (!(currentHex.q >= 0 && currentHex.q < gridSize.x && currentHex.r >=0 && currentHex.r < gridSize.y)) {
      return undefined;
    }
    const nLeft = { q: currentHex.q-1, r: currentHex.r };
    const nRight = { q: currentHex.q+1, r: currentHex.r };
    const nTopLeft = { q: currentHex.q-1+currentHex.r%2, r: currentHex.r-1 };
    const nTopRight = { q: currentHex.q+currentHex.r%2, r: currentHex.r-1 };
    const nButtomLeft = { q: currentHex.q-1+currentHex.r%2, r: currentHex.r+1 };
    const nBottomRight = { q: currentHex.q+currentHex.r%2, r: currentHex.r+1 };

    return [nLeft, nRight, nTopLeft, nTopRight, nButtomLeft, nBottomRight];
  }
  breadthFirstSearch(startingHex) {
    let neighborQueue = new MySet();
    neighborQueue.add(JSON.stringify(startingHex));

    const goalHex = JSON.stringify(this.state.destination);
    let cameFrom = [];
    
    queueLoop:
    for (let currentHex of neighborQueue) {
        currentHex = JSON.parse(currentHex);
        const neighborArray = this.getHexNeighbors(currentHex);
        if (neighborArray!==undefined){
          for (let i = 0; i < neighborArray.length; i++) {
            const item     = neighborArray[i];
            const itemStr  = JSON.stringify(item);
            let isObstacle = false;

            this.state.obstacleArray.forEach(obstacle => {
              if (JSON.stringify(obstacle)===itemStr) {
                isObstacle = true;
              }
            });
            if (isObstacle) {
              continue;
            }
            neighborQueue.add(itemStr);
            if (neighborQueue.last===itemStr) {
              cameFrom.push({childHex: item, parentHex: currentHex}); 
            }
            if (itemStr===goalHex) {
              break queueLoop;
            }
          }
      }
    }
    this.tracePath(cameFrom);
  }
  tracePath(cameFrom) {
    const canvasID = this.mouseCanvas.current;
    let lastPoint  = this.state.destination;

    for (let i=cameFrom.length-1; i>=0; i--) {
      const path = cameFrom[i];

      if (JSON.stringify(path.childHex)===JSON.stringify(lastPoint)) {
        const start = this.hexToPixel(path.childHex);
        const end   = this.hexToPixel(path.parentHex);
        lastPoint   = path.parentHex;
        this.drawLine(canvasID, start, end, "black", 10);
        this.drawLine(canvasID, start, end, "grey", 8, "square");
      }
    }
  }
  drawLine(canvasID, start, end, lineColor="grey", lineWidth, lineCap="round") {
    const ctx = canvasID.getContext("2d");
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  }
  handleMouseClick(e) {
    const hexCoords = this.mousePositionToHexCoords(e);
    const gridSize  = this.state.gridSize;

    if (hexCoords.q >= 0 && hexCoords.q < gridSize.x && hexCoords.r >= 0 && hexCoords.r < gridSize.y) {
      let obstacleArray = this.state.obstacleArray;
      let newObstacle = true;

      for (let i = 0; i < obstacleArray.length; i++) {
        const obstacle = obstacleArray[i];
        if (JSON.stringify(obstacle)===JSON.stringify(hexCoords)) {
          obstacleArray.splice(i,1);
          newObstacle = false;
          break;
        }
      }
      if (newObstacle) {
        if (JSON.stringify(hexCoords)!==JSON.stringify(this.state.startHexCoord)) {
          obstacleArray.push(hexCoords);
        }
      }
      this.setState({
        obstacleArray: obstacleArray
      });
      this.clearCanvas(this.obstacleCanvas.current)
      this.drawObstacles(obstacleArray);
      this.handleMouseMove(e);
    }
  }
  drawObstacles(obstacleArray) {
    const canvasID = this.obstacleCanvas.current;
    const radius   = this.state.radius;
    const purple   = this.state.colorScheme.purple;
    obstacleArray.forEach(element => {
      const center = this.hexToPixel(element);
      this.drawHex(canvasID, center, radius, "black", purple);
    });
  }
  handleMouseDown(e) {
    const startingHex = this.state.startHexCoord;
    let hexCoords     = this.mousePositionToHexCoords(e);

    if (JSON.stringify(hexCoords)===JSON.stringify(startingHex))
    {
      this.setState({
        startHexDrag: true
      });
    }
  }
  async handleMouseUp(e) {
    const hexCoords = this.mousePositionToHexCoords(e);
    
    if (this.state.startHexDrag) {
      await this.setState({
        startHexCoord: hexCoords,
        startHexDrag: false
      });
      this.clearCanvas(this.startHexCanvas.current);
      this.drawStartingHex();
    
    }
  }
  drawStartingHex(center=this.hexToPixel(this.state.startHexCoord), radius=this.state.radius) {
    this.clearCanvas(this.startHexTargetCanvas.current);
    const green = this.state.colorScheme.green;
    this.drawHex(this.startHexCanvas.current, center, radius, "black", green);
  }
  clearCanvas(canvasID) {
    const ctx = canvasID.getContext("2d");
    const { canvasWidth, canvasHeight } = this.state.canvasSize;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }
  showTutorial() {
    this.setState({
      showTutorial: !this.state.showTutorial,
      tutorialPageNumber: 1
    });
  }
  previousPage() {
    const page = this.state.tutorialPageNumber - 1;
    this.setState({
      tutorialPageNumber: page
    });
  }
  nextPage() {
    const page = this.state.tutorialPageNumber + 1;
    this.setState({
      tutorialPageNumber: page
    });
  }
  clearObstacles() {
    this.setState(
      {
        obstacleArray: []
      },
      this.clearCanvas(this.obstacleCanvas.current)
    );
  }
  render() {
    return (
      <div className="wrapper__canvas">
        <p>
          Breadth First Search is a pathfinding alghoritm that explores equally in all directions.
          It has many uses, ranging from path finding, procedural map generation, flow field pathfinding, distance maps, and other types of map analysis.
          <br></br>
          <a href="javascript:void(0)" onClick={ this.showTutorial }>Click here for a tutorial.</a>
        </p>
        { this.state.showTutorial && <Tutorial showTutorial={this.showTutorial} tutorialPageNumber={this.state.tutorialPageNumber} previousPage={this.previousPage} nextPage={this.nextPage}/>}

        <canvas ref={ this.canvasHex }></canvas>
        <canvas ref={ this.obstacleCanvas }></canvas>
        <canvas ref={ this.startHexTargetCanvas }></canvas>
        <canvas ref={ this.startHexCanvas }></canvas>
        <canvas 
          ref={ this.mouseCanvas }
          onMouseMove = { this.handleMouseMove }
          onClick = { this.handleMouseClick }
          onMouseDown = { this.handleMouseDown }
          onMouseUp = { this.handleMouseUp }
          ></canvas>
        <button className="clearBtn" onClick={this.clearObstacles}>Clear obstacles</button>
      </div>
    );
  }
}
export default Breadth;

class MySet extends Set {
  add(value) {
    if (!super.has(value)) {
      super.add(value);
      this.last = value;
    }
  }
}