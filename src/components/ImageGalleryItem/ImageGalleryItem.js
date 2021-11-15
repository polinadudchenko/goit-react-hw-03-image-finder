import PropTypes from 'prop-types'
import {StyledGalleryItem, StyledGalleryImage} from './ImageGalleryItem.styled'


export default function ImageGalleryItem({ images }) {
  return images.map(({ id, galleryImg, tags}) => {
    return <StyledGalleryItem key={id}>
      <StyledGalleryImage src={galleryImg} alt={tags} />
    </StyledGalleryItem>
  })
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    galleryImg: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  })),
}