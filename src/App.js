import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import fetchApi from './sevicies/fetch-api';
import mapper from './sevicies/mapper';
import {StyledApp, StyledModalImg} from './App.styled';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/Searchbar';
import Modal from './components/Modal';
import Loader from './components/Loader';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css';

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

  getSnapshotBeforeUpdate() {
    return window.scrollY;
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    
    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING })
      this.fetchImage();
    }    
  }

  fetchImage = () => {
    const { query, page } = this.state;

    fetchApi(query, page).then(response => {
        const newImages = mapper(response.hits);
        this.setState(prevState => (
          { images: [...prevState.images, ...newImages], status: Status.RESOLVED, page: prevState.page + 1,}
        ))
        window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
    });
    }).catch(error => {
        this.setState({ error, status: Status.REJECTED })
        toast.error(error)
    })
  }

  handleSubmit = (query) => {
    this.setState({query, page: 1, images: []})
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
    this.fetchImage()
  }
  
  handleModal = (e) => {
    this.openModal(e.target.dataset.modal);
    this.toggleModal();
  }

  getInfoNote() {
      toast.info('Please type a query in the search field')
  }

  getErrorNote(error) {
      toast.error(error)
  }

  render() {
    const { query, showModal, modalImg, images, error, status } = this.state;
    return <StyledApp>
      <Searchbar onSubmit={this.handleSubmit} />
      {status === Status.PENDING && <Loader />}
      {status === Status.RESOLVED &&
        <ImageGallery images={images} error={error} status={status} onHandleModal={this.handleModal} onHandleLoadBtn={this.handleLoadButton} />
      }
      {showModal && <Modal onClose={this.toggleModal}><StyledModalImg src={modalImg} alt={query} /></Modal>}
      <ToastContainer autoClose={3000}/>
    </StyledApp> 
  }
}

export default App;


/* fetchImg = () => {
        const { currentPage, searchQuery } = this.state;
        const options = { searchQuery, currentPage };

        if (!searchQuery) {
            return;
        }

        this.setState({ isLoading: true });

        ImageApi.fetchImg(options)
            .then(hits => {
                this.setState(prevState => ({
                    images: [...prevState.images, ...hits],
                    currentPage: prevState.currentPage + 1,
                }));

                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                });
            })
            .catch(error => this.setState({ error }))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }; */