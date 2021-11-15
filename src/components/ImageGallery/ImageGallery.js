import PropTypes from 'prop-types'
import { Component } from 'react'
import Loader from '../Loader'
import fetchImage from '../../sevicies/fetch-api'
import ImageGalleryItem from '../ImageGalleryItem'
import { StyledGallery } from './ImageGallery.styled'
import mapper from '../../sevicies/mapper'


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  }

  state = {
    images: null,
    error: null,
    status: Status.IDLE,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING })
      fetchImage(nextQuery).then(response => {
        const images = mapper(response.hits);
        this.setState({images, status: Status.RESOLVED})
      }).catch(error => {
        this.setState({ error, status: Status.REJECTED })
        console.log(error)
      })
      
    }
    
  }
    
  render() {
    const { images, error, status } = this.state;
    
    if (status === "idle") {
      return <div>No photos loaded, please type a search query</div>
    }

    if (status === "pending") {
      return (
      <Loader />
    );
    }
    if (status === "resolved") {
      return images && <StyledGallery>
        <ImageGalleryItem images={images} />
      </StyledGallery>
    }
      
  }
  
}

export default ImageGallery