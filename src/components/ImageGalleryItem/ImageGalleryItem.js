import PropTypes from 'prop-types'
import {StyledGalleryItem, StyledGalleryImage} from './ImageGalleryItem.styled'


export default function ImageGalleryItem({ images, onImgClick }) {
  return images.map(({ id, galleryImg, modalImg, tags}) => {
    return <StyledGalleryItem key={id}>
      <StyledGalleryImage src={galleryImg} alt={tags} data-modal={modalImg} onClick={ onImgClick}/>
    </StyledGalleryItem>
  })
}

ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      galleryImg: PropTypes.string.isRequired,
      modalImg: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })),
    onImgClick: PropTypes.func.isRequired,
}