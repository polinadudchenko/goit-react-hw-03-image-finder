import React, { Component } from 'react';
import {StyledApp} from './App.styled';
import Searchbar from './components/Searchbar';

class App extends Component {

  state = {
    image: null,
    status: 'idle',
  }

  handleSubmit = (input) => {
    this.setState({image: input})
  }

  render(){
    return <StyledApp>
      <Searchbar onSubmit={ this.handleSubmit}/>
    </StyledApp>
  }
}

export default App;
