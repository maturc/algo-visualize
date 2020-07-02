import React from 'react';

function Tutorial(props) {
  let page = props.tutorialPageNumber;
  let gif;
  let pageContent;
  let disableButton1;
  let disableButton2;
  switch(page) {
    default:
      gif = <img src="./page1-tutorial.gif"/>
      pageContent = <p className="modal__paragraph">Move your mouse to change the destination.</p>
      disableButton1 = true;
      disableButton2 = false;
      break;
    case 2:
      gif = <img src="./page2-tutorial.gif"/>
      pageContent = <p className="modal__paragraph">Click on any hex to turn it into an obstacle, or click on obstacles to remove them.</p>
      disableButton1 = false;
      disableButton2 = false;
      break;
    case 3:
      gif = <img src="./page3-tutorial.gif"/>
      pageContent = <p className="modal__paragraph">Click and drag the green starting hex with the left mouse button to move it.</p>
      disableButton1 = false;
      disableButton2 = true;
  }
  return(
    <div className="modal">      
      <div class="modal__content">
        <span class="modal__close" onClick={props.showTutorial}>&times;</span>
        <div className="modal__wrapper">
          {gif}
          {pageContent}
        <button disabled={disableButton1 && true} onClick={props.previousPage}>Previous</button>
        <button disabled={disableButton2 && true} onClick={props.nextPage}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;