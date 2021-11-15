import PropTypes from 'prop-types'
import { Component } from 'react'
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
    status: Status.IDLE,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      fetchImage(nextQuery).then(response => {
        const images = mapper(response.hits);
        this.setState({images})
      }).then(console.log(this.state.images))
    }
    
  }
    
  render() {
    const { images } = this.state;
    return images && <StyledGallery>
        <ImageGalleryItem images={images} />
      </StyledGallery>
  }
  
}

export default ImageGallery