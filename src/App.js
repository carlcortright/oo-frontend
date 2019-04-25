import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import ClassroomView from './ClassroomView';
import CreateClassroom from './CreateClassroom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={CreateClassroom} />
          <Route path="/class/:classroom" component={ClassroomView} />
        </div>
      </Router>
    );
  }
}

export default App;