import React, { Component } from 'react';
import {StyledApp} from './App.styled';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/Searchbar';
import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class App extends Component {

  state = {
    query: '',
  }

  handleSubmit = (input) => {
    this.setState({query: input})
  }

  render() {
    const { query } = this.state;
    return <StyledApp>
      <Searchbar onSubmit={this.handleSubmit} />
      <ImageGallery query={ query }/>
    </StyledApp>
  }
}

export default App;
