import React, { Component } from 'react';
import {StyledApp} from './App.styled';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/Searchbar';
import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Modal from './components/Modal';

class App extends Component {

  state = {
    query: '',
    modalImg: '',
    showModal: false,
  }

  handleSubmit = (input) => {
    this.setState({query: input})
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))
  }

  openModal = (modalImg) => {
    this.setState({modalImg})
  }

  render() {
    const { query, showModal, modalImg } = this.state;
    return <StyledApp>
      <Searchbar onSubmit={this.handleSubmit} />
      <ImageGallery query={query} onToggleModal={this.toggleModal} onOpenModal={this.openModal }/>
      {showModal && <Modal onClose={this.toggleModal}><h1>Title</h1><img src={modalImg} alt={ query}/></Modal>}
    </StyledApp>
  }
}

export default App;
