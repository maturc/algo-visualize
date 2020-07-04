(this["webpackJsonpalgo-visualize"]=this["webpackJsonpalgo-visualize"]||[]).push([[0],{17:function(e,t,a){e.exports=a(25)},22:function(e,t,a){},24:function(e,t,a){},25:function(e,t,a){"use strict";a.r(t);var r=a(0),s=a.n(r),i=a(12),n=a.n(i),o=(a(22),a(4)),c=a(5),l=a(6),h=a(7),u=a(10),v=a(2),d=a(14),g=a(9),q=a.n(g),x=a(13),f=a(15),m=a(16),b=a(1);var y=function(e){var t,a,r,i;switch(e.tutorialPageNumber){default:t=s.a.createElement("img",{src:"./page1-tutorial.gif"}),a=s.a.createElement("p",{className:"modal__paragraph"},"Move your mouse to change the destination."),r=!0,i=!1;break;case 2:t=s.a.createElement("img",{src:"./page2-tutorial.gif"}),a=s.a.createElement("p",{className:"modal__paragraph"},"Click on any hex to turn it into an obstacle, or click on obstacles to remove them."),r=!1,i=!1;break;case 3:t=s.a.createElement("img",{src:"./page3-tutorial.gif"}),a=s.a.createElement("p",{className:"modal__paragraph"},"Click and drag the green starting hex with the left mouse button to move it."),r=!1,i=!0}return s.a.createElement("div",{className:"modal"},s.a.createElement("div",{class:"modal__content"},s.a.createElement("span",{class:"modal__close",onClick:e.showTutorial},"\xd7"),s.a.createElement("div",{className:"modal__wrapper"},t,a,s.a.createElement("button",{disabled:r&&!0,onClick:e.previousPage},"Previous"),s.a.createElement("button",{disabled:i&&!0,onClick:e.nextPage},"Next"))))},p=[{q:0,r:0},{q:1,r:0},{q:2,r:0},{q:3,r:0},{q:4,r:0},{q:5,r:0},{q:6,r:0},{q:7,r:0},{q:8,r:0},{q:9,r:0},{q:10,r:0},{q:12,r:0},{q:11,r:0},{q:13,r:0},{q:14,r:0},{q:15,r:0},{q:16,r:0},{q:16,r:1},{q:16,r:2},{q:16,r:3},{q:16,r:4},{q:16,r:5},{q:16,r:6},{q:16,r:7},{q:16,r:8},{q:16,r:9},{q:16,r:10},{q:16,r:11},{q:16,r:12},{q:16,r:13},{q:16,r:14},{q:15,r:14},{q:14,r:14},{q:13,r:14},{q:12,r:14},{q:11,r:14},{q:10,r:14},{q:9,r:14},{q:7,r:14},{q:8,r:14},{q:6,r:14},{q:5,r:14},{q:4,r:14},{q:3,r:14},{q:2,r:14},{q:1,r:14},{q:0,r:14},{q:0,r:13},{q:0,r:12},{q:0,r:11},{q:0,r:10},{q:0,r:9},{q:0,r:8},{q:0,r:7},{q:0,r:6},{q:0,r:5},{q:0,r:4},{q:0,r:3},{q:0,r:2},{q:0,r:1},{q:6,r:9},{q:4,r:6},{q:4,r:7},{q:5,r:8},{q:5,r:9},{q:7,r:4},{q:8,r:4},{q:9,r:4},{q:3,r:11},{q:4,r:12},{q:3,r:10},{q:4,r:13},{q:4,r:2},{q:3,r:3},{q:14,r:11},{q:14,r:12},{q:13,r:12},{q:12,r:12},{q:11,r:12},{q:10,r:12},{q:10,r:5},{q:10,r:4},{q:12,r:3},{q:13,r:4},{q:13,r:5},{q:14,r:6},{q:11,r:7},{q:14,r:10},{q:13,r:7},{q:3,r:5},{q:4,r:1},{q:12,r:7}],C=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).canvasHex=s.a.createRef(),r.mouseCanvas=s.a.createRef(),r.startHexCanvas=s.a.createRef(),r.obstacleCanvas=s.a.createRef(),r.startHexTargetCanvas=s.a.createRef(),r.handleMouseUp=r.handleMouseUp.bind(Object(b.a)(r)),r.handleMouseMove=r.handleMouseMove.bind(Object(b.a)(r)),r.handleMouseDown=r.handleMouseDown.bind(Object(b.a)(r)),r.handleMouseClick=r.handleMouseClick.bind(Object(b.a)(r)),r.showTutorial=r.showTutorial.bind(Object(b.a)(r)),r.previousPage=r.previousPage.bind(Object(b.a)(r)),r.nextPage=r.nextPage.bind(Object(b.a)(r)),r.clearObstacles=r.clearObstacles.bind(Object(b.a)(r)),r.state={radius:24,colorScheme:{green:"#338b2b",orange:"#cc6109",brightOrange:"#ff790a",purple:"#bb0bc4",hexGrey:"#cdcdcd",selectionGrey:"#a8a8a8"},canvasSize:{canvasWidth:800,canvasHeight:600},gridStartingPoint:{x:50,y:50},startHexCoord:{q:8,r:7},gridSize:{x:17,y:15},startHexDrag:!1,obstacleArray:p,destination:{},showTutorial:!1,tutorialPageNumber:1},r}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this.state.canvasSize,t=e.canvasWidth,a=e.canvasHeight;this.canvasHex.current.width=t,this.mouseCanvas.current.width=t,this.startHexTargetCanvas.current.width=t,this.startHexCanvas.current.width=t,this.obstacleCanvas.current.width=t,this.canvasHex.current.height=a,this.mouseCanvas.current.height=a,this.startHexTargetCanvas.current.height=a,this.startHexCanvas.current.height=a,this.obstacleCanvas.current.height=a,this.drawHexGrid(this.canvasHex.current,this.state.radius),this.drawStartingHex(),this.drawObstacles(this.state.obstacleArray)}},{key:"getHexCornerCoordinates",value:function(e,t,a){var r=60*a-30,s=Math.PI/180*r;return{x:e.x+t*Math.cos(s),y:e.y+t*Math.sin(s)}}},{key:"drawHex",value:function(e,t,a){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"#5e5e5e",s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:this.state.colorScheme.hexGrey,i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:2,n=e.getContext("2d");n.lineWidth=i,n.fillStyle=s,n.strokeStyle=r,n.beginPath();var o=this.getHexCornerCoordinates(t,a,0);n.moveTo(o.x,o.y);for(var c=1;c<=6;c++){var l=this.getHexCornerCoordinates(t,a,c);n.lineTo(l.x,l.y)}n.stroke(),n.closePath(),n.fill()}},{key:"drawHexGrid",value:function(e,t){for(var a=Math.round(Math.sqrt(3)*t),r=2*t,s=this.state.gridSize,i=this.state.gridStartingPoint,n=Object(m.a)({},i),o=0;o<s.y;o++){for(var c=0;c<s.x;c++)this.drawHex(e,n,t,void 0,void 0,1),n.x+=a;n.x=i.x+a/2*((o+1)%2),n.x=Math.round(n.x),n.y+=3*r/4,n.y=Math.round(n.y)}}},{key:"handleMouseMove",value:function(e){var t=this.mousePositionToHexCoords(e),a=this.hexToPixel(t),r=this.state.startHexCoord,s=this.state.obstacleArray,i=this.state.gridSize,n=!1;if(this.setState({destination:t}),this.clearCanvas(this.mouseCanvas.current),t.q>=0&&t.q<i.x&&t.r>=0&&t.r<i.y){s.forEach((function(e){JSON.stringify(e)===JSON.stringify(t)&&(n=!0)}));var o=this.state.colorScheme.green,c=this.state.colorScheme.purple,l=this.state.colorScheme.orange,h=this.state.colorScheme.brightOrange,u=this.state.colorScheme.selectionGrey,v=this.state.radius;if(this.state.startHexDrag){var d=this.getCanvasPosition(this.canvasHex.current),g=d.left,q=d.top,x=e.pageX-g,f=e.pageY-q;this.clearCanvas(this.startHexCanvas.current),this.drawStartingHex({x:x,y:f},v/1.3);var m=this.startHexTargetCanvas.current,b=this.mousePositionToHexCoords(e);b=this.hexToPixel(b),this.clearCanvas(m),n?this.drawHex(m,a,v,o,c,5):this.drawHex(m,b,v,o,void 0,5)}else JSON.stringify(t)===JSON.stringify(r)?this.drawHex(this.mouseCanvas.current,a,v,h,o,5):n?this.drawHex(this.mouseCanvas.current,a,v,h,c,5):(this.drawHex(this.mouseCanvas.current,a,v,l,u,3),this.breadthFirstSearch(r))}}},{key:"mousePositionToHexCoords",value:function(e){var t=this.getCanvasPosition(this.canvasHex.current),a=t.left,r=t.top,s=this.state.gridStartingPoint,i=this.state.radius,n=e.pageX-a-s.x,o=e.pageY-r-s.y;return this.pixelToHex({x:n,y:o},i)}},{key:"getCanvasPosition",value:function(e){var t=e.getBoundingClientRect();return{left:t.left,top:t.top}}},{key:"pixelToHex",value:function(e,t){var a=Math.round((Math.sqrt(3)/3*e.x-1/3*e.y)/t),r=Math.round(2/3*e.y/t);return this.rhombusGridToRectangleGridCoords({q:a,r:r})}},{key:"rhombusGridToRectangleGridCoords",value:function(e){return{q:e.q+Math.floor(e.r/2),r:e.r}}},{key:"hexToPixel",value:function(e){var t=this.state.radius,a=this.state.gridStartingPoint,r=Math.round(t*Math.sqrt(3))*(e.q-1),s=Math.round(t*(1.5*e.r));return r+=a.x+Math.round(t*Math.sqrt(3))+Math.round(Math.sqrt(3)/2*t*(e.r%2))+e.r%2*0,{x:r=Math.round(r),y:s+=a.y}}},{key:"getHexNeighbors",value:function(e){var t=this.state.gridSize;if(e.q>=0&&e.q<t.x&&e.r>=0&&e.r<t.y)return[{q:e.q-1,r:e.r},{q:e.q+1,r:e.r},{q:e.q-1+e.r%2,r:e.r-1},{q:e.q+e.r%2,r:e.r-1},{q:e.q-1+e.r%2,r:e.r+1},{q:e.q+e.r%2,r:e.r+1}]}},{key:"breadthFirstSearch",value:function(e){var t=this,a=new H;a.add(JSON.stringify(e));var r,s=JSON.stringify(this.state.destination),i=[],n=Object(f.a)(a);try{e:for(n.s();!(r=n.n()).done;){var o=r.value;o=JSON.parse(o);var c=this.getHexNeighbors(o);if(void 0!==c)for(var l=function(e){var r=c[e],n=JSON.stringify(r),l=!1;return t.state.obstacleArray.forEach((function(e){JSON.stringify(e)===n&&(l=!0)})),l?"continue":(a.add(n),a.last===n&&i.push({childHex:r,parentHex:o}),n===s?"break|queueLoop":void 0)},h=0;h<c.length;h++){switch(l(h)){case"continue":continue;case"break|queueLoop":break e}}}}catch(u){n.e(u)}finally{n.f()}this.tracePath(i)}},{key:"tracePath",value:function(e){for(var t=this.mouseCanvas.current,a=this.state.destination,r=e.length-1;r>=0;r--){var s=e[r];if(JSON.stringify(s.childHex)===JSON.stringify(a)){var i=this.hexToPixel(s.childHex),n=this.hexToPixel(s.parentHex);a=s.parentHex,this.drawLine(t,i,n,"black",10),this.drawLine(t,i,n,"grey",8,"square")}}}},{key:"drawLine",value:function(e,t,a){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"grey",s=arguments.length>4?arguments[4]:void 0,i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"round",n=e.getContext("2d");n.strokeStyle=r,n.lineWidth=s,n.lineCap=i,n.beginPath(),n.moveTo(t.x,t.y),n.lineTo(a.x,a.y),n.stroke(),n.closePath()}},{key:"handleMouseClick",value:function(e){var t=this.mousePositionToHexCoords(e),a=this.state.gridSize;if(t.q>=0&&t.q<a.x&&t.r>=0&&t.r<a.y){for(var r=this.state.obstacleArray,s=!0,i=0;i<r.length;i++){var n=r[i];if(JSON.stringify(n)===JSON.stringify(t)){r.splice(i,1),s=!1;break}}s&&JSON.stringify(t)!==JSON.stringify(this.state.startHexCoord)&&r.push(t),this.setState({obstacleArray:r}),this.clearCanvas(this.obstacleCanvas.current),this.drawObstacles(r),this.handleMouseMove(e)}}},{key:"drawObstacles",value:function(e){var t=this,a=this.obstacleCanvas.current,r=this.state.radius,s=this.state.colorScheme.purple;e.forEach((function(e){var i=t.hexToPixel(e);t.drawHex(a,i,r,"black",s)}))}},{key:"handleMouseDown",value:function(e){var t=this.state.startHexCoord,a=this.mousePositionToHexCoords(e);JSON.stringify(a)===JSON.stringify(t)&&this.setState({startHexDrag:!0})}},{key:"handleMouseUp",value:function(){var e=Object(x.a)(q.a.mark((function e(t){var a;return q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=this.mousePositionToHexCoords(t),!this.state.startHexDrag){e.next=6;break}return e.next=4,this.setState({startHexCoord:a,startHexDrag:!1});case 4:this.clearCanvas(this.startHexCanvas.current),this.drawStartingHex();case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"drawStartingHex",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.hexToPixel(this.state.startHexCoord),t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.state.radius;this.clearCanvas(this.startHexTargetCanvas.current);var a=this.state.colorScheme.green;this.drawHex(this.startHexCanvas.current,e,t,"black",a)}},{key:"clearCanvas",value:function(e){var t=e.getContext("2d"),a=this.state.canvasSize,r=a.canvasWidth,s=a.canvasHeight;t.clearRect(0,0,r,s)}},{key:"showTutorial",value:function(){this.setState({showTutorial:!this.state.showTutorial,tutorialPageNumber:1})}},{key:"previousPage",value:function(){var e=this.state.tutorialPageNumber-1;this.setState({tutorialPageNumber:e})}},{key:"nextPage",value:function(){var e=this.state.tutorialPageNumber+1;this.setState({tutorialPageNumber:e})}},{key:"clearObstacles",value:function(){this.setState({obstacleArray:[]},this.clearCanvas(this.obstacleCanvas.current))}},{key:"render",value:function(){return s.a.createElement("div",{className:"wrapper__canvas"},s.a.createElement("p",null,"Breadth First Search is a pathfinding alghoritm that explores equally in all directions. It has many uses, ranging from path finding, procedural map generation, flow field pathfinding, distance maps, and other types of map analysis.",s.a.createElement("br",null),s.a.createElement("a",{href:"javascript:void(0)",onClick:this.showTutorial},"Click here for a tutorial.")),this.state.showTutorial&&s.a.createElement(y,{showTutorial:this.showTutorial,tutorialPageNumber:this.state.tutorialPageNumber,previousPage:this.previousPage,nextPage:this.nextPage}),s.a.createElement("canvas",{ref:this.canvasHex}),s.a.createElement("canvas",{ref:this.obstacleCanvas}),s.a.createElement("canvas",{ref:this.startHexTargetCanvas}),s.a.createElement("canvas",{ref:this.startHexCanvas}),s.a.createElement("canvas",{ref:this.mouseCanvas,onMouseMove:this.handleMouseMove,onClick:this.handleMouseClick,onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp}),s.a.createElement("button",{className:"clearBtn",onClick:this.clearObstacles},"Clear obstacles"))}}]),a}(s.a.Component),H=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"add",value:function(e){Object(u.a)(Object(v.a)(a.prototype),"has",this).call(this,e)||(Object(u.a)(Object(v.a)(a.prototype),"add",this).call(this,e),this.last=e)}}]),a}(Object(d.a)(Set));var k=function(e){return s.a.createElement("nav",{className:"nav"},s.a.createElement("div",{className:"nav__logo"},"AlgoVisualize"),s.a.createElement("ul",{className:"nav__list"},s.a.createElement("li",null),s.a.createElement("li",null),s.a.createElement("li",null)))},S=(a(24),function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(e){return Object(o.a)(this,a),t.call(this,e)}return Object(c.a)(a,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(k,null),s.a.createElement("div",{className:"wrapper__app"},s.a.createElement(C,null)))}}]),a}(s.a.Component));n.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(S,null)),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.323b64fb.chunk.js.map