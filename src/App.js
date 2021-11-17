import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImage from './sevicies/fetch-api';
import mapper from './sevicies/mapper';
import {StyledApp, StyledModalImg} from './App.styled';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/Searchbar';
import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Modal from './components/Modal';
import Loader from './components/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {

  state = {
    query: '',
    modalImg: '',
    showModal: false,
    images: [],
    error: null,
    page: 1,
    status: Status.IDLE,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    const prevPage = prevState.page;
    const nextPage = this.state.page;
    console.log(nextPage, this.state.images);
    if (prevQuery !== nextQuery) {
      this.setState({page: 1, images: []})
    }
    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      console.log(nextPage, this.state.images);
      this.setState({ status: Status.PENDING })
      fetchImage(nextQuery, nextPage).then(response => {
        const newImages = mapper(response.hits);
        this.setState(prevState => (
          { images: [...prevState.images, ...newImages], status: Status.RESOLVED }
        ))
      }).catch(error => {
        this.setState({ error, status: Status.REJECTED })
      })
    }    
  }

  handleSubmit = (query) => {
    this.setState({query})
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))
  }

  openModal = (modalImg) => {
    this.setState({modalImg})
  }

  handleLoadButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }
  
  handleModal = (e) => {
    this.openModal(e.target.dataset.modal);
    this.toggleModal();
  }

  render() {
    const { query, showModal, modalImg, images, error, status } = this.state;
    return <StyledApp>
      <Searchbar onSubmit={this.handleSubmit} />
      {status === Status.IDLE && toast.info('Please type a query in the search field')}
      {status === Status.PENDING && <Loader />}
      {status === Status.RESOLVED &&
        <ImageGallery images={images} error={error} status={status} onHandleModal={this.handleModal} onHandleLoadBtn={this.handleLoadButton} />
      }
      {status === Status.REJECTED && toast.error(error)}
      {showModal && <Modal onClose={this.toggleModal}><StyledModalImg src={modalImg} alt={query} /></Modal>}
      <ToastContainer autoClose={3000}/>
    </StyledApp> 
  }
}

export default App;
