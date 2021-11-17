import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { Component } from 'react';
import Loader from '../Loader';
import fetchImage from '../../sevicies/fetch-api';
import ImageGalleryItem from '../ImageGalleryItem';
import { StyledGallery } from './ImageGallery.styled';
import mapper from '../../sevicies/mapper';
import Button from '../Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {

 /*  constructor(props) {
    super(props);
    this.imagesRef = React.createRef();
  } */

  static propTypes = {
    query: PropTypes.string.isRequired,
    onToggleModal: PropTypes.func.isRequired,
    onOpenModal: PropTypes.func.isRequired,
  }

  state = {
    images: [],
    error: null,
    page: 1,
    status: Status.IDLE,
    showModal: false,
  }

  /* getSnapshotBeforeUpdate(prevProps, prevState) {

    if (prevState.page < this.state.page) {
        return window.scrollY;
      }
    return null;
  }
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({page: 1})
    }
    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING })
      fetchImage(nextQuery, this.state.page).then(response => {
        const newImages = mapper(response.hits);
        this.setState(prevState => (
          { images: [...prevState.images, ...newImages], status: Status.RESOLVED }
        ))
      }).catch(error => {
        this.setState({ error, status: Status.REJECTED })
      })
      
    }

    if (snapshot !== null) {
      this.imgRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      //img.scrollTop = img.scrollHeight - snapshot;
    }
    
  }

  handleLoadButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }
  
  handleModal = (e) => {
    const { onOpenModal, onToggleModal } = this.props;
    onOpenModal(e.target.dataset.modal);
    onToggleModal();
  }

  render() {
    const { images, error, status } = this.state;
    
    if (status === "idle") {
      toast.info('Please type a query in the search field')
      return null;
    }

    if (status === "pending") {
      return (
      <Loader />
    );
    }
    if (status === "resolved") {
      return images && <>
        <StyledGallery>
          <ImageGalleryItem images={images} onImgClick={ this.handleModal}/>
        </StyledGallery>
        <Button loadMoreImages={ this.handleLoadButton}/>
      </>
    }

    if (status === "rejected") {
      toast.error(error);
      return null;
    }
    
  }
  
}

export default ImageGallery