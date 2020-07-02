import React from 'react';
import Breadth from './components/Breadth';
import Header from './components/Navigation';
import './main.css'

class App extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header/>
        <div className="wrapper__app">
          <Breadth/>
        </div>
      </div>
    );
  }
}

export default App;
