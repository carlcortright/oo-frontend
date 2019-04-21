import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from "react-router-dom";
import ClassroomView from './scenes/ClassroomView';
import CreateClassroom from './scenes/CreateClassroom';
import { Box } from 'rebass';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Box
              p={3}
              fontSize={4}
              width={[1]}
              color='white'
              bg='#175451'>
              ClassQA
          </Box>
          <Route exact path="/" component={CreateClassroom} />
          <Route path="/class/:classroom" component={ClassroomView} />
        </div>
      </Router>
    );
  }
}

export default App;
