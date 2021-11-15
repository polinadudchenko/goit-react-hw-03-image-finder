import PropTypes from 'prop-types'
import {StyledGalleryItem, StyledGalleryImage} from './ImageGalleryItem.styled'


export default function ImageGalleryItem({ images }) {
  return images.map(({ id, webformatURL, tags}) => {
    return <StyledGalleryItem key={id}>
      <StyledGalleryImage src={webformatURL} alt={tags} />
    </StyledGalleryItem>
  })
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf().isRequired,
}